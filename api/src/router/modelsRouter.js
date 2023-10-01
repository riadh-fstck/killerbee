import express from "express";
import {
	getModels,
	createModel,
	updateModel,
	deleteModel,
} from "../routes/modelsRoutes.js";

const router = express.Router();

router.get("/", getModels);
router.post("/", createModel);
router.put("/:id", updateModel);
router.delete("/:id", deleteModel);

export default router;
