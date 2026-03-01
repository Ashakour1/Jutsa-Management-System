import { Router } from "express";
import {
  getControlStatus,
  updateControlStatus,
  seedControls,
} from "../controllers/systemControl-controller.js";

import authMiddleware from "../middlewares/auth-middleware.js";
import AuthorizeRole from "../middlewares/role-middleware.js";
import { ALLOWED_FORM_KEYS, isAllowedFormKey } from "../middlewares/requireSystemActive.js";

const router = Router();

const validateKeyParam = (req, res, next) => {
  const { key } = req.params;

  if (!isAllowedFormKey(key)) {
    return res.status(400).json({ message: `Invalid form key: ${key}` });
  }

  return next();
};

const validateSeedKeys = (req, res, next) => {
  const { keys } = req.body;

  if (!Array.isArray(keys) || keys.length === 0) {
    return res.status(400).json({ message: "keys must be a non-empty array" });
  }

  const invalidKeys = keys.filter((key) => !ALLOWED_FORM_KEYS.includes(key));
  if (invalidKeys.length > 0) {
    return res.status(400).json({
      message: `Invalid form key(s): ${invalidKeys.join(", ")}`,
    });
  }

  return next();
};

// Public: frontend checks this when page loads
router.get("/:key", validateKeyParam, getControlStatus);

// Admin toggles ON/OFF
router.patch(
  "/:key",
  authMiddleware,
  AuthorizeRole("SUPER_ADMIN", "ADMIN"),
  validateKeyParam,
  updateControlStatus
);

// Optional: seed keys
router.post(
  "/seed",
  authMiddleware,
  AuthorizeRole("SUPER_ADMIN", "ADMIN"),
  validateSeedKeys,
  seedControls
);

export default router;
