import express from "express";

import {
  getAllCandidates,
  deleteCandidate,
  getCandidateById,
  registerCandidate,
  updateCandidate,
} from "../controllers/candidate-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import AuthorizeRole from "../middlewares/role-middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  AuthorizeRole("SUPER_ADMIN", "ADMIN"),
  getAllCandidates
);
router.post(registerCandidate);
router.get(
  "/:id",
  authMiddleware,
  AuthorizeRole("SUPER_ADMIN", "ADMIN"),
  getCandidateById
);
router.put(
  "/:id",
  authMiddleware,
  AuthorizeRole("SUPER_ADMIN", "ADMIN"),
  updateCandidate
);
router.delete(
  "/:id",
  authMiddleware,
  AuthorizeRole("SUPER_ADMIN", "ADMIN"),
  deleteCandidate
);

export default router;
