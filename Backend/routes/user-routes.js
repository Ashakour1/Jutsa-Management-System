// User Routes

import express from "express";

const router = express.Router();

// Import user controller
import * as UserController from "../controllers/user-controller.js";

// Get all users
router.get("/", ()=>{
    UserController.getUsers();

    return console.log("Get all users hhhh");
});

// Export router
export default router;
