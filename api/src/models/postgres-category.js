import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-config.js";
import { Sequelize } from "sequelize";

class Category extends Model {}

Category.init(
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
	},
	{
		sequelize,
		timestamps: true,
		paranoid: true,
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
