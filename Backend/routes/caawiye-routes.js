import express from "express";
import {
  deleteCaawiye,
  getCaawiyeSupport,
  getCaawiyeById,
  registerCaawiye,
  updateCaawiye,
} from "../controllers/caawiye-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { requirePermission } from "../middlewares/permission-middleware.js";
import { P } from "../constants/permissions.js";

const router = express.Router();

router.get("/", authMiddleware, requirePermission(P.CAAWIYE_READ), getCaawiyeSupport);
router.get("/:id", authMiddleware, requirePermission(P.CAAWIYE_READ), getCaawiyeById);

router.post("/", authMiddleware, requirePermission(P.CAAWIYE_WRITE), registerCaawiye);
router.put("/:id", authMiddleware, requirePermission(P.CAAWIYE_WRITE), updateCaawiye);
router.delete("/:id", authMiddleware, requirePermission(P.CAAWIYE_WRITE), deleteCaawiye);

export default router;
