import express from "express";
import { getCategories, createCategory } from "../routes/categoriesRoutes.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);

export default router;
