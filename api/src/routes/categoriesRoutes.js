import Category from "../models/postgres-category.js";

export const getCategories = async (req, res) => {
	try {
		const categories = await Category.findAll({
			include: "models",
		});
		res.json(categories);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while retrieving the categories : ${error}`,
		});
	}
};

export const createCategory = async (req, res) => {
	try {
		const category = await Category.create(req.body);
		res.json(category);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while creating the category : ${error}`,
		});
	}
};
