// finance root file
import express from "express";
import { createFinance, getFinance, getFinances } from "../controllers/finance-controller.js";

const router = express.Router();

router.post('/create',createFinance)
router.get('/',getFinances)
router.get('/:id',getFinance)

export default router