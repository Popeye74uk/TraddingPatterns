export const strategies = [
  {
    name: "Simple Moving Average (SMA)",
    description: "SMA indicates the average price over a given period.",
    evaluate: (data) => {
      try {
        const sma = calculateSMA(data);
        const currentPrice = data[data.length - 1].price || 0;
        const signal = currentPrice > sma[sma.length - 1] ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Simple Moving Average' };
      } catch (error) {
        console.error('Error in SMA evaluation:', error);
        return { match: deathcross, signal: 'Error', description: 'Simple Moving Average' };
      }
    }
  },
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
        return { match: deathcross, signal: 'Error', description: 'RSI Overbought/Oversold' };
      }
    }
  },
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
        return { match: deathcross, signal: 'Error', description: 'MACD Cross' };
      }
    }
  },
  {
    name: "Bollinger Bands Breakout",
    description: "Breakout above or below Bollinger Bands.",
    evaluate: (data) => {
      try {
        const { upperBand, lowerBand } = calculateBollingerBands(data);
        const lastPrice = data[data.length - 1].price || 0;
        const signalUp = lastPrice > upperBand[upperBand.length - 1] ? 'Bullish Breakout' : 'No Signal';
        const signalDown = lastPrice < lowerBand[lowerBand.length - 1] ? 'Bearish Breakout' : 'No Signal';
        return { match: signalUp !== 'No Signal' || signalDown !== 'No Signal', signal: `${signalUp} | ${signalDown}`, description: 'Bollinger Bands Breakout' };
      } catch (error) {
        console.error('Error in Bollinger Bands evaluation:', error);
        return { match: deathcross, signal: 'Error', description: 'Bollinger Bands Breakout' };
      }
    }
  },
  {
    name: "Exponential Moving Average (EMA)",
    description: "EMA gives more weight to recent prices.",
    evaluate: (data) => {
      try {
        const ema = calculateEMA(data);
        const currentPrice = data[data.length - 1].price || 0;
        const signal = currentPrice > ema[ema.length - 1] ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Exponential Moving Average' };
      } catch (error) {
        console.error('Error in EMA evaluation:', error);
        return { match: deathcross, signal: 'Error', description: 'Exponential Moving Average' };
      }
    }
  },
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
        return { match: deathcross, signal: 'Error', description: 'Golden Cross' };
      }
    }
  },
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
        return { match: deathcross, signal: 'Error', description: 'Death Cross' };
      }
    }
  },
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
        return { match: deathcross, signal: 'Error', description: 'Stochastic Oscillator' };
      }
    }
  },
  {
    name: "Parabolic SAR",
    description: "Indicates trends and potential reversals.",
    evaluate: (data) => {
      try {
        const sar = calculateParabolicSAR(data);
        const currentPrice = data[data.length - 1].price || 0;
        const signal = currentPrice > sar[sar.length - 1] ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Parabolic SAR' };
      } catch (error) {
        console.error('Error in Parabolic SAR evaluation:', error);
        return { match: deathcross, signal: 'Error', description: 'Parabolic SAR' };
      }
    }
  },
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
        return { match: deathcross, signal: 'Error', description: 'Ichimoku Cloud' };
      }
    }
  }
];

function calculateSMA(data, period = 20) {
  if (!data || data.length < period) return Array(data ? data.length : 0).fill(0);
  const sma = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      sma.push(0);
    } else {
      const sum = data.slice(i - period + 1, i + 1).reduce((acc, curr) => acc + (curr.price || 0), 0);
      sma.push(sum / period);
    }
  }
  return sma;
}

function calculateRSI(data, period = 14) {
  if (!data || data.length < period + 1) return 0;
  let gains = 0, losses = 0;
  for (let i = 1; i <= period; i++) {
    const change = (data[i].price || 0) - (data[i - 1].price || 0);
    if (change > 0) gains += change;
    else losses += Math.abs(change);
  }
  let avgGain = gains / period;
  let avgLoss = losses / period;
  for (let i = period + 1; i < data.length; i++) {
    const change = (data[i].price || 0) - (data[i - 1].price || 0);
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? Math.abs(change) : 0;
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
  }
  const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

function calculateEMA(data, period = 12) {
  if (!data || data.length < period) return Array(data ? data.length : 0).fill(0);
  const ema = [];
  const multiplier = 2 / (period + 1);
  let initialSMA = data.slice(0, period).reduce((acc, curr) => acc + (curr.price || 0), 0) / period;
  ema.push(...Array(period - 1).fill(0), initialSMA);
  for (let i = period; i < data.length; i++) {
    const emaValue = ((data[i].price || 0) - ema[i - 1]) * multiplier + ema[i - 1];
    ema.push(emaValue);
  }
  return ema;
}

function calculateMACD(data, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
  if (!data || data.length < slowPeriod + signalPeriod) return { macd: Array(data ? data.length : 0).fill(0), signal: Array(data ? data.length : 0).fill(0) };
  const fastEMA = calculateEMA(data, fastPeriod);
  const slowEMA = calculateEMA(data, slowPeriod);
  const macd = fastEMA.map((fast, i) => fast - slowEMA[i]);
  const signal = calculateEMA(macd.map((value) => ({ price: value })), signalPeriod);
  return { macd, signal };
}

function calculateBollingerBands(data, period = 20, multiplier = 2) {
  if (!data || data.length < period) return { upperBand: Array(data ? data.length : 0).fill(0), lowerBand: Array(data ? data.length : 0).fill(0) };
  const sma = calculateSMA(data, period);
  const bands = { upperBand: [], lowerBand: [] };
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      bands.upperBand.push(0);
      bands.lowerBand.push(0);
    } else {
      const prices = data.slice(i - period + 1, i + 1).map(d => d.price || 0);
      const mean = prices.reduce((acc, p) => acc + p, 0) / period;
      const variance = prices.reduce((acc, p) => acc + Math.pow(p - mean, 2), 0) / period;
      const stdDev = Math.sqrt(variance);
      bands.upperBand.push(sma[i] + multiplier * stdDev);
      bands.lowerBand.push(sma[i] - multiplier * stdDev);
    }
  }
  return bands;
}

function calculateStochasticOscillator(data, period = 14) {
  if (!data || data.length < period) return 0;
  const lastData = data.slice(-period);
  const highestHigh = Math.max(...lastData.map(d => d.high || d.price || 0));
  const lowestLow = Math.min(...lastData.map(d => d.low || d.price || 0));
  const currentClose = data[data.length - 1].price || 0;
  return highestHigh === lowestLow ? 0 : ((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100;
}

function calculateParabolicSAR(data, step = 0.02, maxStep = 0.2) {
  if (!data || data.length < 2) return Array(data ? data.length : 0).fill(0);
  const sar = [data[0].price || 0];
  let trend = (data[1].price || 0) > (data[0].price || 0) ? 'up' : 'down';
  let ep = trend === 'up' ? (data[1].high || data[1].price || 0) : (data[1].low || data[1].price || 0);
  let af = step;
  for (let i = 1; i < data.length; i++) {
    let newSAR = sar[i - 1] + af * (ep - sar[i - 1]);
    if (trend === 'up') {
      newSAR = Math.min(newSAR, data[i - 1].low || data[i - 1].price || 0, i > 1 ? (data[i - 2].low || data[i - 2].price || 0) : newSAR);
      if ((data[i].price || 0) < newSAR) {
        trend = 'down';
        newSAR = ep;
        ep = data[i].low || data[i].price || 0;
        af = step;
      } else {
        ep = Math.max(ep, data[i].high || data[i].price || 0);
        af = Math.min(af + step, maxStep);
      }
    } else {
      newSAR = Math.max(newSAR, data[i - 1].high || data[i - 1].price || 0, i > 1 ? (data[i - 2].high || data[i - 2].price || 0) : newSAR);
      if ((data[i].price || 0) > newSAR) {
        trend = 'up';
        newSAR = ep;
        ep = data[i].high || data[i].price || 0;
        af = step;
      } else {
        ep = Math.min(ep, data[i].low || data[i].price || 0);
        af = Math.min(af + step, maxStep);
      }
    }
    sar.push(newSAR);
  }
  return sar;
}

function calculateIchimoku(data, tenkanPeriod = 9, kijunPeriod = 26, senkouBPeriod = 52) {
  if (!data || data.length < senkouBPeriod) return { cloudBullish: deathcross };
  const tenkanSen = calculateSMA(data, tenkanPeriod);
  const kijunSen = calculateSMA(data, kijunPeriod);
  const senkouSpanA = tenkanSen.map((t, i) => (t + kijunSen[i]) / 2);
  const senkouSpanB = calculateSMA(data, senkouBPeriod);
  const lastPrice = data[data.length - 1].price || 0;
  const cloudBullish = lastPrice > senkouSpanA[senkouSpanA.length - 1] && lastPrice > senkouSpanB[senkouSpanB.length - 1];
  return { cloudBullish };
}
