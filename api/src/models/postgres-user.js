import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-config.js";

class User extends Model {}

User.init(
    {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordUpdatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM(
                "ROLE_ADMIN",
                "ROLE_STORE_KEEPER",
                "ROLE_USER"
            ),
            defaultValue: "ROLE_USER",
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        loginAttempts: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        isValidate: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        authentificationToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: "User",
    }
);

export default User;
