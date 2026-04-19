import { getPriceComparison } from "../services/priceInsightService.js";

export async function comparePrice(req, res, next) {
  try {
    const { cropName, farmerPrice } = req.query;

    if (!cropName || !farmerPrice) {
      return res.status(400).json({ message: "cropName and farmerPrice are required." });
    }

    const data = getPriceComparison({
      cropName: String(cropName),
      farmerPrice: Number(farmerPrice)
    });

    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
}

