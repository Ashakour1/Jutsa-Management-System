// finance root file
import express from "express";
import { createFinance, getFinances } from "../controllers/finance-controller.js";

const router = express.Router();

router.post('/create',createFinance)
router.get('/',getFinances)

export default router