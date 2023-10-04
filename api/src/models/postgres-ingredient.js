import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-config.js";
import Sequelize from "sequelize";

class Ingredient extends Model {}

Ingredient.init(
	{
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		modele_id: {
			type: DataTypes.UUID,
			allowNull: false,
			foreignKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		timestamps: true,
		paranoid: true,
		modelName: "Ingredient",
	}
);
export default Ingredient;
