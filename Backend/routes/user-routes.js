// User Routes

import express from "express";

const router = express.Router();

// Import user controller
import {getUsers,UserRegister,getUser,deleteUser} from "../controllers/user-controller.js";


router.get("/",getUsers)
router.post("/auth/reg",UserRegister)
router.get("/:id",getUser)
router.delete('/:id',deleteUser)


// Export router
export default router;
