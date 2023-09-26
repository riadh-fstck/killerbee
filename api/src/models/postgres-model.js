import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-config.js";

class Modele extends Model {}

Modele.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gender: {
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
		modelName: "Model",
	}
);

let Category;
let Brand;
import("./postgres-category.js")
	.then((module) => {
		Category = module.default;

		Modele.belongsTo(Category);
	})
	.catch((error) => {
		console.error("Erreur lors de l'importation du modèle Modele :", error);
	});

import("./postgres-brand.js")
	.then((module) => {
		Brand = module.default;

		Modele.belongsTo(Brand);
	})
	.catch((error) => {
		console.error("Erreur lors de l'importation du modèle Modele :", error);
	});

export default Modele;
