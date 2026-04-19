const MARKET_BASELINES = {
  rice: 28,
  wheat: 24,
  maize: 20,
  corn: 20,
  tomato: 18,
  potato: 16,
  onion: 22,
  cotton: 62,
  sugarcane: 4,
  banana: 14,
  mango: 48,
  millet: 30,
  pulses: 54
};

function normalizeCropName(cropName = "") {
  return cropName.trim().toLowerCase();
}

function getBaselinePrice(cropName, farmerPrice) {
  const normalizedName = normalizeCropName(cropName);

  if (MARKET_BASELINES[normalizedName]) {
    return MARKET_BASELINES[normalizedName];
  }

  if (!Number.isFinite(farmerPrice) || farmerPrice <= 0) {
    return 25;
  }

  return Number((farmerPrice * 1.08).toFixed(2));
}

function buildInsightMessage(priceGapPercent) {
  if (priceGapPercent <= -10) {
    return "This price is meaningfully below the market average and looks attractive for buyers.";
  }

  if (priceGapPercent < -3) {
    return "This price is slightly below the market average, which can help buyers move quickly.";
  }

  if (priceGapPercent <= 5) {
    return "This price is close to the current market average and feels fair for both sides.";
  }

  return "This price is above the market average, so buyers may negotiate unless quality or logistics justify it.";
}

function buildRecommendation(priceGapPercent) {
  if (priceGapPercent <= -10) {
    return "Recommended: Highlight freshness and same-day availability to convert interested buyers faster.";
  }

  if (priceGapPercent <= 5) {
    return "Recommended: Keep this price and emphasize reliable supply, quantity, and location convenience.";
  }

  return "Recommended: Explain crop quality, transport cost, or grading to support the premium pricing.";
}

export function getPriceComparison({ cropName, farmerPrice }) {
  const numericFarmerPrice = Number(farmerPrice);
  const averageMarketPrice = getBaselinePrice(cropName, numericFarmerPrice);
  const priceGapPercent = Number(
    (((numericFarmerPrice - averageMarketPrice) / averageMarketPrice) * 100).toFixed(1)
  );

  const relativeMessage =
    priceGapPercent === 0
      ? "This price matches the market average."
      : priceGapPercent < 0
        ? `This price is ${Math.abs(priceGapPercent)}% lower than market average.`
        : `This price is ${priceGapPercent}% higher than market average.`;

  return {
    cropName,
    farmerPrice: numericFarmerPrice,
    averageMarketPrice,
    insight: relativeMessage,
    recommendation: buildRecommendation(priceGapPercent),
    summary: buildInsightMessage(priceGapPercent)
  };
}

