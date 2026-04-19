import { Router } from "express";
import {
  createListing,
  deleteListing,
  getListings
} from "../controllers/listingController.js";

const router = Router();

router.get("/", getListings);
router.post("/", createListing);
router.delete("/:id", deleteListing);

export default router;

