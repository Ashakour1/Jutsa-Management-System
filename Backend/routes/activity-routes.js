import express from "express";
import {
  getAllActivities,
  registerActivity,
  getActivityById,
  deleteActivity,
  updateActivity,
} from "../controllers/activity-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { requirePermission } from "../middlewares/permission-middleware.js";
import { P } from "../constants/permissions.js";

const router = express.Router();

router.get("/", authMiddleware, requirePermission(P.ACTIVITIES_READ), getAllActivities);
router.get("/:id", authMiddleware, requirePermission(P.ACTIVITIES_READ), getActivityById);

router.post("/", authMiddleware, requirePermission(P.ACTIVITIES_WRITE), registerActivity);
router.put("/:id", authMiddleware, requirePermission(P.ACTIVITIES_WRITE), updateActivity);
router.delete("/:id", authMiddleware, requirePermission(P.ACTIVITIES_WRITE), deleteActivity);

export default router;
