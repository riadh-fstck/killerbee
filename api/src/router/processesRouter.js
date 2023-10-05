import express from "express";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import {
    createProcess,
    deleteProcess,
    getProcess,
    getProcesses,
    searchProcesses,
    updateProcess
} from "../routes/processRoutes.js";

const router = express.Router();

router.get("/", AuthMiddleware, getProcesses);
router.post("/", AuthMiddleware, createProcess);
router.get("/search", AuthMiddleware, searchProcesses);
router.put("/:id", AuthMiddleware, updateProcess);
router.delete("/:id", AuthMiddleware, deleteProcess);
router.get("/:id", AuthMiddleware, getProcess);


export default router;
