import express from "express";
import { registerCompetitor, getAllCompetitors } from "../controllers/competitors-controller.js";

const router = express.Router();

router.post("/", registerCompetitor);
router.get("/", getAllCompetitors);

export default router;
