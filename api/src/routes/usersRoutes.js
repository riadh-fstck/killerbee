import User from "../models/postgres-user.js";
import { sendDeletedAccountEmail } from "../services/email.service.js";
import {
    isValidPassword,
    anonymizeUserData,
    generateEncryptionKey,
} from "../services/user.service.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while retrieving the users : ${error}`,
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while creating the user : ${error}`,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { email } = req.params;
        const userDataToUpdate = req.body;

        if (!email) {
            return res
                .status(400)
                .json({ message: "Email parameter is missing" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ message: "User not found" });

        if (userDataToUpdate.password) {
            if (!isValidPassword(req.body.password))
                throw new Error(
                    "Password must contain at least 12 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
                );
            const hashedPassword = await bcrypt.hash(
                userDataToUpdate.password,
                10
            );
            userDataToUpdate.password = hashedPassword;
            userDataToUpdate.passwordUpdatedAt = new Date();
        }
        await user.update(userDataToUpdate);
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while updating the user : ${error}`,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res
                .status(400)
                .json({ message: "Email parameter is missing" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ message: "User not found" });

        const encryptionKey = generateEncryptionKey();

        const anonymizedData = anonymizeUserData(user, encryptionKey);

        await user.update(
            { ...anonymizedData, encryptionKey, disabled: true },
            { where: { email } }
        );

        const isEmailSent = await sendDeletedAccountEmail(email, encryptionKey);

        res.json({
            message: isEmailSent
                ? "User deleted successfully"
                : "User deleted successfully but email not sent",
        });
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while deleting the user : ${error}`,
        });
    }
};