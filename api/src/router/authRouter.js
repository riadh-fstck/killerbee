import express from "express";
import {
    register,
    login,
    logout,
    validateEmail,
} from "../routes/authRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.post("/validate", validateEmail);

export default router;
