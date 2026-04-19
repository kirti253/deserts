import { CropListing, PriceInsight } from "@/lib/types";

export const demoListings: CropListing[] = [
  {
    id: "demo-1",
    farmerName: "Ramesh Patil",
    cropName: "Tomato",
    price: 16,
    quantity: "120 kg",
    location: "Nashik",
    contactNumber: "9876543210",
    createdAt: new Date().toISOString()
  },
  {
    id: "demo-2",
    farmerName: "Sita Devi",
    cropName: "Wheat",
    price: 25,
    quantity: "40 quintal",
    location: "Jaipur",
    contactNumber: "9812345678",
    createdAt: new Date().toISOString()
  },
  {
    id: "demo-3",
    farmerName: "Mahesh Gowda",
    cropName: "Onion",
    price: 21,
    quantity: "90 kg",
    location: "Bengaluru Rural",
    contactNumber: "9822223344",
    createdAt: new Date().toISOString()
  }
];

const baselines: Record<string, number> = {
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

export function generateMockPriceInsight(cropName: string, farmerPrice: number): PriceInsight {
  const normalized = cropName.trim().toLowerCase();
  const averageMarketPrice = baselines[normalized] ?? Number((farmerPrice * 1.08).toFixed(2));
  const priceGapPercent = Number(
    (((farmerPrice - averageMarketPrice) / averageMarketPrice) * 100).toFixed(1)
  );

  const insight =
    priceGapPercent === 0
      ? "This price matches the market average."
      : priceGapPercent < 0
        ? `This price is ${Math.abs(priceGapPercent)}% lower than market average.`
        : `This price is ${priceGapPercent}% higher than market average.`;

  const recommendation =
    priceGapPercent <= -10
      ? "Recommended: Strong buyer value. Keep the listing visible and mention freshness."
      : priceGapPercent <= 5
        ? "Recommended: Pricing looks balanced. Highlight quantity and reliable pickup."
        : "Recommended: Consider explaining quality or logistics if buyers ask about the premium.";

  const summary =
    priceGapPercent <= -10
      ? "Competitive offer for buyers."
      : priceGapPercent <= 5
        ? "Fair price relative to the market."
        : "Premium price compared with the market benchmark.";

  return {
    cropName,
    farmerPrice,
    averageMarketPrice,
    insight,
    recommendation,
    summary
  };
}

