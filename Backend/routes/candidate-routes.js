import express from "express";

import {
  getAllCandidates,
  deleteCandidate,
  getCandidateById,
  registerCandidate,
  updateCandidate,
} from "../controllers/candidate-controller.js";

const router = express.Router();

router.get("/", getAllCandidates);
router.post("/", registerCandidate);
router.get("/:id", getCandidateById);
router.put("/:id", updateCandidate);
router.delete("/:id", deleteCandidate);

export default router;
