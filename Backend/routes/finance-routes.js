// finance root file
import express from "express";
import { createFinance, deleteFinance, getFinance, getFinances, updateFinance } from "../controllers/finance-controller.js";

const router = express.Router();

router.post('/create',createFinance)
router.get('/',getFinances)
router.get('/:id',getFinance)
router.delete('/delete/:id',deleteFinance)
router.put('/update/:id',updateFinance)

export default router