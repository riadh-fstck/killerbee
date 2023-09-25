import Models from "../models/postgres-model.js";

export const getModels = async (req, res) => {
	try {
		const models = await Models.findAll({
			include: "models",
		});
		res.json(models);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while retrieving the models : ${error}`,
		});
	}
};

export const createModel = async (req, res) => {
	try {
		const model = await Models.create(req.body);
		res.json(model);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while creating the model : ${error}`,
		});
	}
};
