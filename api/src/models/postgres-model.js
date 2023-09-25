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
		categoryId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		brandId: {
			type: DataTypes.INTEGER,
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
		modelName: "Model",
	}
);

let Category;
let Brand;
import("./postgres-category.js")
	.then((module) => {
		Modele = module.default;

		Modele.belongsTo(Category, {
			foreignKey: "categoryId",
			as: "category",
		});
	})
	.catch((error) => {
		console.error("Erreur lors de l'importation du modèle Modele :", error);
	});

import("./postgres-brand.js")
	.then((module) => {
		Modele = module.default;

		Modele.belongsTo(Brand, {
			foreignKey: "brandId",
			as: "brand",
		});
	})
	.catch((error) => {
		console.error("Erreur lors de l'importation du modèle Modele :", error);
	});

export default Modele;
