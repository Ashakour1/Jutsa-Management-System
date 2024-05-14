// User Routes

import express from "express";

const router = express.Router();

// Import user controller

import {getUsers,UserRegister,getUser,deleteUser} from "../controllers/user-controller.js";

// Get all users
router.get("/",getUsers)
router.post("/auth/reg",UserRegister)
router.get("/:id",getUser)

//delete a user
router.delete('/:id',deleteUser)


// Export router
export default router;
