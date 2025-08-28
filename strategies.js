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
        return { match: false, signal: 'Error', description: 'Simple Moving Average' };
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
        return { match: false, signal: 'Error', description: 'RSI Overbought/Oversold' };
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
        return { match: false, signal: 'Error', description: 'MACD Cross' };
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
        return { match: false, signal: 'Error', description: 'Bollinger Bands Breakout' };
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
        return { match: false, signal: 'Error', description: 'Exponential Moving Average' };
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
        return { match: false, signal: 'Error', description: 'Golden Cross' };
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
        return { match: false, signal: 'Error', description: 'Death Cross' };
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
        return { match: false, signal: 'Error', description: 'Stochastic Oscillator' };
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
        return { match: false, signal: 'Error', description: 'Parabolic SAR' };
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
        return { match: false, signal: 'Error', description: 'Ichimoku Cloud' };
      }
    }
  },
  {
    name: "Average Directional Index (ADX)",
    description: "Measures trend strength.",
    evaluate: (data) => {
      try {
        const adx = calculateADX(data);
        const signal = adx > 25 ? 'Strong Trend' : 'Weak Trend';
        return { match: signal === 'Strong Trend', signal, description: 'Average Directional Index' };
      } catch (error) {
        console.error('Error in ADX evaluation:', error);
        return { match: false, signal: 'Error', description: 'Average Directional Index' };
      }
    }
  },
  {
    name: "MACD Histogram",
    description: "Tracks the difference between MACD and signal line.",
    evaluate: (data) => {
      try {
        const { macd, signal } = calculateMACD(data);
        const histogram = macd[macd.length - 1] - signal[signal.length - 1];
        const signalLine = histogram > 0 ? 'Bullish' : 'Bearish';
        return { match: signalLine === 'Bullish', signal: signalLine, description: 'MACD Histogram' };
      } catch (error) {
        console.error('Error in MACD Histogram evaluation:', error);
        return { match: false, signal: 'Error', description: 'MACD Histogram' };
      }
    }
  },
  {
    name: "Relative Vigor Index (RVI)",
    description: "Compares closing price to the range.",
    evaluate: (data) => {
      try {
        const rvi = calculateRVI(data);
        const signal = rvi.rvi > rvi.signal ? 'Bullish' : 'Bearish';
        return { match: rvi.rvi > rvi.signal, signal, description: 'Relative Vigor Index' };
      } catch (error) {
        console.error('Error in RVI evaluation:', error);
        return { match: false, signal: 'Error', description: 'Relative Vigor Index' };
      }
    }
  },
  {
    name: "Commodity Channel Index (CCI)",
    description: "Identifies cyclical trends.",
    evaluate: (data) => {
      try {
        const cci = calculateCCI(data);
        const signal = cci > 100 ? 'Overbought' : (cci < -100 ? 'Oversold' : 'Neutral');
        return { match: signal !== 'Neutral', signal, description: 'Commodity Channel Index' };
      } catch (error) {
        console.error('Error in CCI evaluation:', error);
        return { match: false, signal: 'Error', description: 'Commodity Channel Index' };
      }
    }
  },
  {
    name: "Williams %R",
    description: "Measures overbought and oversold levels.",
    evaluate: (data) => {
      try {
        const williamsR = calculateWilliamsR(data);
        const signal = williamsR < -20 ? 'Overbought' : (williamsR > -80 ? 'Oversold' : 'Neutral');
        return { match: signal !== 'Neutral', signal, description: 'Williams %R' };
      } catch (error) {
        console.error('Error in Williams %R evaluation:', error);
        return { match: false, signal: 'Error', description: 'Williams %R' };
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
  if (!data || data.length < senkouBPeriod) return { cloudBullish: false };
  const tenkanSen = calculateSMA(data, tenkanPeriod);
  const kijunSen = calculateSMA(data, kijunPeriod);
  const senkouSpanA = tenkanSen.map((t, i) => (t + kijunSen[i]) / 2);
  const senkouSpanB = calculateSMA(data, senkouBPeriod);
  const lastPrice = data[data.length - 1].price || 0;
  const cloudBullish = lastPrice > senkouSpanA[senkouSpanA.length - 1] && lastPrice > senkouSpanB[senkouSpanB.length - 1];
  return { cloudBullish };
}

function calculateADX(data, period = 14) {
  if (!data || data.length < period + 1) return 0;
  let plusDM = 0, minusDM = 0, trSum = 0;
  for (let i = 1; i <= period; i++) {
    const high = data[i].high || data[i].price || 0;
    const low = data[i].low || data[i].price || 0;
    const prevHigh = data[i - 1].high || data[i - 1].price || 0;
    const prevLow = data[i - 1].low || data[i - 1].price || 0;
    const plus = high - prevHigh;
    const minus = prevLow - low;
    plusDM += plus > minus && plus > 0 ? plus : 0;
    minusDM += minus > plus && minus > 0 ? minus : 0;
    trSum += Math.max(high - low, Math.abs(high - (data[i - 1].price || 0)), Math.abs(low - (data[i - 1].price || 0)));
  }
  let plusDI = (plusDM / trSum) * 100;
  let minusDI = (minusDM / trSum) * 100;
  let dx = Math.abs(plusDI - minusDI) / (plusDI + minusDI) * 100;
  let adx = dx;
  for (let i = period + 1; i < data.length; i++) {
    const high = data[i].high || data[i].price || 0;
    const low = data[i].low || data[i].price || 0;
    const prevHigh = data[i - 1].high || data[i - 1].price || 0;
    const prevLow = data[i - 1].low || data[i - 1].price || 0;
    const plus = high - prevHigh;
    const minus = prevLow - low;
    plusDM = ((plusDM * (period - 1)) + (plus > minus && plus > 0 ? plus : 0)) / period;
    minusDM = ((minusDM * (period - 1)) + (minus > plus && minus > 0 ? minus : 0)) / period;
    const tr = Math.max(high - low, Math.abs(high - (data[i - 1].price || 0)), Math.abs(low - (data[i - 1].price || 0)));
    trSum = ((trSum * (period - 1)) + tr) / period;
    plusDI = (plusDM / trSum) * 100;
    minusDI = (minusDM / trSum) * 100;
    dx = Math.abs(plusDI - minusDI) / (plusDI + minusDI) * 100;
    adx = ((adx * (period - 1)) + dx) / period;
  }
  return adx;
}

function calculateRVI(data, period = 10) {
  if (!data || data.length < period + 1) return { rvi: 0, signal: 0 };
  let rviSum = 0, rangeSum = 0;
  for (let i = 1; i <= period; i++) {
    const close = data[i].price || 0;
    const open = data[i].open || data[i].price || 0;
    const high = data[i].high || data[i].price || 0;
    const low = data[i].low || data[i].price || 0;
    rviSum += (close - open);
    rangeSum += (high - low);
  }
  let rvi = rangeSum === 0 ? 0 : (rviSum / rangeSum);
  let signal = rvi;
  for (let i = period + 1; i < data.length; i++) {
    const close = data[i].price || 0;
    const open = data[i].open || data[i].price || 0;
    const high = data[i].high || data[i].price || 0;
    const low = data[i].low || data[i].price || 0;
    rviSum = ((rviSum * (period - 1)) + (close - open)) / period;
    rangeSum = ((rangeSum * (period - 1)) + (high - low)) / period;
    rvi = rangeSum === 0 ? 0 : (rviSum / rangeSum);
    signal = ((signal * (period - 1)) + rvi) / period;
  }
  return { rvi, signal };
}

function calculateCCI(data, period = 20) {
  if (!data || data.length < period) return 0;
  const typicalPrices = data.slice(-period).map(d => ((d.high || d.price || 0) + (d.low || d.price || 0) + (d.price || 0)) / 3);
  const sma = typicalPrices.reduce((acc, val) => acc + val, 0) / period;
  const meanDeviation = typicalPrices.reduce((acc, val) => acc + Math.abs(val - sma), 0) / period;
  const currentTypicalPrice = ((data[data.length - 1].high || data[data.length - 1].price || 0) + 
                             (data[data.length - 1].low || data[data.length - 1].price || 0) + 
                             (data[data.length - 1].price || 0)) / 3;
  return meanDeviation === 0 ? 0 : (currentTypicalPrice - sma) / (0.015 * meanDeviation);
}

function calculateWilliamsR(data, period = 14) {
  if (!data || data.length < period) return 0;
  const lastData = data.slice(-period);
  const highestHigh = Math.max(...lastData.map(d => d.high || d.price || 0));
  const lowestLow = Math.min(...lastData.map(d => d.low || d.price || 0));
  const currentClose = data[data.length - 1].price || 0;
  return highestHigh === lowestLow ? 0 : ((highestHigh - currentClose) / (highestHigh - lowestLow)) * -100;
}
