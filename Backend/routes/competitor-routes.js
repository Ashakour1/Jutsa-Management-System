import express from "express";
import { registerCompetitor,deleteCompetitor } from "../controllers/competitors-controller.js";

const router = express.Router();

router.post("/", registerCompetitor);
router.delete("/:id", deleteCompetitor);

export default router;
