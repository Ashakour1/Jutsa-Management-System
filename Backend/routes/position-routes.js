import express from "express";
import {
  getAllPositions,
  getPositionById,
  registerPosition,
  updatePosition,
  deletePosition,
} from "../controllers/position-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { requirePermission } from "../middlewares/permission-middleware.js";
import { P } from "../constants/permissions.js";

const router = express.Router();

router.get("/", authMiddleware, requirePermission(P.POSITIONS_READ), getAllPositions);
router.get("/:id", authMiddleware, requirePermission(P.POSITIONS_READ), getPositionById);

router.post("/", authMiddleware, requirePermission(P.POSITIONS_WRITE), registerPosition);
router.put("/:id", authMiddleware, requirePermission(P.POSITIONS_WRITE), updatePosition);
router.delete("/:id", authMiddleware, requirePermission(P.POSITIONS_WRITE), deletePosition);

export default router;
