import User from "../models/postgres-user.js";
import { sendDeletedAccountEmail } from "../services/email.service.js";
import {
    isValidPassword,
    anonymizeUserData,
    generateEncryptionKey,
    decryptUserData,
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

export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
            attributes: { exclude: ["password"] },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while retrieving the user : ${error}`,
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
        const { id } = req.params;
        const userDataToUpdate = req.body;

        if (!id) {
            return res.status(400).json({ message: "Id parameter is missing" });
        }

        const user = await User.findOne({ where: { id } });

        if (!user) return res.status(404).json({ message: "User not found" });

        if (userDataToUpdate.email) {
            // Check if email is updated and if it is, check if it is already taken
            const existingUser = await User.findOne({
                where: { email: userDataToUpdate.email },
            });
            if (existingUser)
                throw new Error(
                    `Email "${userDataToUpdate.email}" is already taken`
                );
        }

        if (userDataToUpdate.password) {
            // Check if password is updated and if it is, check if it is valid
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
        const { id } = req.params;

        if (!id) throw new Error("Id parameter is missing");

        const user = await User.findOne({ where: { id } });

        if (!user) return res.status(404).json({ message: "User not found" });

        const encryptionKey = generateEncryptionKey();

        const anonymizedData = anonymizeUserData(user, encryptionKey);

        await user.update(
            { ...anonymizedData, encryptionKey, disabled: true },
            { where: { id } }
        );

        const isEmailSent = await sendDeletedAccountEmail(
            user.email,
            encryptionKey
        );

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

export const recoverUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { encryptionKey } = req.body;

        if (!id) throw new Error("Id parameter is missing");

        const user = await User.findOne({ where: { id } });

        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.disabled)
            throw new Error("User is not disabled, cannot be recovered");

        if (!encryptionKey) throw new Error("Encryption key is missing");

        if (encryptionKey !== user.encryptionKey)
            throw new Error("Invalid encryption key");

        const decryptedData = decryptUserData(user, encryptionKey);

        res.json({
            message: "User data recovered successfully",
            data: decryptedData,
        });
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while recovering the user : ${error}`,
        });
    }
};
