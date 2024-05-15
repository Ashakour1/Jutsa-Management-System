// User Routes

import express from "express";

const router = express.Router();

// Import user controller
import {getUsers,UserRegister,getUser,deleteUser, loginUser} from "../controllers/user-controller.js";


router.get("/",getUsers)
router.post("/auth/reg",UserRegister)
router.post("/auth/login",loginUser)
router.get("/:id",getUser)
router.delete('/:id',deleteUser)


// Export router
export default router;
