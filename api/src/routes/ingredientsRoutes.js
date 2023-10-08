import Ingredient from "../models/postgres-ingredient.js";
import {Op} from "sequelize";

export const getIngredients = async (req, res) => {
	try {
		const ingredients = await Ingredient.findAll()
		res.json(ingredients);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while retrieving the ingredients : ${error}`,
		});
	}
}

export const createIngredient = async (req, res) => {
	try {
		const ingredient = await Ingredient.create(req.body);
		res.json(ingredient);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while creating the ingredient : ${error}`,
		});
	}
}

export const updateIngredient = async (req, res) => {
	try {
		const { id } = req.params;
		const ingredientDataToUpdate = req.body;

		if (!id) {
			return res.status(400).json({ message: "Id parameter is missing" });
		}

		const ingredient = await Ingredient.findOne({ where: { id } });

		if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });

		await ingredient.update(ingredientDataToUpdate);
		res.json({ message: "Ingredient updated successfully" });
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while updating the ingredient : ${error}`,
		});
	}
}

export const deleteIngredient = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Id parameter is missing" });
		}

		const ingredient = await Ingredient.findOne({ where: { id } });

		if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });

		await ingredient.destroy();
		res.json({ message: "Ingredient deleted successfully" });
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while deleting the ingredient : ${error}`,
		});
	}
}

export const getIngredient = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Id parameter is missing" });
		}

		const ingredient = await Ingredient.findOne({
			where: { id },
			include: ["ManufacturingProcesses"],
		});

		if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });

		res.json(ingredient);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while retrieving the ingredient : ${error}`,
		});
	}
}

export const searchIngredients = async (req, res) => {
	try {
		const { name } = req.params;

		if (!name) {
			return res.status(400).json({ message: "Name parameter is missing" });
		}

		const ingredients = await Ingredient.findAll({
			where: { name: { [Op.like]: `%${name}%` } },
			include: ["ManufacturingProcesses"],
		});

		if (!ingredients) return res.status(404).json({ message: "Ingredient not found" });

		res.json(ingredients);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while retrieving the ingredient : ${error}`,
		});
	}
}
