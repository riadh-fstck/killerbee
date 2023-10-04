import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-config.js";

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
                "DBA",
                "BCK",
                "USR"
            ),
            defaultValue: "USR",
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
