import express from "express";
import { deleteCompetitor } from "../controllers/competitorController.js";

const router = express.Router();

router.delete('/:id',deleteCompetitor)

export default router