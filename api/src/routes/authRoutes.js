import User from "../models/postgres-user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {generateAuthentificationToken,} from "../services/auth.service.js";

export const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        if (!(name && email && password && role))
            throw new Error("Invalid arguments");

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({
            where: {email},
        });

        if (existingUser) throw new Error(`Email "${email}" is already taken`);

        const authentificationToken = generateAuthentificationToken();

        const newUser = await User.create({
            name,
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
            message: "Utilisateur créé avec succès",
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
        const {email, password} = req.body;

        const user = await User.findOne({where: {email}});

        if (!user)
            return res.status(401).json({message: "Invalid credentials"});

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
            return res.status(401).json({message: "Identifiants invalides"});


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

        res.json(userWithToken);
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            error: `An error occurred during login: ${error.message}`,
        });
    }
};
