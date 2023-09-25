import express from "express";
import { getModels, createModel } from "../routes/modelsRoutes.js";

const router = express.Router();

router.get("/", getModels);
router.post("/", createModel);

export default router;
