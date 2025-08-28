export const strategies = [
  // 1. RSI Overbought/Oversold
  {
    name: "RSI Overbought/Oversold",
    description: "RSI indicates possible reversal zones.",
    evaluate: (data) => {
      try {
        const rsi = calculateRSI(data);
        const signal = rsi > 70 ? 'Overbought' : (rsi < 30 ? 'Oversold' : 'No Signal');
        return { match: signal !== 'No Signal', signal, description: 'RSI Overbought/Oversold' };
      } catch (error) {
        console.error('Error in RSI evaluation:', error);
        return { match: false, signal: 'Error', description: 'RSI Overbought/Oversold' };
      }
    }
  },

  // 2. MACD Cross
  {
    name: "MACD Cross",
    description: "MACD line crossing signal line.",
    evaluate: (data) => {
      try {
        const { macd, signal } = calculateMACD(data);
        const lastMacd = macd[macd.length - 1];
        const lastSignal = signal[signal.length - 1];
        const signalLine = lastMacd > lastSignal ? 'Bullish Cross' : 'Bearish Cross';
        return { match: signalLine === 'Bullish Cross', signal: signalLine, description: 'MACD Cross' };
      } catch (error) {
        console.error('Error in MACD evaluation:', error);
        return { match: false, signal: 'Error', description: 'MACD Cross' };
      }
    }
  },

  // 3. Bollinger Bands Breakout
  {
    name: "Bollinger Bands Breakout",
    description: "Breakout above or below Bollinger Bands.",
    evaluate: (data) => {
      try {
        const { upperBand, lowerBand } = calculateBollingerBands(data);
        const lastPrice = data[data.length - 1].price;
        const signalUp = lastPrice > upperBand[upperBand.length - 1] ? 'Bullish Breakout' : 'No Signal';
        const signalDown = lastPrice < lowerBand[lowerBand.length - 1] ? 'Bearish Breakout' : 'No Signal';
        return { match: signalUp !== 'No Signal' || signalDown !== 'No Signal', signal: `${signalUp} | ${signalDown}`, description: 'Bollinger Bands Breakout' };
      } catch (error) {
        console.error('Error in Bollinger Bands evaluation:', error);
        return { match: false, signal: 'Error', description: 'Bollinger Bands Breakout' };
      }
    }
  },

  // 4. Simple Moving Average (SMA)
  {
    name: "Simple Moving Average (SMA)",
    description: "SMA indicates the average price over a given period.",
    evaluate: (data) => {
      try {
        const sma = calculateSMA(data);
        const currentPrice = data[data.length - 1].price;
        const signal = currentPrice > sma[sma.length - 1] ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Simple Moving Average' };
      } catch (error) {
        console.error('Error in SMA evaluation:', error);
        return { match: false, signal: 'Error', description: 'Simple Moving Average' };
      }
    }
  },

  // 5. Exponential Moving Average (EMA)
  {
    name: "Exponential Moving Average (EMA)",
    description: "EMA gives more weight to recent prices.",
    evaluate: (data) => {
      try {
        const ema = calculateEMA(data);
        const currentPrice = data[data.length - 1].price;
        const signal = currentPrice > ema[ema.length - 1] ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Exponential Moving Average' };
      } catch (error) {
        console.error('Error in EMA evaluation:', error);
        return { match: false, signal: 'Error', description: 'Exponential Moving Average' };
      }
    }
  },

  // 6. Golden Cross
  {
    name: "Golden Cross",
    description: "Bullish crossover when the short-term moving average crosses above the long-term moving average.",
    evaluate: (data) => {
      try {
        const shortTermMA = calculateSMA(data, 50);
        const longTermMA = calculateSMA(data, 200);
        const signal = shortTermMA[shortTermMA.length - 1] > longTermMA[longTermMA.length - 1] ? 'Bullish' : 'No Signal';
        return { match: signal === 'Bullish', signal, description: 'Golden Cross' };
      } catch (error) {
        console.error('Error in Golden Cross evaluation:', error);
        return { match: false, signal: 'Error', description: 'Golden Cross' };
      }
    }
  },

  // 7. Death Cross
  {
    name: "Death Cross",
    description: "Bearish crossover when the short-term moving average crosses below the long-term moving average.",
    evaluate: (data) => {
      try {
        const shortTermMA = calculateSMA(data, 50);
        const longTermMA = calculateSMA(data, 200);
        const signal = shortTermMA[shortTermMA.length - 1] < longTermMA[longTermMA.length - 1] ? 'Bearish' : 'No Signal';
        return { match: signal === 'Bearish', signal, description: 'Death Cross' };
      } catch (error) {
        console.error('Error in Death Cross evaluation:', error);
        return { match: false, signal: 'Error', description: 'Death Cross' };
      }
    }
  },

  // 8. Stochastic Oscillator
  {
    name: "Stochastic Oscillator",
    description: "Identifies overbought and oversold conditions.",
    evaluate: (data) => {
      try {
        const stochastic = calculateStochasticOscillator(data);
        const signal = stochastic > 80 ? 'Overbought' : (stochastic < 20 ? 'Oversold' : 'Neutral');
        return { match: signal !== 'Neutral', signal, description: 'Stochastic Oscillator' };
      } catch (error) {
        console.error('Error in Stochastic Oscillator evaluation:', error);
        return { match: false, signal: 'Error', description: 'Stochastic Oscillator' };
      }
    }
  },

 export const strategies = [
  // 9. Parabolic SAR
  {
    name: "Parabolic SAR",
    description: "Indicates trends and potential reversals.",
    evaluate: (data) => {
      try {
        const sar = calculateParabolicSAR(data);
        const currentPrice = data[data.length - 1].price;
        const signal = currentPrice > sar[sar.length - 1] ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Parabolic SAR' };
      } catch (error) {
        console.error('Error in Parabolic SAR evaluation:', error);
        return { match: false, signal: 'Error', description: 'Parabolic SAR' };
      }
    }
  },

  // 10. Ichimoku Cloud
  {
    name: "Ichimoku Cloud",
    description: "A trend-following system that identifies support/resistance and trend strength.",
    evaluate: (data) => {
      try {
        const ichimoku = calculateIchimoku(data);
        const signal = ichimoku.cloudBullish ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Ichimoku Cloud' };
      } catch (error) {
        console.error('Error in Ichimoku Cloud evaluation:', error);
        return { match: false, signal: 'Error', description: 'Ichimoku Cloud' };
      }
    }
  }
];

// Helper Functions

// Calculate Simple Moving Average (SMA)
function calculateSMA(data, period = 20) {
  if (!data || data.length < period) return Array(data ? data.length : 0).fill(0);
  const sma = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      sma.push(0); // Not enough data for SMA
    } else {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, curr) => acc + curr.price, 0);
      sma.push(sum / period);
    }
  }
  return sma;
}

// Calculate Parabolic SAR
function calculateParabolicSAR(data, step = 0.02, maxStep = 0.2) {
  if (!data || data.length < 2) return Array(data ? data.length : 0).fill(0);
  const sar = [data[0].price];
  let trend = data[1].price > data[0].price ? 'up' : 'down';
  let ep = trend === 'up' ? data[1].high || data[1].price : data[1].low || data[1].price;
  let af = step;
  for (let i = 1; i < data.length; i++) {
    let newSAR = sar[i - 1] + af * (ep - sar[i - 1]);
    if (trend === 'up') {
      newSAR = Math.min(newSAR, data[i - 1].low || data[i - 1].price, i > 1 ? data[i - 2].low || data[i - 2].price : newSAR);
      if (data[i].price < newSAR) {
        trend = 'down';
        newSAR = ep;
        ep = data[i].low || data[i].price;
        af = step;
      } else {
        ep = Math.max(ep, data[i].high || data[i].price);
        af = Math.min(af + step, maxStep);
      }
    } else {
      newSAR = Math.max(newSAR, data[i - 1].high || data[i - 1].price, i > 1 ? data[i - 2].high || data[i - 2].price : newSAR);
      if (data[i].price > newSAR) {
        trend = 'up';
        newSAR = ep;
        ep = data[i].high || data[i].price;
        af = step;
      } else {
        ep = Math.min(ep, data[i].low || data[i].price);
        af = Math.min(af + step, maxStep);
      }
    }
    sar.push(newSAR);
  }
  return sar;
}

// Calculate Ichimoku Cloud
function calculateIchimoku(data, tenkanPeriod = 9, kijunPeriod = 26, senkouBPeriod = 52) {
  if (!data || data.length < senkouBPeriod) return { cloudBullish: false };
  const tenkanSen = calculateSMA(data, tenkanPeriod);
  const kijunSen = calculateSMA(data, kijunPeriod);
  const senkouSpanA = tenkanSen.map((t, i) => (t + kijunSen[i]) / 2);
  const senkouSpanB = calculateSMA(data, senkouBPeriod);
  const lastPrice = data[data.length - 1].price;
  const cloudBullish = lastPrice > senkouSpanA[senkouSpanA.length - 1] && lastPrice > senkouSpanB[senkouSpanB.length - 1];
  return { cloudBullish };
}
