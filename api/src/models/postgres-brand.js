import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-config.js";
import { Sequelize } from "sequelize";

class Brand extends Model {}

Brand.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		modelName: "Brand",
	}
);

let Modele;
import("./postgres-model.js")
	.then((module) => {
		Modele = module.default;

		Brand.hasMany(Modele, {
			as: "models",
		});
	})
	.catch((error) => {
		console.error("Erreur lors de l'importation du modèle Modele :", error);
	});

export default Brand;
