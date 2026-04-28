// finance routes
import express from "express";
import {
    registerFinance,
    deleteFinance,
    getFinance,
    getFinances,
    updateFinance,
} from "../controllers/finance-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { requirePermission } from "../middlewares/permission-middleware.js";
import { P } from "../constants/permissions.js";

const router = express.Router();

router.get("/", authMiddleware, requirePermission(P.FINANCE_READ), getFinances);
router.get("/:id", authMiddleware, requirePermission(P.FINANCE_READ), getFinance);

router.post("/reg", authMiddleware, requirePermission(P.FINANCE_WRITE), registerFinance);
router.put("/update/:id", authMiddleware, requirePermission(P.FINANCE_WRITE), updateFinance);
router.delete("/:id", authMiddleware, requirePermission(P.FINANCE_WRITE), deleteFinance);

export default router;