import User from "../models/postgres-user.js";

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
