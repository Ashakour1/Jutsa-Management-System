import express from "express";

import {
  getAllCandidates,
  deleteCandidate,
  getCandidateById,
  registerCandidate,
  updateCandidate,
} from "../controllers/candidate-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { requirePermission } from "../middlewares/permission-middleware.js";
import { P } from "../constants/permissions.js";

const router = express.Router();

router.post("/", registerCandidate);

router.get("/", authMiddleware, requirePermission(P.CANDIDATES_READ), getAllCandidates);
router.get("/:id", authMiddleware, requirePermission(P.CANDIDATES_READ), getCandidateById);
router.put("/:id", authMiddleware, requirePermission(P.CANDIDATES_WRITE), updateCandidate);
router.delete(
  "/:id",
  authMiddleware,
  requirePermission(P.CANDIDATES_WRITE),
  deleteCandidate
);

export default router;
