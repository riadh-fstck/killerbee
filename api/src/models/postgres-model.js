import Sequelize, { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-config.js";
import Process from "./postgres-process.js";
import Ingredient from "./postgres-ingredient.js";

class Modele extends Model {}

Modele.init(
	{
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		price_per_unit: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		range: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		grammage: {
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	},
	{
		sequelize,
		timestamps: true,
		paranoid: true,
		modelName: "Model",
	}
);

Modele.hasMany(Process, {
	foreignKey: 'modele_id'
});

Modele.hasMany(Ingredient, {
	foreignKey: 'modele_id'
})

export default Modele;
