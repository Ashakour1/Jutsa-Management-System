// Competitor Routes
import express from "express";
const router = express.Router();

// Import competitor controller
import { getAllCompetitors } from "../controllers/competitor-controller.js";

// Get all competitors
router.get("/", getAllCompetitors);

// Export router
export default router;

// End of Competitor Routes