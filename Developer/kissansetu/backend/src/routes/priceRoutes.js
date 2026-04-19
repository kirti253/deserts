import { Router } from "express";
import { comparePrice } from "../controllers/priceController.js";

const router = Router();

router.get("/compare", comparePrice);

export default router;

