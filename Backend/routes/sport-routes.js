import express from "express";
import {
    registerSport,
    getAllSports,
    getSingleSport,
    deleteSport,
    updateSport,
} from "../controllers/sport-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { requirePermission } from "../middlewares/permission-middleware.js";
import { P } from "../constants/permissions.js";

const router = express.Router();

router.get("/", authMiddleware, requirePermission(P.SPORTS_READ), getAllSports);
router.get("/:id", authMiddleware, requirePermission(P.SPORTS_READ), getSingleSport);

router.post("/", authMiddleware, requirePermission(P.SPORTS_WRITE), registerSport);
router.put("/:id", authMiddleware, requirePermission(P.SPORTS_WRITE), updateSport);
router.delete("/:id", authMiddleware, requirePermission(P.SPORTS_WRITE), deleteSport);

export default router;