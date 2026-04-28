import express from "express";

const router = express.Router();

import {
  getRolesCatalog,
  getPermissionsCatalog,
  createRole,
} from "../controllers/user-controller.js";
import {
  getRoleDetail,
  updateRoleAdmin,
  deleteRoleAdmin,
} from "../controllers/roles-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { requirePermission } from "../middlewares/permission-middleware.js";
import { P } from "../constants/permissions.js";

router.get(
  "/permissions/catalog",
  authMiddleware,
  requirePermission(P.USERS_READ),
  getPermissionsCatalog
);

router.get(
  "/",
  authMiddleware,
  requirePermission(P.USERS_READ),
  getRolesCatalog
);

router.post(
  "/",
  authMiddleware,
  requirePermission(P.USERS_WRITE),
  createRole
);

router.get(
  "/:id",
  authMiddleware,
  requirePermission(P.USERS_READ),
  getRoleDetail
);

router.put(
  "/:id",
  authMiddleware,
  requirePermission(P.USERS_WRITE),
  updateRoleAdmin
);

router.delete(
  "/:id",
  authMiddleware,
  requirePermission(P.USERS_DELETE),
  deleteRoleAdmin
);

export default router;
