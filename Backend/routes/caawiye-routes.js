import express from "express";

import {
  deleteCaawiye,
  getCaawiyeSupport,
  registerCaawiye,
  updateCaawiye,
} from "../controllers/caawiye-controller.js";

const router = express.Router();

router.route("/").get(getCaawiyeSupport).post(registerCaawiye);

router.route("/:id").put(updateCaawiye).delete(deleteCaawiye);

export default router;
