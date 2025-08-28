const strategies = [
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
  const lastPrice = data[data

System: * Today's date and time is 07:14 PM BST on Thursday, August 28, 2025.
