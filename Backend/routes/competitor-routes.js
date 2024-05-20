import express from "express";

import { registerCompetitor, getAllCompetitors ,deleteCompetitor } from "../controllers/competitors-controller.js";


const router = express.Router();

router.post("/", registerCompetitor);

router.get("/", getAllCompetitors);

router.delete("/:id", deleteCompetitor);


export default router;
