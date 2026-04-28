import express from "express";
import {
    registerCompetitor,
    getAllCompetitors,
    getCompetitorById,
    deleteCompetitor,
    updatedCompetitor,
} from "../controllers/competitor-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { requirePermission } from "../middlewares/permission-middleware.js";
import { P } from "../constants/permissions.js";

const router = express.Router();

router.get("/", authMiddleware, requirePermission(P.COMPETITORS_READ), getAllCompetitors);
router.get("/:id", authMiddleware, requirePermission(P.COMPETITORS_READ), getCompetitorById);

router.post("/", authMiddleware, requirePermission(P.COMPETITORS_WRITE), registerCompetitor);
router.put("/update/:id", authMiddleware, requirePermission(P.COMPETITORS_WRITE), updatedCompetitor);
router.delete("/:id", authMiddleware, requirePermission(P.COMPETITORS_WRITE), deleteCompetitor);

export default router;
