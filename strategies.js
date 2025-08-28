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
  },
  {
    name: "On-Balance Volume (OBV)",
    description: "Measures buying and selling pressure based on volume.",
    evaluate: (data) => {
      try {
        const obv = calculateOBV(data);
        const signal = obv[obv.length - 1] > obv[obv.length - 2] ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'On-Balance Volume' };
      } catch (error) {
        console.error('Error in OBV evaluation:', error);
        return { match: false, signal: 'Error', description: 'On-Balance Volume' };
      }
    }
  },
  {
    name: "Aroon Indicator",
    description: "Identifies trend changes and strength.",
    evaluate: (data) => {
      try {
        const aroon = calculateAroon(data);
        const signal = aroon.aroonUp > aroon.aroonDown ? 'Bullish' : 'Bearish';
        return { match: aroon.aroonUp > aroon.aroonDown, signal, description: 'Aroon Indicator' };
      } catch (error) {
        console.error('Error in Aroon evaluation:', error);
        return { match: false, signal: 'Error', description: 'Aroon Indicator' };
      }
    }
  },
  {
    name: "Keltner Channels",
    description: "Detects breakouts using volatility bands.",
    evaluate: (data) => {
      try {
        const { upperBand, lowerBand } = calculateKeltnerChannels(data);
        const lastPrice = data[data.length - 1].price || 0;
        const signalUp = lastPrice > upperBand[upperBand.length - 1] ? 'Bullish Breakout' : 'No Signal';
        const signalDown = lastPrice < lowerBand[lowerBand.length - 1] ? 'Bearish Breakout' : 'No Signal';
        return { match: signalUp !== 'No Signal' || signalDown !== 'No Signal', signal: `${signalUp} | ${signalDown}`, description: 'Keltner Channels' };
      } catch (error) {
        console.error('Error in Keltner Channels evaluation:', error);
        return { match: false, signal: 'Error', description: 'Keltner Channels' };
      }
    }
  },
  {
    name: "Rate of Change (ROC)",
    description: "Measures price change percentage over a period.",
    evaluate: (data) => {
      try {
        const roc = calculateROC(data);
        const signal = roc > 0 ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Rate of Change' };
      } catch (error) {
        console.error('Error in ROC evaluation:', error);
        return { match: false, signal: 'Error', description: 'Rate of Change' };
      }
    }
  },
  {
    name: "Momentum",
    description: "Evaluates the speed of price changes.",
    evaluate: (data) => {
      try {
        const momentum = calculateMomentum(data);
        const signal = momentum > 0 ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Momentum' };
      } catch (error) {
        console.error('Error in Momentum evaluation:', error);
        return { match: false, signal: 'Error', description: 'Momentum' };
      }
    }
  },
  {
    name: "Accumulation/Distribution Line (ADL)",
    description: "Tracks money flow based on price and volume.",
    evaluate: (data) => {
      try {
        const adl = calculateADL(data);
        const signal = adl[adl.length - 1] > adl[adl.length - 2] ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Accumulation/Distribution Line' };
      } catch (error) {
        console.error('Error in ADL evaluation:', error);
        return { match: false, signal: 'Error', description: 'Accumulation/Distribution Line' };
      }
    }
  },
  {
    name: "Chaikin Money Flow (CMF)",
    description: "Measures buying and selling pressure over a period.",
    evaluate: (data) => {
      try {
        const cmf = calculateCMF(data);
        const signal = cmf > 0 ? 'Bullish' : 'Bearish';
        return { match: cmf > 0, signal, description: 'Chaikin Money Flow' };
      } catch (error) {
        console.error('Error in CMF evaluation:', error);
        return { match: false, signal: 'Error', description: 'Chaikin Money Flow' };
      }
    }
  },
  {
    name: "Stochastic RSI",
    description: "Combines Stochastic Oscillator and RSI for overbought/oversold signals.",
    evaluate: (data) => {
      try {
        const stochRSI = calculateStochasticRSI(data);
        const signal = stochRSI > 0.8 ? 'Overbought' : (stochRSI < 0.2 ? 'Oversold' : 'Neutral');
        return { match: signal !== 'Neutral', signal, description: 'Stochastic RSI' };
      } catch (error) {
        console.error('Error in Stochastic RSI evaluation:', error);
        return { match: false, signal: 'Error', description: 'Stochastic RSI' };
      }
    }
  },
  {
    name: "Force Index",
    description: "Gauges price movement strength with volume.",
    evaluate: (data) => {
      try {
        const forceIndex = calculateForceIndex(data);
        const signal = forceIndex > 0 ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Force Index' };
      } catch (error) {
        console.error('Error in Force Index evaluation:', error);
        return { match: false, signal: 'Error', description: 'Force Index' };
      }
    }
  },
  {
    name: "Ease of Movement (EMV)",
    description: "Assesses price movement ease based on volume.",
    evaluate: (data) => {
      try {
        const emv = calculateEMV(data);
        const signal = emv > 0 ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Ease of Movement' };
      } catch (error) {
        console.error('Error in EMV evaluation:', error);
        return { match: false, signal: 'Error', description: 'Ease of Movement' };
      }
    }
  },
  {
    name: "Ultimate Oscillator",
    description: "Combines multiple timeframes for momentum signals.",
    evaluate: (data) => {
      try {
        const uo = calculateUltimateOscillator(data);
        const signal = uo > 70 ? 'Overbought' : (uo < 30 ? 'Oversold' : 'Neutral');
        return { match: signal !== 'Neutral', signal, description: 'Ultimate Oscillator' };
      } catch (error) {
        console.error('Error in Ultimate Oscillator evaluation:', error);
        return { match: false, signal: 'Error', description: 'Ultimate Oscillator' };
      }
    }
  },
  {
    name: "TRIX",
    description: "Shows the rate of change of a triple-smoothed EMA.",
    evaluate: (data) => {
      try {
        const trix = calculateTRIX(data);
        const signal = trix > 0 ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'TRIX' };
      } catch (error) {
        console.error('Error in TRIX evaluation:', error);
        return { match: false, signal: 'Error', description: 'TRIX' };
      }
    }
  },
  {
    name: "Vortex Indicator",
    description: "Identifies trend reversals.",
    evaluate: (data) => {
      try {
        const vortex = calculateVortex(data);
        const signal = vortex.plusVI > vortex.minusVI ? 'Bullish' : 'Bearish';
        return { match: vortex.plusVI > vortex.minusVI, signal, description: 'Vortex Indicator' };
      } catch (error) {
        console.error('Error in Vortex evaluation:', error);
        return { match: false, signal: 'Error', description: 'Vortex Indicator' };
      }
    }
  },
  {
    name: "Chande Momentum Oscillator (CMO)",
    description: "Measures pure momentum.",
    evaluate: (data) => {
      try {
        const cmo = calculateCMO(data);
        const signal = cmo > 50 ? 'Overbought' : (cmo < -50 ? 'Oversold' : 'Neutral');
        return { match: signal !== 'Neutral', signal, description: 'Chande Momentum Oscillator' };
      } catch (error) {
        console.error('Error in CMO evaluation:', error);
        return { match: false, signal: 'Error', description: 'Chande Momentum Oscillator' };
      }
    }
  },
  {
    name: "Detrended Price Oscillator (DPO)",
    description: "Removes trend to focus on cycles.",
    evaluate: (data) => {
      try {
        const dpo = calculateDPO(data);
        const signal = dpo > 0 ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Detrended Price Oscillator' };
      } catch (error) {
        console.error('Error in DPO evaluation:', error);
        return { match: false, signal: 'Error', description: 'Detrended Price Oscillator' };
      }
    }
  },
  {
    name: "Money Flow Index (MFI)",
    description: "Combines price and volume to detect overbought/oversold conditions.",
    evaluate: (data) => {
      try {
        const mfi = calculateMFI(data);
        const signal = mfi > 80 ? 'Overbought' : (mfi < 20 ? 'Oversold' : 'Neutral');
        return { match: signal !== 'Neutral', signal, description: 'Money Flow Index' };
      } catch (error) {
        console.error('Error in MFI evaluation:', error);
        return { match: false, signal: 'Error', description: 'Money Flow Index' };
      }
    }
  },
  {
    name: "Donchian Channels",
    description: "Identifies breakouts based on highest highs and lowest lows.",
    evaluate: (data) => {
      try {
        const { upperBand, lowerBand } = calculateDonchianChannels(data);
        const lastPrice = data[data.length - 1].price || 0;
        const signalUp = lastPrice > upperBand[upperBand.length - 1] ? 'Bullish Breakout' : 'No Signal';
        const signalDown = lastPrice < lowerBand[lowerBand.length - 1] ? 'Bearish Breakout' : 'No Signal';
        return { match: signalUp !== 'No Signal' || signalDown !== 'No Signal', signal: `${signalUp} | ${signalDown}`, description: 'Donchian Channels' };
      } catch (error) {
        console.error('Error in Donchian Channels evaluation:', error);
        return { match: false, signal: 'Error', description: 'Donchian Channels' };
      }
    }
  },
  {
    name: "Klinger Oscillator",
    description: "Measures volume-based trend strength.",
    evaluate: (data) => {
      try {
        const klinger = calculateKlinger(data);
        const signal = klinger > 0 ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Klinger Oscillator' };
      } catch (error) {
        console.error('Error in Klinger Oscillator evaluation:', error);
        return { match: false, signal: 'Error', description: 'Klinger Oscillator' };
      }
    }
  },
  {
    name: "ATR Breakout",
    description: "Signals volatility-based breakouts.",
    evaluate: (data) => {
      try {
        const atr = calculateATR(data);
        const lastPrice = data[data.length - 1].price || 0;
        const prevPrice = data[data.length - 2].price || 0;
        const signal = Math.abs(lastPrice - prevPrice) > atr[atr.length - 1] ? 'Breakout' : 'No Breakout';
        return { match: signal === 'Breakout', signal, description: 'ATR Breakout' };
      } catch (error) {
        console.error('Error in ATR Breakout evaluation:', error);
        return { match: false, signal: 'Error', description: 'ATR Breakout' };
      }
    }
  },
  {
    name: "Hull Moving Average (HMA)",
    description: "A faster, smoother moving average for trend detection.",
    evaluate: (data) => {
      try {
        const hma = calculateHMA(data);
        const currentPrice = data[data.length - 1].price || 0;
        const signal = currentPrice > hma[hma.length - 1] ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Hull Moving Average' };
      } catch (error) {
        console.error('Error in HMA evaluation:', error);
        return { match: false, signal: 'Error', description: 'Hull Moving Average' };
      }
    }
  },
  {
    name: "Elder’s Impulse System",
    description: "Combines trend and momentum for entry/exit signals.",
    evaluate: (data) => {
      try {
        const impulse = calculateElderImpulse(data);
        const signal = impulse === 'green' ? 'Bullish' : (impulse === 'red' ? 'Bearish' : 'Neutral');
        return { match: signal !== 'Neutral', signal, description: 'Elder’s Impulse System' };
      } catch (error) {
        console.error('Error in Elder’s Impulse System evaluation:', error);
        return { match: false, signal: 'Error', description: 'Elder’s Impulse System' };
      }
    }
  },
  {
    name: "Know Sure Thing (KST)",
    description: "Blends multiple ROC timeframes for trend strength.",
    evaluate: (data) => {
      try {
        const kst = calculateKST(data);
        const signal = kst.kst > kst.signal ? 'Bullish' : 'Bearish';
        return { match: kst.kst > kst.signal, signal, description: 'Know Sure Thing' };
      } catch (error) {
        console.error('Error in KST evaluation:', error);
        return { match: false, signal: 'Error', description: 'Know Sure Thing' };
      }
    }
  },
  {
    name: "Price Volume Trend (PVT)",
    description: "Measures volume-driven price trends.",
    evaluate: (data) => {
      try {
        const pvt = calculatePVT(data);
        const signal = pvt[pvt.length - 1] > pvt[pvt.length - 2] ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Price Volume Trend' };
      } catch (error) {
        console.error('Error in PVT evaluation:', error);
        return { match: false, signal: 'Error', description: 'Price Volume Trend' };
      }
    }
  },
  {
    name: "Mass Index",
    description: "Detects potential reversals based on range expansion.",
    evaluate: (data) => {
      try {
        const massIndex = calculateMassIndex(data);
        const signal = massIndex > 27 ? 'Potential Reversal' : 'No Reversal';
        return { match: signal === 'Potential Reversal', signal, description: 'Mass Index' };
      } catch (error) {
        console.error('Error in Mass Index evaluation:', error);
        return { match: false, signal: 'Error', description: 'Mass Index' };
      }
    }
  },
  {
    name: "Percentage Price Oscillator (PPO)",
    description: "Normalizes MACD as a percentage.",
    evaluate: (data) => {
      try {
        const ppo = calculatePPO(data);
        const signal = ppo.ppo > ppo.signal ? 'Bullish' : 'Bearish';
        return { match: ppo.ppo > ppo.signal, signal, description: 'Percentage Price Oscillator' };
      } catch (error) {
        console.error('Error in PPO evaluation:', error);
        return { match: false, signal: 'Error', description: 'Percentage Price Oscillator' };
      }
    }
  },
  {
    name: "Balance of Power (BOP)",
    description: "Gauges buyer vs. seller strength.",
    evaluate: (data) => {
      try {
        const bop = calculateBOP(data);
        const signal = bop > 0 ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Balance of Power' };
      } catch (error) {
        console.error('Error in BOP evaluation:', error);
        return { match: false, signal: 'Error', description: 'Balance of Power' };
      }
    }
  },
  {
    name: "Triple Exponential Moving Average (TEMA)",
    description: "Reduces lag with multiple EMAs.",
    evaluate: (data) => {
      try {
        const tema = calculateTEMA(data);
        const currentPrice = data[data.length - 1].price || 0;
        const signal = currentPrice > tema[tema.length - 1] ? 'Bullish' : 'Bearish';
        return { match: true, signal, description: 'Triple Exponential Moving Average' };
      } catch (error) {
        console.error('Error in TEMA evaluation:', error);
        return { match: false, signal: 'Error', description: 'Triple Exponential Moving Average' };
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

function calculateOBV(data) {
  if (!data || data.length < 2) return Array(data ? data.length : 0).fill(0);
  const obv = [0];
  for (let i = 1; i < data.length; i++) {
    const prevPrice = data[i - 1].price || 0;
    const currPrice = data[i].price || 0;
    const volume = data[i].volume || 0;
    if (currPrice > prevPrice) {
      obv.push(obv[i - 1] + volume);
    } else if (currPrice < prevPrice) {
      obv.push(obv[i - 1] - volume);
    } else {
      obv.push(obv[i - 1]);
    }
  }
  return obv;
}

function calculateAroon(data, period = 25) {
  if (!data || data.length < period) return { aroonUp: 0, aroonDown: 0 };
  const lastData = data.slice(-period);
  const highestHighIndex = lastData.reduce((maxIdx, d, i) => (d.high || d.price || 0) > (lastData[maxIdx].high || lastData[maxIdx].price || 0) ? i : maxIdx, 0);
  const lowestLowIndex = lastData.reduce((minIdx, d, i) => (d.low || d.price || 0) < (lastData[minIdx].low || lastData[minIdx].price || 0) ? i : minIdx, 0);
  const aroonUp = ((period - highestHighIndex) / period) * 100;
  const aroonDown = ((period - lowestLowIndex) / period) * 100;
  return { aroonUp, aroonDown };
}

function calculateKeltnerChannels(data, period = 20, multiplier = 2) {
  if (!data || data.length < period) return { upperBand: Array(data ? data.length : 0).fill(0), lowerBand: Array(data ? data.length : 0).fill(0) };
  const ema = calculateEMA(data, period);
  const atr = calculateATR(data, period);
  const channels = { upperBand: [], lowerBand: [] };
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      channels.upperBand.push(0);
      channels.lowerBand.push(0);
    } else {
      channels.upperBand.push(ema[i] + multiplier * atr[i]);
      channels.lowerBand.push(ema[i] - multiplier * atr[i]);
    }
  }
  return channels;
}

function calculateATR(data, period = 14) {
  if (!data || data.length < period + 1) return Array(data ? data.length : 0).fill(0);
  const atr = [];
  for (let i = 1; i < data.length; i++) {
    const high = data[i].high || data[i].price || 0;
    const low = data[i].low || data[i].price || 0;
    const prevClose = data[i - 1].price || 0;
    const tr = Math.max(high - low, Math.abs(high - prevClose), Math.abs(low - prevClose));
    if (i < period) {
      atr.push(0);
    } else if (i === period) {
      const trSum = data.slice(1, i + 1).reduce((acc, d, idx) => {
        const h = d.high || d.price || 0;
        const l = d.low || d.price || 0;
        const pc = data[idx].price || 0;
        return acc + Math.max(h - l, Math.abs(h - pc), Math.abs(l - pc));
      }, 0);
      atr.push(trSum / period);
    } else {
      atr.push(((atr[i - 2] * (period - 1)) + tr) / period);
    }
  }
  return atr;
}

function calculateROC(data, period = 12) {
  if (!data || data.length < period + 1) return 0;
  const currentPrice = data[data.length - 1].price || 0;
  const pastPrice = data[data.length - 1 - period].price || 0;
  return ((currentPrice - pastPrice) / pastPrice) * 100;
}

function calculateMomentum(data, period = 10) {
  if (!data || data.length < period + 1) return 0;
  const currentPrice = data[data.length - 1].price || 0;
  const pastPrice = data[data.length - 1 - period].price || 0;
  return currentPrice - pastPrice;
}

function calculateADL(data) {
  if (!data || data.length < 2) return Array(data ? data.length : 0).fill(0);
  const adl = [0];
  for (let i = 1; i < data.length; i++) {
    const high = data[i].high || data[i].price || 0;
    const low = data[i].low || data[i].price || 0;
    const close = data[i].price || 0;
    const volume = data[i].volume || 0;
    const mfm = ((close - low) - (high - close)) / (high - low === 0 ? 1 : high - low);
    adl.push(adl[i - 1] + mfm * volume);
  }
  return adl;
}

function calculateCMF(data, period = 21) {
  if (!data || data.length < period) return 0;
  let sumMFM = 0, sumVolume = 0;
  for (let i = data.length - period; i < data.length; i++) {
    const high = data[i].high || data[i].price || 0;
    const low = data[i].low || data[i].price || 0;
    const close = data[i].price || 0;
    const volume = data[i].volume || 0;
    const mfm = ((close - low) - (high - close)) / (high - low === 0 ? 1 : high - low);
    sumMFM += mfm * volume;
    sumVolume += volume;
  }
  return sumVolume === 0 ? 0 : sumMFM / sumVolume;
}

function calculateStochasticRSI(data, period = 14) {
  if (!data || data.length < period + 1) return 0;
  const rsiValues = data.slice(-period).map((_, i) => calculateRSI(data.slice(0, data.length - period + i + 1)));
  const highestRSI = Math.max(...rsiValues);
  const lowestRSI = Math.min(...rsiValues);
  const currentRSI = rsiValues[rsiValues.length - 1];
  return highestRSI === lowestRSI ? 0 : (currentRSI - lowestRSI) / (highestRSI - lowestRSI);
}

function calculateForceIndex(data, period = 13) {
  if (!data || data.length < 2) return 0;
  const priceChange = (data[data.length - 1].price || 0) - (data[data.length - 2].price || 0);
  const volume = data[data.length - 1].volume || 0;
  const force = priceChange * volume;
  if (data.length < period + 1) return force;
  const forceValues = data.slice(1).map((d, i) => ((d.price || 0) - (data[i].price || 0)) * (d.volume || 0));
  const emaForce = calculateEMA(forceValues.map(v => ({ price: v })), period);
  return emaForce[emaForce.length - 1];
}

function calculateEMV(data) {
  if (!data || data.length < 2) return 0;
  const high = data[data.length - 1].high || data[data.length - 1].price || 0;
  const low = data[data.length - 1].low || data[data.length - 1].price || 0;
  const prevHigh = data[data.length - 2].high || data[data.length - 2].price || 0;
  const prevLow = data[data.length - 2].low || data[data.length - 2].price || 0;
  const volume = data[data.length - 1].volume || 1;
  const distanceMoved = ((high + low) / 2) - ((prevHigh + prevLow) / 2);
  const boxRatio = (high - low) / volume;
  return boxRatio === 0 ? 0 : distanceMoved / boxRatio;
}

function calculateUltimateOscillator(data, period1 = 7, period2 = 14, period3 = 28) {
  if (!data || data.length < period3) return 0;
  let bpSum1 = 0, trSum1 = 0, bpSum2 = 0, trSum2 = 0, bpSum3 = 0, trSum3 = 0;
  for (let i = data.length - period1; i < data.length; i++) {
    const close = data[i].price || 0;
    const low = data[i].low || data[i].price || 0;
    const prevClose = i > 0 ? (data[i - 1].price || 0) : close;
    const bp = close - Math.min(low, prevClose);
    const tr = Math.max(data[i].high || data[i].price || 0, prevClose) - Math.min(low, prevClose);
    bpSum1 += bp;
    trSum1 += tr;
  }
  for (let i = data.length - period2; i < data.length; i++) {
    const close = data[i].price || 0;
    const low = data[i].low || data[i].price || 0;
    const prevClose = i > 0 ? (data[i - 1].price || 0) : close;
    const bp = close - Math.min(low, prevClose);
    const tr = Math.max(data[i].high || data[i].price || 0, prevClose) - Math.min(low, prevClose);
    bpSum2 += bp;
    trSum2 += tr;
  }
  for (let i = data.length - period3; i < data.length; i++) {
    const close = data[i].price || 0;
    const low = data[i].low || data[i].price || 0;
    const prevClose = i > 0 ? (data[i - 1].price || 0) : close;
    const bp = close - Math.min(low, prevClose);
    const tr = Math.max(data[i].high || data[i].price || 0, prevClose) - Math.min(low, prevClose);
    bpSum3 += bp;
    trSum3 += tr;
  }
  const avg1 = trSum1 === 0 ? 0 : bpSum1 / trSum1;
  const avg2 = trSum2 === 0 ? 0 : bpSum2 / trSum2;
  const avg3 = trSum3 === 0 ? 0 : bpSum3 / trSum3;
  return (100 * (4 * avg1 + 2 * avg2 + avg3)) / (4 + 2 + 1);
}

function calculateTRIX(data, period = 15) {
  if (!data || data.length < period * 3 + 1) return 0;
  const ema1 = calculateEMA(data, period);
  const ema2 = calculateEMA(ema1.map(v => ({ price: v })), period);
  const ema3 = calculateEMA(ema2.map(v => ({ price: v })), period);
  const prevTRIX = ema3[ema3.length - 2] === 0 ? 0 : ((ema3[ema3.length - 1] - ema3[ema3.length - 2]) / ema3[ema3.length - 2]) * 100;
  return prevTRIX;
}

function calculateVortex(data, period = 14) {
  if (!data || data.length < period + 1) return { plusVI: 0, minusVI: 0 };
  let plusVM = 0, minusVM = 0, trSum = 0;
  for (let i = data.length - period; i < data.length; i++) {
    const high = data[i].high || data[i].price || 0;
    const low = data[i].low || data[i].price || 0;
    const prevClose = i > 0 ? (data[i - 1].price || 0) : 0;
    const prevHigh = i > 0 ? (data[i - 1].high || data[i - 1].price || 0) : 0;
    const prevLow = i > 0 ? (data[i - 1].low || data[i - 1].price || 0) : 0;
    plusVM += Math.abs(high - prevLow);
    minusVM += Math.abs(low - prevHigh);
    trSum += Math.max(high - low, Math.abs(high - prevClose), Math.abs(low - prevClose));
  }
  const plusVI = trSum === 0 ? 0 : plusVM / trSum;
  const minusVI = trSum === 0 ? 0 : minusVM / trSum;
  return { plusVI, minusVI };
}

function calculateCMO(data, period = 20) {
  if (!data || data.length < period + 1) return 0;
  let sumGains = 0, sumLosses = 0;
  for (let i = data.length - period; i < data.length; i++) {
    const change = (data[i].price || 0) - (data[i - 1].price || 0);
    if (change > 0) sumGains += change;
    else sumLosses += Math.abs(change);
  }
  return sumGains + sumLosses === 0 ? 0 : ((sumGains - sumLosses) / (sumGains + sumLosses)) * 100;
}

function calculateDPO(data, period = 20) {
  if (!data || data.length < period + 1) return 0;
  const offset = Math.floor(period / 2) + 1;
  const sma = calculateSMA(data, period);
  return (data[data.length - 1].price || 0) - sma[sma.length - 1 - offset];
}

function calculateMFI(data, period = 14) {
  if (!data || data.length < period + 1) return 0;
  let positiveMF = 0, negativeMF = 0;
  for (let i = data.length - period; i < data.length; i++) {
    const typicalPrice = ((data[i].high || data[i].price || 0) + (data[i].low || data[i].price || 0) + (data[i].price || 0)) / 3;
    const prevTypicalPrice = i > 0 ? ((data[i - 1].high || data[i - 1].price || 0) + (data[i - 1].low || data[i - 1].price || 0) + (data[i - 1].price || 0)) / 3 : typicalPrice;
    const rawMF = typicalPrice * (data[i].volume || 0);
    if (typicalPrice > prevTypicalPrice) {
      positiveMF += rawMF;
    } else if (typicalPrice < prevTypicalPrice) {
      negativeMF += rawMF;
    }
  }
  const moneyRatio = negativeMF === 0 ? 100 : positiveMF / negativeMF;
  return 100 - (100 / (1 + moneyRatio));
}

function calculateDonchianChannels(data, period = 20) {
  if (!data || data.length < period) return { upperBand: Array(data ? data.length : 0).fill(0), lowerBand: Array(data ? data.length : 0).fill(0) };
  const channels = { upperBand: [], lowerBand: [] };
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      channels.upperBand.push(0);
      channels.lowerBand.push(0);
    } else {
      const periodData = data.slice(i - period + 1, i + 1);
      channels.upperBand.push(Math.max(...periodData.map(d => d.high || d.price || 0)));
      channels.lowerBand.push(Math.min(...periodData.map(d => d.low || d.price || 0)));
    }
  }
  return channels;
}

function calculateKlinger(data, period = 34, signalPeriod = 13) {
  if (!data || data.length < period + signalPeriod) return 0;
  let klinger = 0;
  for (let i = 1; i < data.length; i++) {
    const high = data[i].high || data[i].price || 0;
    const low = data[i].low || data[i].price || 0;
    const close = data[i].price || 0;
    const prevClose = data[i - 1].price || 0;
    const trend = close > prevClose ? 1 : (close < prevClose ? -1 : 0);
    const dm = high - low;
    const cm = i > 1 ? (data[i - 1].high || data[i - 1].price || 0) - (data[i - 1].low || data[i - 1].price || 0) : dm;
    const vf = data[i].volume || 0 * (trend * dm / (cm === 0 ? 1 : cm));
    klinger = i === 1 ? vf : klinger + vf;
  }
  const klingerValues = data.slice(1).map((d, i) => {
    const high = d.high || d.price || 0;
    const low = d.low || d.price || 0;
    const close = d.price || 0;
    const prevClose = data[i].price || 0;
    const trend = close > prevClose ? 1 : (close < prevClose ? -1 : 0);
    const dm = high - low;
    const cm = i > 0 ? (data[i].high || data[i].price || 0) - (data[i].low || data[i].price || 0) : dm;
    return d.volume || 0 * (trend * dm / (cm === 0 ? 1 : cm));
  });
  const emaKlinger = calculateEMA(klingerValues.map(v => ({ price: v })), period);
  return emaKlinger[emaKlinger.length - 1];
}

function calculateHMA(data, period = 9) {
  if (!data || data.length < period * 2) return Array(data ? data.length : 0).fill(0);
  const wmaShort = calculateWMA(data, Math.floor(period / 2));
  const wmaLong = calculateWMA(data, period);
  const rawHMA = wmaShort.map((short, i) => 2 * short - wmaLong[i]);
  return calculateWMA(rawHMA.map(v => ({ price: v })), Math.floor(Math.sqrt(period)));
}

function calculateWMA(data, period) {
  if (!data || data.length < period) return Array(data ? data.length : 0).fill(0);
  const wma = [];
  const weights = Array.from({ length: period }, (_, i) => i + 1);
  const weightSum = weights.reduce((acc, w) => acc + w, 0);
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      wma.push(0);
    } else {
      const prices = data.slice(i - period + 1, i + 1).map(d => d.price || 0);
      const weightedSum = prices.reduce((acc, price, j) => acc + price * weights[j], 0);
      wma.push(weightedSum / weightSum);
    }
  }
  return wma;
}

function calculateElderImpulse(data, period = 13) {
  if (!data || data.length < period + 1) return 'neutral';
  const ema = calculateEMA(data, period);
  const { macd, signal } = calculateMACD(data);
  const histogram = macd[macd.length - 1] - signal[signal.length - 1];
  const emaRising = ema[ema.length - 1] > ema[ema.length - 2];
  const histPositive = histogram > 0;
  return emaRising && histPositive ? 'green' : (!emaRising && !histPositive ? 'red' : 'neutral');
}

function calculateKST(data, r1 = 10, r2 = 15, r3 = 20, r4 = 30, sma1 = 10, sma2 = 10, sma3 = 10, sma4 = 15) {
  if (!data || data.length < r4 + sma4) return { kst: 0, signal: 0 };
  const roc1 = calculateROC(data, r1);
  const roc2 = calculateROC(data, r2);
  const roc3 = calculateROC(data, r3);
  const roc4 = calculateROC(data, r4);
  const kst = (roc1 * 1 + roc2 * 2 + roc3 * 3 + roc4 * 4) / 10;
  const signal = calculateSMA(data.slice(-sma4).map(() => ({ price: kst })), sma4)[sma4 - 1];
  return { kst, signal };
}

function calculatePVT(data) {
  if (!data || data.length < 2) return Array(data ? data.length : 0).fill(0);
  const pvt = [0];
  for (let i = 1; i < data.length; i++) {
    const priceChange = ((data[i].price || 0) - (data[i - 1].price || 0)) / (data[i - 1].price || 1);
    const volume = data[i].volume || 0;
    pvt.push(pvt[i - 1] + priceChange * volume);
  }
  return pvt;
}

function calculateMassIndex(data, period = 25, emaPeriod = 9) {
  if (!data || data.length < period + emaPeriod) return 0;
  let sum = 0;
  for (let i = data.length - period; i < data.length; i++) {
    const high = data[i].high || data[i].price || 0;
    const low = data[i].low || data[i].price || 0;
    const range = high - low;
    const ema1 = calculateEMA(data.slice(0, i + 1).map(d => ({ price: (d.high || d.price || 0) - (d.low || d.price || 0) })), emaPeriod);
    const ema2 = calculateEMA(ema1.map(v => ({ price: v })), emaPeriod);
    sum += ema1[ema1.length - 1] / (ema2[ema2.length - 1] || 1);
  }
  return sum;
}

function calculatePPO(data, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
  if (!data || data.length < slowPeriod + signalPeriod) return { ppo: 0, signal: 0 };
  const fastEMA = calculateEMA(data, fastPeriod);
  const slowEMA = calculateEMA(data, slowPeriod);
  const ppo = fastEMA.map((fast, i) => ((fast - slowEMA[i]) / (slowEMA[i] || 1)) * 100);
  const signal = calculateEMA(ppo.map((value) => ({ price: value })), signalPeriod);
  return { ppo: ppo[ppo.length - 1], signal: signal[signal.length - 1] };
}

function calculateBOP(data) {
  if (!data || data.length < 1) return 0;
  const high = data[data.length - 1].high || data[data.length - 1].price || 0;
  const low = data[data.length - 1].low || data[data.length - 1].price || 0;
  const open = data[data.length - 1].open || data[data.length - 1].price || 0;
  const close = data[data.length - 1].price || 0;
  return (high - low) === 0 ? 0 : (close - open) / (high - low);
}

function calculateTEMA(data, period = 12) {
  if (!data || data.length < period * 3) return Array(data ? data.length : 0).fill(0);
  const ema1 = calculateEMA(data, period);
  const ema2 = calculateEMA(ema1.map(v => ({ price: v })), period);
  const ema3 = calculateEMA(ema2.map(v => ({ price: v })), period);
  return ema1.map((e1, i) => 3 * e1 - 3 * ema2[i] + ema3[i]);
}

// End of code
