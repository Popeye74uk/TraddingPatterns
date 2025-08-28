// --- Part 1: Strategies 1-14 ---

export const strategies = [
  // 1. RSI Overbought/Oversold
  {
    name: "RSI Overbought/Oversold",
    description: "RSI indicates possible reversal zones.",
    evaluate: (data) => {
      const rsi = calculateRSI(data);
      const signal = rsi > 70 ? 'Overbought' : (rsi < 30 ? 'Oversold' : 'No Signal');
      return { match: signal !== 'No Signal', signal, description: 'RSI Overbought/Oversold' };
    }
  },

  // 2. MACD Cross
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

  // 3. Bollinger Bands Breakout
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
  },

  // 4. Simple Moving Average (SMA)
  {
    name: "Simple Moving Average (SMA)",
    description: "SMA indicates the average price over a given period.",
    evaluate: (data) => {
      const sma = calculateSMA(data);
      const currentPrice = data[data.length - 1].price;
      const signal = currentPrice > sma[sma.length - 1] ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Simple Moving Average' };
    }
  },

  // 5. Exponential Moving Average (EMA)
  {
    name: "Exponential Moving Average (EMA)",
    description: "EMA gives more weight to recent prices.",
    evaluate: (data) => {
      const ema = calculateEMA(data);
      const currentPrice = data[data.length - 1].price;
      const signal = currentPrice > ema[ema.length - 1] ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Exponential Moving Average' };
    }
  },

  // 6. Golden Cross
  {
    name: "Golden Cross",
    description: "Bullish crossover when the short-term moving average crosses above the long-term moving average.",
    evaluate: (data) => {
      const shortTermMA = calculateSMA(data, 50);
      const longTermMA = calculateSMA(data, 200);
      const signal = shortTermMA[shortTermMA.length - 1] > longTermMA[longTermMA.length - 1] ? 'Bullish' : 'No Signal';
      return { match: signal === 'Bullish', signal, description: 'Golden Cross' };
    }
  },

  // 7. Death Cross
  {
    name: "Death Cross",
    description: "Bearish crossover when the short-term moving average crosses below the long-term moving average.",
    evaluate: (data) => {
      const shortTermMA = calculateSMA(data, 50);
      const longTermMA = calculateSMA(data, 200);
      const signal = shortTermMA[shortTermMA.length - 1] < longTermMA[longTermMA.length - 1] ? 'Bearish' : 'No Signal';
      return { match: signal === 'Bearish', signal, description: 'Death Cross' };
    }
  },

  // 8. Stochastic Oscillator
  {
    name: "Stochastic Oscillator",
    description: "Identifies overbought and oversold conditions.",
    evaluate: (data) => {
      const stochastic = calculateStochasticOscillator(data);
      const signal = stochastic > 80 ? 'Overbought' : (stochastic < 20 ? 'Oversold' : 'Neutral');
      return { match: signal !== 'Neutral', signal, description: 'Stochastic Oscillator' };
    }
  },

  // 9. Parabolic SAR
  {
    name: "Parabolic SAR",
    description: "Indicates trends and potential reversals.",
    evaluate: (data) => {
      const sar = calculateParabolicSAR(data);
      const currentPrice = data[data.length - 1].price;
      const signal = currentPrice > sar[sar.length - 1] ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Parabolic SAR' };
    }
  },

  // 10. Ichimoku Cloud
  {
    name: "Ichimoku Cloud",
    description: "A trend-following system that identifies support/resistance and trend strength.",
    evaluate: (data) => {
      const ichimoku = calculateIchimoku(data);
      const signal = ichimoku.cloudBullish ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Ichimoku Cloud' };
    }
  },

  // 11. Fibonacci Retracement
  {
    name: "Fibonacci Retracement",
    description: "Identifies potential support and resistance levels.",
    evaluate: (data) => {
      const fibLevels = calculateFibonacciRetracement(data);
      const signal = data[data.length - 1].price > fibLevels[1] ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Fibonacci Retracement' };
    }
  },

  // 12. Volume Weighted Average Price (VWAP)
  {
    name: "VWAP",
    description: "A volume-based average price used by traders to analyze trend strength.",
    evaluate: (data) => {
      const vwap = calculateVWAP(data);
      const currentPrice = data[data.length - 1].price;
      const signal = currentPrice > vwap ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'VWAP' };
    }
  },

  // 13. Average Directional Index (ADX)
  {
    name: "ADX",
    description: "Measures the strength of a trend.",
    evaluate: (data) => {
      const adx = calculateADX(data);
      const signal = adx > 25 ? 'Strong Trend' : 'Weak Trend';
      return { match: true, signal, description: 'ADX' };
    }
  },

  // 14. Williams %R
  {
    name: "Williams %R",
    description: "Identifies overbought and oversold conditions.",
    evaluate: (data) => {
      const wr = calculateWilliamsR(data);
      const signal = wr > -20 ? 'Overbought' : (wr < -80 ? 'Oversold' : 'Neutral');
      return { match: signal !== 'Neutral', signal, description: 'Williams %R' };
    }
  }
];

// --- End of Part 1 ---

// --- Part 2: Strategies 15-28 ---

  // 15. Aroon Indicator
  {
    name: "Aroon Indicator",
    description: "Measures the strength of a trend and indicates trend reversals.",
    evaluate: (data) => {
      const aroon = calculateAroon(data);
      const signal = aroon.up > 70 ? 'Bullish' : (aroon.down > 70 ? 'Bearish' : 'Neutral');
      return { match: signal !== 'Neutral', signal, description: 'Aroon Indicator' };
    }
  },

  // 16. Elliott Wave Theory
  {
    name: "Elliott Wave Theory",
    description: "Identifies patterns in price movements to predict future trends.",
    evaluate: (data) => {
      const waveCount = calculateElliottWave(data);
      const signal = waveCount === 5 ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Elliott Wave Theory' };
    }
  },

  // 17. Fractal Indicators
  {
    name: "Fractal Indicators",
    description: "Helps in identifying reversal points in trends.",
    evaluate: (data) => {
      const fractal = calculateFractal(data);
      const signal = fractal ? 'Reversal' : 'No Signal';
      return { match: fractal, signal, description: 'Fractal Indicators' };
    }
  },

  // 18. Donchian Channels
  {
    name: "Donchian Channels",
    description: "Identifies breakout points in the market.",
    evaluate: (data) => {
      const dc = calculateDonchianChannels(data);
      const signal = dc.upper > data[data.length - 1].price ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Donchian Channels' };
    }
  },

  // 19. Keltner Channels
  {
    name: "Keltner Channels",
    description: "Shows volatility and overbought/oversold conditions.",
    evaluate: (data) => {
      const kc = calculateKeltnerChannels(data);
      const signal = data[data.length - 1].price > kc.upper ? 'Overbought' : (data[data.length - 1].price < kc.lower ? 'Oversold' : 'Neutral');
      return { match: signal !== 'Neutral', signal, description: 'Keltner Channels' };
    }
  },

  // 20. Chaikin Money Flow (CMF)
  {
    name: "Chaikin Money Flow (CMF)",
    description: "Measures the volume-weighted average price of an asset over a specific period.",
    evaluate: (data) => {
      const cmf = calculateChaikinMoneyFlow(data);
      const signal = cmf > 0 ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Chaikin Money Flow' };
    }
  },

  // 21. Coppock Curve
  {
    name: "Coppock Curve",
    description: "A long-term momentum indicator used to identify buy signals.",
    evaluate: (data) => {
      const coppock = calculateCoppock(data);
      const signal = coppock > 0 ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Coppock Curve' };
    }
  },

  // 22. Relative Vigor Index (RVI)
  {
    name: "Relative Vigor Index (RVI)",
    description: "Measures the strength of a trend based on closing prices.",
    evaluate: (data) => {
      const rvi = calculateRVI(data);
      const signal = rvi > 50 ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Relative Vigor Index' };
    }
  },

  // 23. Price Action Trading
  {
    name: "Price Action Trading",
    description: "Focuses on interpreting price movements and patterns rather than indicators.",
    evaluate: (data) => {
      const signal = analyzePriceAction(data);
      return { match: signal !== 'Neutral', signal, description: 'Price Action Trading' };
    }
  },

  // 24. Pivot Points
  {
    name: "Pivot Points",
    description: "Used to determine potential support and resistance levels.",
    evaluate: (data) => {
      const pivot = calculatePivotPoints(data);
      const signal = data[data.length - 1].price > pivot ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Pivot Points' };
    }
  },

  // 25. Support and Resistance Levels
  {
    name: "Support and Resistance Levels",
    description: "Identifies key levels where the price tends to reverse.",
    evaluate: (data) => {
      const { support, resistance } = calculateSupportResistance(data);
      const signal = data[data.length - 1].price < support ? 'Bearish' : (data[data.length - 1].price > resistance ? 'Bullish' : 'Neutral');
      return { match: signal !== 'Neutral', signal, description: 'Support and Resistance' };
    }
  },

  // 26. Candlestick Patterns
  {
    name: "Candlestick Patterns",
    description: "Analyzes patterns like Doji, Engulfing, etc., to predict price movements.",
    evaluate: (data) => {
      const pattern = identifyCandlestickPattern(data);
      const signal = pattern ? 'Pattern Detected' : 'No Pattern';
      return { match: pattern !== 'No Pattern', signal, description: 'Candlestick Patterns' };
    }
  },

  // 27. Trendline Breakout
  {
    name: "Trendline Breakout",
    description: "Identifies breakouts from trendlines.",
    evaluate: (data) => {
      const breakout = checkTrendlineBreakout(data);
      return { match: breakout, signal: 'Trendline Breakout', description: 'Trendline Breakout' };
    }
  },

  // 28. Trend Following
  {
    name: "Trend Following",
    description: "This strategy follows the prevailing market trend.",
    evaluate: (data) => {
      const signal = followTrend(data);
      return { match: signal !== 'Neutral', signal, description: 'Trend Following' };
    }
  }

// --- End of Part 2 ---

// --- Part 3: Strategies 29-42 and Helper Functions ---

  // 29. Mean Reversion
  {
    name: "Mean Reversion",
    description: "This strategy assumes that prices tend to return to the mean over time.",
    evaluate: (data) => {
      const mean = calculateMean(data);
      const currentPrice = data[data.length - 1].price;
      const signal = currentPrice < mean ? 'Buy' : (currentPrice > mean ? 'Sell' : 'Neutral');
      return { match: signal !== 'Neutral', signal, description: 'Mean Reversion' };
    }
  },

  // 30. MACD Histogram
  {
    name: "MACD Histogram",
    description: "Analyzes the difference between MACD and its signal line to identify trend momentum.",
    evaluate: (data) => {
      const { macd, signal } = calculateMACD(data);
      const histogram = macd.map((m, i) => m - signal[i]);
      const signalLine = histogram[histogram.length - 1] > 0 ? 'Bullish' : 'Bearish';
      return { match: true, signal: signalLine, description: 'MACD Histogram' };
    }
  },

  // 31. Triple Exponential Moving Average (TEMA)
  {
    name: "Triple Exponential Moving Average (TEMA)",
    description: "A smoothing indicator that attempts to reduce lag in moving averages.",
    evaluate: (data) => {
      const tema = calculateTEMA(data);
      const currentPrice = data[data.length - 1].price;
      const signal = currentPrice > tema[tema.length - 1] ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Triple Exponential Moving Average' };
    }
  },

  // 32. Volume Oscillator
  {
    name: "Volume Oscillator",
    description: "Indicates the difference between two volume moving averages.",
    evaluate: (data) => {
      const volumeOscillator = calculateVolumeOscillator(data);
      const signal = volumeOscillator > 0 ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Volume Oscillator' };
    }
  },

  // 33. Klinger Oscillator
  {
    name: "Klinger Oscillator",
    description: "Uses volume to predict price trends.",
    evaluate: (data) => {
      const klinger = calculateKlingerOscillator(data);
      const signal = klinger > 0 ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Klinger Oscillator' };
    }
  },

  // 34. Commodity Channel Index (CCI)
  {
    name: "Commodity Channel Index (CCI)",
    description: "Measures the deviation of price from its average.",
    evaluate: (data) => {
      const cci = calculateCCI(data);
      const signal = cci > 100 ? 'Bullish' : (cci < -100 ? 'Bearish' : 'Neutral');
      return { match: signal !== 'Neutral', signal, description: 'Commodity Channel Index' };
    }
  },

  // 35. McClellan Oscillator
  {
    name: "McClellan Oscillator",
    description: "A breadth indicator that measures the difference between the advancing and declining issues.",
    evaluate: (data) => {
      const mcClellan = calculateMcClellanOscillator(data);
      const signal = mcClellan > 0 ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'McClellan Oscillator' };
    }
  },

  // 36. Average True Range (ATR)
  {
    name: "Average True Range (ATR)",
    description: "Measures market volatility.",
    evaluate: (data) => {
      const atr = calculateATR(data);
      const signal = atr > 1 ? 'High Volatility' : 'Low Volatility';
      return { match: true, signal, description: 'Average True Range' };
    }
  },

  // 37. Donchian Channel Breakout
  {
    name: "Donchian Channel Breakout",
    description: "Identifies breakouts from a price range using Donchian Channels.",
    evaluate: (data) => {
      const dc = calculateDonchianChannels(data);
      const signal = data[data.length - 1].price > dc.upper ? 'Bullish' : (data[data.length - 1].price < dc.lower ? 'Bearish' : 'Neutral');
      return { match: signal !== 'Neutral', signal, description: 'Donchian Channel Breakout' };
    }
  },

  // 38. Rate of Change (ROC)
  {
    name: "Rate of Change (ROC)",
    description: "Measures the percentage change in price over a given period.",
    evaluate: (data) => {
      const roc = calculateROC(data);
      const signal = roc > 0 ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Rate of Change' };
    }
  },

  // 39. On-Balance Volume (OBV)
  {
    name: "On-Balance Volume (OBV)",
    description: "Uses volume flow to predict price changes.",
    evaluate: (data) => {
      const obv = calculateOBV(data);
      const signal = obv > 0 ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'On-Balance Volume' };
    }
  },

  // 40. Relative Momentum Index (RMI)
  {
    name: "Relative Momentum Index (RMI)",
    description: "A momentum oscillator that improves upon RSI.",
    evaluate: (data) => {
      const rmi = calculateRMI(data);
      const signal = rmi > 70 ? 'Overbought' : (rmi < 30 ? 'Oversold' : 'Neutral');
      return { match: signal !== 'Neutral', signal, description: 'Relative Momentum Index' };
    }
  },

  // 41. Moving Average Ribbon
  {
    name: "Moving Average Ribbon",
    description: "A series of moving averages used to identify trend strength.",
    evaluate: (data) => {
      const ribbon = calculateMovingAverageRibbon(data);
      const signal = ribbon[0][ribbon[0].length - 1] > ribbon[1][ribbon[1].length - 1] ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Moving Average Ribbon' };
    }
  },

  // 42. Trix Indicator
  {
    name: "Trix Indicator",
    description: "A momentum oscillator that shows the rate of change in a triple-smoothed exponential moving average.",
    evaluate: (data) => {
      const trix = calculateTrix(data);
      const signal = trix > 0 ? 'Bullish' : 'Bearish';
      return { match: true, signal, description: 'Trix Indicator' };
    }
  }
];

// --- Helper Functions for Indicator Calculations ---

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

// Calculate Exponential Moving Average (EMA)
function calculateEMA(data, period = 12) {
  if (!data || data.length < period) return Array(data ? data.length : 0).fill(0);
  const ema = [];
  const multiplier = 2 / (period + 1);
  let initialSMA = data.slice(0, period).reduce((acc, curr) => acc + curr.price, 0) / period;
  ema.push(...Array(period - 1).fill(0), initialSMA);
  for (let i = period; i < data.length; i++) {
    const emaValue = (data[i].price - ema[i - 1]) * multiplier + ema[i - 1];
    ema.push(emaValue);
  }
  return ema;
}

// Calculate Relative Strength Index (RSI)
function calculateRSI(data, period = 14) {
  if (!data || data.length < period + 1) return 0;
  let gains = 0, losses = 0;
  for (let i = 1; i <= period; i++) {
    const change = data[i].price - data[i - 1].price;
    if (change > 0) gains += change;
    else losses += Math.abs(change);
  }
  let avgGain = gains / period;
  let avgLoss = losses / period;
  for (let i = period + 1; i < data.length; i++) {
    const change = data[i].price - data[i - 1].price;
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? Math.abs(change) : 0;
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
  }
  const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

// Calculate MACD
function calculateMACD(data, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
  if (!data || data.length < slowPeriod + signalPeriod) return { macd: Array(data ? data.length : 0).fill(0), signal: Array(data ? data.length : 0).fill(0) };
  const fastEMA = calculateEMA(data, fastPeriod);
  const slowEMA = calculateEMA(data, slowPeriod);
  const macd = fastEMA.map((fast, i) => fast - slowEMA[i]);
  const signal = calculateEMA(macd.map((value) => ({ price: value })), signalPeriod);
  return { macd, signal };
}

// Calculate Bollinger Bands
function calculateBollingerBands(data, period = 20, multiplier = 2) {
  if (!data || data.length < period) return { upperBand: Array(data ? data.length : 0).fill(0), lowerBand: Array(data ? data.length : 0).fill(0) };
  const sma = calculateSMA(data, period);
  const bands = { upperBand: [], lowerBand: [] };
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      bands.upperBand.push(0);
      bands.lowerBand.push(0);
    } else {
      const prices = data.slice(i - period + 1, i + 1).map(d => d.price);
      const mean = prices.reduce((acc, p) => acc + p, 0) / period;
      const variance = prices.reduce((acc, p) => acc + Math.pow(p - mean, 2), 0) / period;
      const stdDev = Math.sqrt(variance);
      bands.upperBand.push(sma[i] + multiplier * stdDev);
      bands.lowerBand.push(sma[i] - multiplier * stdDev);
    }
  }
  return bands;
}

// Calculate Stochastic Oscillator
function calculateStochasticOscillator(data, period = 14) {
  if (!data || data.length < period) return 0;
  const lastData = data.slice(-period);
  const highestHigh = Math.max(...lastData.map(d => d.high || d.price));
  const lowestLow = Math.min(...lastData.map(d => d.low || d.price));
  const currentClose = data[data.length - 1].price;
  return highestHigh === lowestLow ? 0 : ((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100;
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

// Calculate Fibonacci Retracement
function calculateFibonacciRetracement(data, period = 20) {
  if (!data || data.length < period) return [0, 0];
  const recentData = data.slice(-period);
  const high = Math.max(...recentData.map(d => d.high || d.price));
  const low = Math.min(...recentData.map(d => d.low || d.price));
  const diff = high - low;
  return [low + 0.382 * diff, low + 0.618 * diff]; // 38.2% and 61.8% levels
}

// Calculate Volume Weighted Average Price (VWAP)
function calculateVWAP(data) {
  if (!data || data.length === 0) return 0;
  let cumulativePriceVolume = 0, cumulativeVolume = 0;
  for (const d of data) {
    cumulativePriceVolume += d.price * d.volume;
    cumulativeVolume += d.volume;
  }
  return cumulativeVolume === 0 ? 0 : cumulativePriceVolume / cumulativeVolume;
}

// Calculate Average Directional Index (ADX)
function calculateADX(data, period = 14) {
  if (!data || data.length < period + 1) return 0;
  let plusDM = 0, minusDM = 0, trSum = 0;
  for (let i = 1; i <= period; i++) {
    const high = data[i].high || data[i].price;
    const low = data[i].low || data[i].price;
    const prevHigh = data[i - 1].high || data[i - 1].price;
    const prevLow = data[i - 1].low || data[i - 1].price;
    const upMove = high - prevHigh;
    const downMove = prevLow - low;
    plusDM += upMove > downMove && upMove > 0 ? upMove : 0;
    minusDM += downMove > upMove && downMove > 0 ? downMove : 0;
    trSum += Math.max(high - low, Math.abs(high - data[i - 1].price), Math.abs(low - data[i - 1].price));
  }
  let plusDI = (plusDM / trSum) * 100;
  let minusDI = (minusDM / trSum) * 100;
  let dx = trSum === 0 ? 0 : Math.abs(plusDI - minusDI) / (plusDI + minusDI) * 100;
  return dx;
}

// Calculate Williams %R
function calculateWilliamsR(data, period = 14) {
  if (!data || data.length < period) return 0;
  const recentData = data.slice(-period);
  const highestHigh = Math.max(...recentData.map(d => d.high || d.price));
  const lowestLow = Math.min(...recentData.map(d => d.low || d.price));
  const currentClose = data[data.length - 1].price;
  return highestHigh === lowestLow ? 0 : ((highestHigh - currentClose) / (highestHigh - lowestLow)) * -100;
}

// Calculate Aroon Indicator
function calculateAroon(data, period = 25) {
  if (!data || data.length < period) return { up: 0, down: 0 };
  const recentData = data.slice(-period);
  const highIndex = recentData.reduce((maxIdx, d, i) => (d.high || d.price) > (recentData[maxIdx].high || recentData[maxIdx].price) ? i : maxIdx, 0);
  const lowIndex = recentData.reduce((minIdx, d, i) => (d.low || d.price) < (recentData[minIdx].low || recentData[minIdx].price) ? i : minIdx, 0);
  const aroonUp = ((period - highIndex) / period) * 100;
  const aroonDown = ((period - lowIndex) / period) * 100;
  return { up: aroonUp, down: aroonDown };
}

// Calculate Elliott Wave Theory (Simplified)
function calculateElliottWave(data, period = 50) {
  if (!data || data.length < period) return 0;
  const prices = data.slice(-period).map(d => d.price);
  let waveCount = 0;
  let trend = prices[1] > prices[0] ? 'up' : 'down';
  for (let i = 1; i < prices.length - 1; i++) {
    if (trend === 'up' && prices[i + 1] < prices[i]) {
      trend = 'down';
      waveCount++;
    } else if (trend === 'down' && prices[i + 1] > prices[i]) {
      trend = 'up';
      waveCount++;
    }
  }
  return waveCount;
}

// Calculate Fractal Indicators
function calculateFractal(data) {
  if (!data || data.length < 5) return false;
  const i = data.length - 3;
  const high = data[i].high || data[i].price;
  const prevHigh1 = data[i - 1].high || data[i - 1].price;
  const prevHigh2 = data[i - 2].high || data[i - 2].price;
  const nextHigh1 = data[i + 1].high || data[i + 1].price;
  const nextHigh2 = data[i + 2].high || data[i + 2].price;
  const low = data[i].low || data[i].price;
  const prevLow1 = data[i - 1].low || data[i - 1].price;
  const prevLow2 = data[i - 2].low || data[i - 2].price;
  const nextLow1 = data[i + 1].low || data[i + 1].price;
  const nextLow2 = data[i + 2].low || data[i + 2].price;
  return (high > prevHigh1 && high > prevHigh2 && high > nextHigh1 && high > nextHigh2) ||
         (low < prevLow1 && low < prevLow2 && low < nextLow1 && low < nextLow2);
}

// Calculate Donchian Channels
function calculateDonchianChannels(data, period = 20) {
  if (!data || data.length < period) return { upper: 0, lower: 0 };
  const upper = [], lower = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      upper.push(0);
      lower.push(0);
    } else {
      const recentData = data.slice(i - period + 1, i + 1);
      upper.push(Math.max(...recentData.map(d => d.high || d.price)));
      lower.push(Math.min(...recentData.map(d => d.low || d.price)));
    }
  }
  return { upper: upper[upper.length - 1], lower: lower[lower.length - 1] };
}

// Calculate Keltner Channels
function calculateKeltnerChannels(data, period = 20, multiplier = 2) {
  if (!data || data.length < period) return { upper: 0, lower: 0 };
  const ema = calculateEMA(data, period);
  const atr = calculateATR(data, period);
  return {
    upper: ema[ema.length - 1] + multiplier * atr,
    lower: ema[ema.length - 1] - multiplier * atr
  };
}

// Calculate Chaikin Money Flow (CMF)
function calculateChaikinMoneyFlow(data, period = 20) {
  if (!data || data.length < period) return 0;
  let moneyFlowSum = 0, volumeSum = 0;
  for (let i = data.length - period; i < data.length; i++) {
    const high = data[i].high || data[i].price;
    const low = data[i].low || data[i].price;
    const close = data[i].price;
    const moneyFlowMultiplier = ((close - low) - (high - close)) / (high - low || 1);
    const moneyFlowVolume = moneyFlowMultiplier * data[i].volume;
    moneyFlowSum += moneyFlowVolume;
    volumeSum += data[i].volume;
  }
  return volumeSum === 0 ? 0 : moneyFlowSum / volumeSum;
}

// Calculate Coppock Curve
function calculateCoppock(data, roc1Period = 14, roc2Period = 11, wmaPeriod = 10) {
  if (!data || data.length < roc1Period + wmaPeriod) return 0;
  const roc1 = calculateROC(data, roc1Period);
  const roc2 = calculateROC(data, roc2Period);
  const wmaData = data.slice(-wmaPeriod).map(() => ({ price: roc1 + roc2 }));
  return calculateSMA(wmaData, wmaPeriod)[wmaData.length - 1];
}

// Calculate Relative Vigor Index (RVI)
function calculateRVI(data, period = 4) {
  if (!data || data.length < period + 1) return 0;
  let numerator = 0, denominator = 0;
  for (let i = data.length - period; i < data.length; i++) {
    const close = data[i].price;
    const open = data[i - 1].price;
    const high = data[i].high || data[i].price;
    const low = data[i].low || data[i].price;
    numerator += (close - open) / period;
    denominator += (high - low) / period;
  }
  return denominator === 0 ? 0 : (numerator / denominator) * 100;
}

// Calculate Price Action (Simplified)
function analyzePriceAction(data, period = 5) {
  if (!data || data.length < period) return 'Neutral';
  const recentPrices = data.slice(-period).map(d => d.price);
  const isUptrend = recentPrices.every((price, i) => i === 0 || price >= recentPrices[i - 1]);
  const isDowntrend = recentPrices.every((price, i) => i === 0 || price <= recentPrices[i - 1]);
  return isUptrend ? 'Bullish' : isDowntrend ? 'Bearish' : 'Neutral';
}

// Calculate Pivot Points
function calculatePivotPoints(data) {
  if (!data || data.length < 1) return 0;
  const lastData = data[data.length - 1];
  const high = lastData.high || lastData.price;
  const low = lastData.low || lastData.price;
  const close = lastData.price;
  return (high + low + close) / 3;
}

// Calculate Support and Resistance Levels
function calculateSupportResistance(data, period = 20) {
  if (!data || data.length < period) return { support: 0, resistance: 0 };
  const recentData = data.slice(-period);
  const highs = recentData.map(d => d.high || d.price);
  const lows = recentData.map(d => d.low || d.price);
  return {
    support: Math.min(...lows),
    resistance: Math.max(...highs)
  };
}

// Calculate Candlestick Patterns (Simplified: Detects Doji)
function identifyCandlestickPattern(data) {
  if (!data || data.length < 2) return null;
  const last = data[data.length - 1];
  const high = last.high || last.price;
  const low = last.low || last.price;
  const close = last.price;
  const open = data[data.length - 2].price;
  const body = Math.abs(close - open);
  const range = high - low;
  return body <= 0.1 * range ? 'Doji' : null;
}

// Calculate Trendline Breakout (Simplified)
function checkTrendlineBreakout(data, period = 20) {
  if (!data || data.length < period) return false;
  const recentData = data.slice(-period).map(d => d.price);
  const trend = recentData[recentData.length - 1] > recentData[0] ? 'up' : 'down';
  const lastPrice = data[data.length - 1].price;
  return (trend === 'up' && lastPrice > Math.max(...recentData)) || (trend === 'down' && lastPrice < Math.min(...recentData));
}

// Calculate Trend Following
function followTrend(data, period = 20) {
  if (!data || data.length < period) return 'Neutral';
  const sma = calculateSMA(data, period);
  const lastPrice = data[data.length - 1].price;
  return lastPrice > sma[sma.length - 1] ? 'Bullish' : 'Bearish';
}

// Calculate Mean
function calculateMean(data, period = 20) {
  if (!data || data.length < period) return 0;
  const recentData = data.slice(-period);
  return recentData.reduce((acc, d) => acc + d.price, 0) / period;
}

// Calculate Triple Exponential Moving Average (TEMA)
function calculateTEMA(data, period = 12) {
  if (!data || data.length < period) return Array(data ? data.length : 0).fill(0);
  const ema1 = calculateEMA(data, period);
  const ema2 = calculateEMA(ema1.map((value) => ({ price: value })), period);
  const ema3 = calculateEMA(ema2.map((value) => ({ price: value })), period);
  return ema1.map((e1, i) => 3 * e1 - 3 * ema2[i] + ema3[i]);
}

// Calculate Volume Oscillator
function calculateVolumeOscillator(data, shortPeriod = 14, longPeriod = 28) {
  if (!data || data.length < longPeriod) return 0;
  const shortVolumeMA = calculateSMA(data.map(d => ({ price: d.volume })), shortPeriod);
  const longVolumeMA = calculateSMA(data.map(d => ({ price: d.volume })), longPeriod);
  return shortVolumeMA[shortVolumeMA.length - 1] - longVolumeMA[longVolumeMA.length - 1];
}

// Calculate Klinger Oscillator
function calculateKlingerOscillator(data, shortPeriod = 34, longPeriod = 55, signalPeriod = 13) {
  if (!data || data.length < longPeriod) return 0;
  const klinger = [];
  for (let i = 1; i < data.length; i++) {
    const trend = data[i].price > data[i - 1].price ? 1 : -1;
    klinger.push(trend * data[i].volume);
  }
  const shortEMA = calculateEMA(klinger.map((value) => ({ price: value })), shortPeriod);
  const longEMA = calculateEMA(klinger.map((value) => ({ price: value })), longPeriod);
  const klingerValue = shortEMA[shortEMA.length - 1] - longEMA[longEMA.length - 1];
  return calculateEMA([{ price: klingerValue }], signalPeriod)[0];
}

// Calculate Commodity Channel Index (CCI)
function calculateCCI(data, period = 20) {
  if (!data || data.length < period) return 0;
  const typicalPrices = data.slice(-period).map(d => ((d.high || d.price) + (d.low || d.price) + d.price) / 3);
  const sma = typicalPrices.reduce((acc, p) => acc + p, 0) / period;
  const meanDeviation = typicalPrices.reduce((acc, p) => acc + Math.abs(p - sma), 0) / period;
  const lastTypicalPrice = ((data[data.length - 1].high || data[data.length - 1].price) + (data[data.length - 1].low || data[data.length - 1].price) + data[data.length - 1].price) / 3;
  return meanDeviation === 0 ? 0 : (lastTypicalPrice - sma) / (0.015 * meanDeviation);
}

// Calculate McClellan Oscillator (Simplified for single asset)
function calculateMcClellanOscillator(data, fastPeriod = 19, slowPeriod = 39) {
  if (!data || data.length < slowPeriod) return 0;
  const fastEMA = calculateEMA(data.map(d => ({ price: d.price })), fastPeriod);
  const slowEMA = calculateEMA(data.map(d => ({ price: d.price })), slowPeriod);
  return fastEMA[fastEMA.length - 1] - slowEMA[slowEMA.length - 1];
}

// Calculate Average True Range (ATR)
function calculateATR(data, period = 14) {
  if (!data || data.length < period + 1) return 0;
  const tr = [];
  for (let i = 1; i < data.length; i++) {
    const high = data[i].high || data[i].price;
    const low = data[i].low || data[i].price;
    const prevClose = data[i - 1].price;
    tr.push(Math.max(high - low, Math.abs(high - prevClose), Math.abs(low - prevClose)));
  }
  return tr.slice(-period).reduce((acc, val) => acc + val, 0) / period;
}

// Calculate Rate of Change (ROC)
function calculateROC(data, period = 14) {
  if (!data || data.length < period) return 0;
  const change = data[data.length - 1].price - data[data.length - period].price;
  return (change / data[data.length - period].price) * 100;
}

// Calculate On-Balance Volume (OBV)
function calculateOBV(data) {
  if (!data || data.length < 1) return 0;
  const obv = [0]; // Start with 0 OBV
  for (let i = 1; i < data.length; i++) {
    const priceChange = data[i].price - data[i - 1].price;
    obv.push(obv[obv.length - 1] + (priceChange > 0 ? data[i].volume : (priceChange < 0 ? -data[i].volume : 0)));
  }
  return obv[obv.length - 1];
}

// Calculate Relative Momentum Index (RMI)
function calculateRMI(data, period = 14) {
  if (!data || data.length < period + 1) return 0;
  const gains = [], losses = [];
  let prevPrice = data[0].price;
  for (let i = 1; i < data.length; i++) {
    const change = data[i].price - prevPrice;
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? -change : 0);
    prevPrice = data[i].price;
  }
  const avgGain = gains.slice(-period).reduce((a, b) => a + b, 0) / period;
  const avgLoss = losses.slice(-period).reduce((a, b) => a + b, 0) / period;
  const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

// Calculate Moving Average Ribbon
function calculateMovingAverageRibbon(data, period = 14) {
  if (!data) return [];
  const ribbon = [];
  for (let i = 1; i <= 5; i++) {
    ribbon.push(calculateSMA(data, period * i));
  }
  return ribbon;
}

// Calculate Trix Indicator
function calculateTrix(data, period = 14) {
  if (!data || data.length < period) return 0;
  const ema1 = calculateEMA(data, period);
  const ema2 = calculateEMA(ema1.map((value) => ({ price: value })), period);
  const ema3 = calculateEMA(ema2.map((value) => ({ price: value })), period);
  return ema3[ema3.length - 1] - ema2[ema2.length - 1]; // Trix value
}

// --- End of Part 3 ---
