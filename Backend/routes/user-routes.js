// User Routes

import express from "express";

const router = express.Router();

// Import user controller
import {getUsers,UserRegister} from "../controllers/user-controller.js";

// Get all users
router.get("/",getUsers)
router.post("/auth/reg",UserRegister)

// Export router
export default router;
