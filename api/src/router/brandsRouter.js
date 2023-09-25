import express from "express";
import { getBrands, createBrand } from "../routes/brandsRoutes.js";

const router = express.Router();

router.get("/", getBrands);
router.post("/", createBrand);

export default router;
