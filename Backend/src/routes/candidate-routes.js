import express from "express";
import { registerCandidate } from "../controllers/candidate-controller.js";
import { requireSystemActive } from "../middlewares/requireSystemActive.js";

const router = express.Router();

router.post("/", requireSystemActive("presidentForm"), registerCandidate);

export default router;
