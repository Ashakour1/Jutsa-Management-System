import express from "express";
import {
  deleteCompetitor,
  getAllCompetitors,
  getCompetitorById,
  registerCompetitor,
  updatedCompetitor,
} from "../controllers/competitor-controller.js";
import { requireSystemActive } from "../middlewares/requireSystemActive.js";

const router = express.Router();

router.post("/", requireSystemActive("facultyForm"), registerCompetitor);
router.get("/", getAllCompetitors);
router.get("/:id", getCompetitorById);
router.put("/update/:id", updatedCompetitor);
router.delete("/:id", deleteCompetitor);

export default router;
