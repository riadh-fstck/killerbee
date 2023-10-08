import express from "express";
import {
    register,
    login,
} from "../routes/authRoutes.js";

const router = express.Router();

// router.post("/register", register);
router.post("/login", login);

export default router;
