import express from "express";
import prisma from "../config/db.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import AuthorizeRole from "../middlewares/role-middleware.js";
import { ALLOWED_FORM_KEYS, isAllowedFormKey } from "../middlewares/requireSystemActive.js";

const router = express.Router();

const validateFormNameParam = (req, res, next) => {
  const { formName } = req.params;

  if (!isAllowedFormKey(formName)) {
    return res.status(400).json({ message: `Invalid form key: ${formName}` });
  }

  return next();
};

// GET route to get visibility status of all forms
router.get("/", async (req, res) => {
  try {
    const controls = await prisma.systemControl.findMany({
      where: { key: { in: ALLOWED_FORM_KEYS } },
      select: { key: true, isActive: true },
    });

    const controlMap = new Map(controls.map((control) => [control.key, control.isActive]));
    const visibility = ALLOWED_FORM_KEYS.reduce((acc, key) => {
      acc[key] = controlMap.get(key) ?? false;
      return acc;
    }, {});

    return res.json(visibility);
  } catch (err) {
    console.error("Failed to fetch form visibility:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET route to get visibility of a specific form
router.get("/:formName", validateFormNameParam, async (req, res) => {
  try {
    const { formName } = req.params;
    const control = await prisma.systemControl.findUnique({
      where: { key: formName },
      select: { isActive: true },
    });

    return res.json({ [formName]: control?.isActive ?? false });
  } catch (err) {
    console.error("Failed to fetch form visibility by key:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST route to update visibility of a specific form
router.post(
  "/:formName",
  authMiddleware,
  AuthorizeRole("SUPER_ADMIN", "ADMIN"),
  validateFormNameParam,
  async (req, res) => {
    try {
      const { formName } = req.params;
      const { showForm } = req.body;

      if (typeof showForm !== "boolean") {
        return res.status(400).json({ message: "showForm should be a boolean" });
      }

      await prisma.systemControl.upsert({
        where: { key: formName },
        update: {
          isActive: showForm,
          updatedBy: req.user?.id ?? null,
        },
        create: {
          key: formName,
          isActive: showForm,
          updatedBy: req.user?.id ?? null,
        },
      });

      return res.json({ message: `Visibility of "${formName}" updated successfully` });
    } catch (err) {
      console.error("Failed to update form visibility:", err);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
