// strategies.js

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
  },

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

  // More strategies can be added similarly...

//];

  // 28. Trend Following Strategy
  {
    name: "Trend Following",
    description: "This strategy follows the prevailing market trend.",
    evaluate: (data) => {
      const signal = followTrend(data);
      return { match: signal !== 'Neutral', signal, description: 'Trend Following' };
    }
  },

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

  // 30. Moving Average Convergence Divergence Histogram (MACD Histogram)
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
      const signal = ribbon[0] > ribbon[1] ? 'Bullish' : 'Bearish';
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

// Helper Functions for Indicator Calculations

function calculateSMA(data, period = 14) {
  const sma = [];
  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const average = slice.reduce((sum, point) => sum + point.price, 0) / period;
    sma.push(average);
  }
  return sma;
}

function calculateEMA(data, period = 14) {
  const ema = [];
  let multiplier = 2 / (period + 1);
  let previousEMA = data[0].price;
  for (let i = 1; i < data.length; i++) {
    const price = data[i].price;
    const emaValue = ((price - previousEMA) * multiplier) + previousEMA;
    ema.push(emaValue);
    previousEMA = emaValue;
  }
  return ema;
}

function calculateRSI(data, period = 14) {
  // RSI calculation code...
}

function calculateMACD(data, shortPeriod = 12, longPeriod = 26, signalPeriod = 9) {
  // MACD calculation code...
}

function calculateBollingerBands(data, period = 14, multiplier = 2) {
  // Bollinger Bands calculation code...
}

function calculateTEMA(data, period = 14) {
  // TEMA calculation code...
}

function calculateVolumeOscillator(data) {
  // Volume Oscillator calculation code...
}

function calculateKlingerOscillator(data) {
  // Klinger Oscillator calculation code...
}

function calculateCCI(data) {
  // CCI calculation code...
}

function calculateMcClellanOscillator(data) {
  // McClellan Oscillator calculation code...
}

function calculateATR(data) {
  // ATR calculation code...
}

function calculateDonchianChannels(data) {
  // Donchian Channels calculation code...
}

function calculateROC(data) {
  // ROC calculation code...
}

function calculateOBV(data) {
  // OBV calculation code...
}

function calculateRMI(data) {
  // RMI calculation code...
}

function calculateMovingAverageRibbon(data) {
  // Moving Average Ribbon calculation code...
}

function calculateTrix(data) {
  // Trix Indicator calculation code...
}
