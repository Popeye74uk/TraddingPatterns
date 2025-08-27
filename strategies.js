export const strategies = [
  {
    name: "RSI Overbought/Oversold",
    description: "RSI indicates possible reversal zones.",
    evaluate: (data) => {
      const rsi = calculateRSI(data);
      const signal = rsi > 70 ? 'Overbought' : (rsi < 30 ? 'Oversold' : 'No Signal');
      return { match: signal !== 'No Signal', signal, description: 'RSI Overbought/Oversold' };
    }
  },
  {
    name: "MACD Cross",
    description: "MACD line crossing signal line.",
    evaluate: (data) => {
      const { macd, signal } = calculateMACD(data);
      const lastMacd = macd[macd.length - 1];
      const lastSignal = signal[signal.length - 1];
      const signalLine = lastMacd > lastSignal ? 'Bullish Cross' : 'Bearish Cross';
      return { match: signalLine === 'Bullish Cross', signal: signalLine, description: 'MACD Cross' };
    }
  },
  {
    name: "Bollinger Bands Breakout",
    description: "Breakout above or below Bollinger Bands.",
    evaluate: (data) => {
      const { upperBand, lowerBand } = calculateBollingerBands(data);
      const lastPrice = data[data.length - 1].price;
      const signalUp = lastPrice > upperBand[upperBand.length - 1] ? 'Bullish Breakout' : 'No Signal';
      const signalDown = lastPrice < lowerBand[lowerBand.length - 1] ? 'Bearish Breakout' : 'No Signal';
      return { match: signalUp !== 'No Signal' || signalDown !== 'No Signal', signal: `${signalUp} | ${signalDown}`, description: 'Bollinger Bands Breakout' };
    }
  }
];

// Helper Functions for Indicator Calculations

function calculateRSI(data, period = 14) {
  const gains = [], losses = [];
  let prevPrice = data[0].price;
  for (let i = 1; i < data.length; i++) {
    const change = data[i].price - prevPrice;
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? -change : 0);
    prevPrice = data[i].price;
  }
  const avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
  const avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

function calculateMACD(data, shortPeriod = 12, longPeriod = 26, signalPeriod = 9) {
  const shortSMA = calculateSMA(data, shortPeriod);
  const longSMA = calculateSMA(data, longPeriod);
  const macd = shortSMA.map((value, index) => value - (longSMA[index] || 0));
  const signal = calculateSMA(macd, signalPeriod);
  return { macd, signal };
}

function calculateSMA(data, period = 14) {
  const sma = [];
  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const average = slice.reduce((sum, point) => sum + point.price, 0) / period;
    sma.push(average);
  }
  return sma;
}

function calculateBollingerBands(data, period = 14, multiplier = 2) {
  const sma = calculateSMA(data, period);
  const upperBand = sma.map((value, index) => value + multiplier * getStandardDeviation(data.slice(index, index + period)));
  const lowerBand = sma.map((value, index) => value - multiplier * getStandardDeviation(data.slice(index, index + period)));
  return { upperBand, lowerBand };
}

function getStandardDeviation(data) {
  const mean = data.reduce((sum, point) => sum + point.price, 0) / data.length;
  return Math.sqrt(data.reduce((sum, point) => sum + Math.pow(point.price - mean, 2), 0) / data.length);
}
