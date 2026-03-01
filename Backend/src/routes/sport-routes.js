import express from "express";
import {
  deleteSport,
  getAllSports,
  getSingleSport,
  registerSport,
  updateSport,
} from "../controllers/sport-controller.js";
import { requireSystemActive } from "../middlewares/requireSystemActive.js";

const router = express.Router();

router.post("/", requireSystemActive("sportsForm"), registerSport);
router.get("/", getAllSports);
router.get("/:id", getSingleSport);
router.put("/:id", updateSport);
router.delete("/:id", deleteSport);

export default router;
