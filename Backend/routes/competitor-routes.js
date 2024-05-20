import express from "express";

import { registerCompetitor, getAllCompetitors ,deleteCompetitor, updatedCompetitor } from "../controllers/competitors-controller.js";


const router = express.Router();

router.post("/", registerCompetitor);

router.get("/", getAllCompetitors);

router.put("/update/:id",updatedCompetitor);

router.delete("/:id", deleteCompetitor);


export default router;
