import express from "express";

import {
  registerPosition,
  getAllPositions,
  deletePosition,
  updatePosition,
} from "../controllers/position-controller.js";

const router = express.Router();

router.get("/", getAllPositions);
router.post("/", registerPosition);
router.put("/:id", updatePosition);
router.delete("/:id", deletePosition);

export default router;
