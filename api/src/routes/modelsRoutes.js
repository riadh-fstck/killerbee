import Model from "../models/postgres-model.js";
import User from "../models/postgres-user.js";
import {Op} from "sequelize";

export const getModels = async (req, res) => {
	try {
		const models = await Model.findAll()
		res.json(models);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while retrieving the models : ${error}`,
		});
	}
};

export const createModel = async (req, res) => {
	try {
		const model = await Model.create(req.body);
		res.json(model);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while creating the model : ${error}`,
		});
	}
};

export const updateModel = async (req, res) => {
	try {
		const { id } = req.params;
		const modelDataToUpdate = req.body;

		if (!id) {
			return res.status(400).json({ message: "Id parameter is missing" });
		}

		const model = await Model.findOne({ where: { id } });

		if (!model) return res.status(404).json({ message: "Model not found" });

		await model.update(modelDataToUpdate);
		res.json({ message: "Model updated successfully" });
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while updating the model : ${error}`,
		});
	}
};

export const deleteModel = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Id parameter is missing" });
		}

		const model = await Model.findOne({ where: { id } });

		if (!model) return res.status(404).json({ message: "Model not found" });

		await model.destroy();

		res.json({
			message: "Model deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while deleting the model : ${error}`,
		});
	}
}

export const getModel = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Id parameter is missing" });
		}

		const model = await Model.findOne({ where: { id } });

		if (!model) return res.status(404).json({ message: "Model not found" });

		res.json(model);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while retrieving the model : ${error}`,
		});
	}
}

export const searchModels = async (req, res) => {
	try {
		const { name } = req.query;

		if (!name) {
			return res.status(400).json({ message: "Name parameter is missing" });
		}

		const models = await Model.findAll({
			where: {
				name: {
					[Op.iLike]: `%${name}%`,
				},
			},
		});

		res.json(models);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while retrieving the models : ${error}`,
		});
	}
}
