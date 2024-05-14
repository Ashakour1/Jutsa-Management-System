// User Routes

import express from "express";

const router = express.Router();

// Import user controller
import {getUsers} from "../controllers/user-controller.js";

// Get all users
router.get("/",getUsers)

// Export router
export default router;
