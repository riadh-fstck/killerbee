import User from "../models/postgres-user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateAuthentificationToken } from "../services/auth.service.js";

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, role } = req.body;

        if (!(firstname && lastname && email && password && role))
            throw new Error("Invalid arguments");

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({
            where: { email },
        });

        if (existingUser) throw new Error(`Email "${email}" is already taken`);

        const authentificationToken = generateAuthentificationToken();

        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role,
            authentificationToken,
        });

        const payload = {
            userId: newUser.id,
        };

        const options = {
            expiresIn: "12h",
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, options);

        res.json({
            message: "User created successfully",
            token: token,
        });
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while creating the user : ${error}`,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = {
            userId: user.id,
        };

        const options = {
            expiresIn: "12h",
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, options);

        const userWithToken = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            authentificationToken: user.authentificationToken,
            token,
        };

        delete userWithToken.password;

        res.json(userWithToken);
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            error: `An error occurred during login: ${error.message}`,
        });
    }
};

export const validateEmail = async (req, res) => {
    try {
        const { email, authentificationToken } = req.body;

        const user = await User.findOne({
            where: { email },
        });

        if (!user) throw new Error(`Email "${email}" not found`);

        if (user.authentificationToken !== authentificationToken)
            throw new Error("Invalid token");

        await User.update(
            { isValidate: true, authentificationToken: null },
            { where: { email } }
        );

        res.json({
            message: "Email validated successfully",
        });
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while validating the email : ${error}`,
        });
    }
};

export const logout = async (req, res) => {
    // Logique de déconnexion de l'utilisateur
};
