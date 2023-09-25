import express from "express";
import { getUsers, createUser, updateUser } from "../routes/usersRoutes.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:email", updateUser);

export default router;
