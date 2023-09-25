import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-config.js";

class Category extends Model {}

Category.init(
	{
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
		modelName: "Category",
	}
);

let Modele;
import("./postgres-model.js")
	.then((module) => {
		Modele = module.default;

		Category.hasMany(Modele, {
			as: "models",
		});
	})
	.catch((error) => {
		console.error("Erreur lors de l'importation du modèle Modele :", error);
	});

export default Category;
