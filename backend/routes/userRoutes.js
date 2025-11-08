const express = require("express");
import {signupUser, loginUser, getProfile, updateProfile} from "../controllers/userController.js";
import authMiddleware from ".."


const router = express.Router();

router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post("/profile/:id",authMiddleware,getProfile);
router.post("/profile/:id",authMiddleware,updateProfile);


   

module.exports = router; 