import express from "express";

import AuthMiddleware from "../middlewares/authMiddleware.js";
import {
    createIngredient,
    deleteIngredient,
    getIngredient,
    getIngredients,
    searchIngredients,
    updateIngredient
} from "../routes/ingredientsRoutes.js";

const router = express.Router();

router.get("/", AuthMiddleware, getIngredients);
router.post("/", AuthMiddleware, createIngredient);
router.get("/search", AuthMiddleware, searchIngredients);
router.put("/:id", AuthMiddleware, updateIngredient);
router.delete("/:id", AuthMiddleware, deleteIngredient);
router.get("/:id", AuthMiddleware, getIngredient);

export default router;
