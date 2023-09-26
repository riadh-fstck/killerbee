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

export const updateCategory = async (req, res) => {
	try {
		const { id } = req.params;
		const categoryDataToUpdate = req.body;

		if (!id) {
			return res.status(400).json({ message: "Id parameter is missing" });
		}

		const category = await Category.findOne({ where: { id } });

		if (!category)
			return res.status(404).json({ message: "Category not found" });

		await category.update(categoryDataToUpdate);
		res.json({ message: "Category updated successfully" });
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while updating the category : ${error}`,
		});
	}
};

export const deleteCategory = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Id parameter is missing" });
		}

		const category = await Category.findOne({ where: { id } });

		if (!category)
			return res.status(404).json({ message: "Category not found" });

		await category.destroy();

		res.json({
			message: "Category deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while deleting the category : ${error}`,
		});
	}
};
