import express from "express";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} from "../routes/usersRoutes.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:email", updateUser);
router.delete("/:email", deleteUser);

export default router;
