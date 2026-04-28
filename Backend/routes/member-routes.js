import express from "express";
import {
  registerMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "../controllers/member-controllers.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { requirePermission } from "../middlewares/permission-middleware.js";
import { P } from "../constants/permissions.js";

const router = express.Router();

router.get("/", authMiddleware, requirePermission(P.MEMBERS_READ), getAllMembers);
router.get("/:id", authMiddleware, requirePermission(P.MEMBERS_READ), getMemberById);

router.post("/", authMiddleware, requirePermission(P.MEMBERS_WRITE), registerMember);
router.put("/:id", authMiddleware, requirePermission(P.MEMBERS_WRITE), updateMember);
router.delete("/:id", authMiddleware, requirePermission(P.MEMBERS_WRITE), deleteMember);

export default router;
