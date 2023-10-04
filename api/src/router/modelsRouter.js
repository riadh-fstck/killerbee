import express from "express";
import {
	getModels,
	createModel,
	updateModel,
	deleteModel, getModel, searchModels,
} from "../routes/modelsRoutes.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", AuthMiddleware, getModels);
router.post("/", AuthMiddleware,createModel);
router.get("/search", AuthMiddleware,searchModels);
router.put("/:id", AuthMiddleware,updateModel);
router.delete("/:id", AuthMiddleware,deleteModel);
router.get("/:id", AuthMiddleware,getModel);

export default router;
