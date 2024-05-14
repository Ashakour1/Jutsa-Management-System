// User Routes

import express from "express";

const router = express.Router();

// Import user controller
import {getUsers,UserRegister,deleteUser} from "../controllers/user-controller.js";

// Get all users
router.get("/",getUsers)
router.post("/auth/reg",UserRegister)

//delete a user
router.delete('/:id',deleteUser)


// Export router
export default router;
