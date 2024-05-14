// User Routes

import express from "express";

const router = express.Router();

// Import user controller
import {getUsers,UserRegister,getUser} from "../controllers/user-controller.js";

// Get all users
router.get("/",getUsers)
router.post("/auth/reg",UserRegister)
router.get("/:id",getUser)

// Export router
export default router;
