import express from "express";
import { registerCompetitor } from "../controllers/competitors-controller.js";

const router = express.Router();

router.post("/", registerCompetitor);

export default router;
