import express from "express";

import authMiddleware from "../middlewares/auth-middleware.js";
import { requirePermission } from "../middlewares/permission-middleware.js";
import { P } from "../constants/permissions.js";

const router = express.Router();

let formVisibility = {
  sportsForm: true,
  presidentForm: true,
  facultyForm: true,
};

router.get("/", authMiddleware, requirePermission(P.FORMS_READ), (_req, res) => {
  res.json(formVisibility);
});

router.get(
  "/:formName",
  authMiddleware,
  requirePermission(P.FORMS_READ),
  (req, res) => {
    const { formName } = req.params;
    if (formVisibility[formName] === undefined) {
      return res.status(404).json({ message: `Form "${formName}" not found` });
    }
    res.json({ [formName]: formVisibility[formName] });
  }
);

router.post(
  "/:formName",
  authMiddleware,
  requirePermission(P.FORMS_WRITE),
  (req, res) => {
    const { formName } = req.params;
    const { showForm } = req.body;

    if (typeof showForm !== "boolean") {
      return res.status(400).json({ message: "showForm should be a boolean" });
    }

    formVisibility[formName] = showForm;

    res.json({ message: `Visibility of "${formName}" updated successfully` });
  }
);

export default router;
