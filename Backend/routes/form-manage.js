import express from "express";

const router = express.Router();

let formVisibility = { showForm: true };

// Route to get form visibility status
router.get("/get/form", (req, res) => {
  res.json(formVisibility); // Return current visibility status
});

// Route to update form visibility status
router.post("/form", (req, res) => {
  const { showForm } = req.body;

  if (typeof showForm !== "boolean") {
    return res.status(400).json({ message: "showForm should be a boolean" });
  }

  // Update the in-memory form visibility status
  formVisibility = { showForm };

  res.json({ message: "Form visibility updated successfully" });
});

export default router;
