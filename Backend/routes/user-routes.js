// User Routes

import express from "express";

const router = express.Router();

import {
  getUsers,
  UserRegister,
  getUser,
  deleteUser,
  loginUser,
  updateUser,
} from "../controllers/user-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { requirePermission } from "../middlewares/permission-middleware.js";
import { P } from "../constants/permissions.js";

router.get("/", authMiddleware, requirePermission(P.USERS_READ), getUsers);
router.post(
  "/auth/reg",
  authMiddleware,
  requirePermission(P.USERS_WRITE),
  UserRegister
);
router.put(
  "/edit/:id",
  authMiddleware,
  requirePermission(P.USERS_WRITE),
  updateUser
);
router.post("/auth/login", loginUser);
router.get(
  "/:id",
  authMiddleware,
  requirePermission(P.USERS_READ),
  getUser
);
router.delete(
  "/:id",
  authMiddleware,
  requirePermission(P.USERS_DELETE),
  deleteUser
);

export default router;
