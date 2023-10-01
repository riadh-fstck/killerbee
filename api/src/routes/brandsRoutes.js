import Brand from "../models/postgres-brand.js";

export const getBrands = async (req, res) => {
	try {
		const brands = await Brand.findAll({
			include: "models",
		});
		res.json(brands);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while retrieving the brands : ${error}`,
		});
	}
};

export const createBrand = async (req, res) => {
	try {
		const brand = await Brand.create(req.body);
		res.json(brand);
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while creating the brand : ${error}`,
		});
	}
};

export const updateBrand = async (req, res) => {
	try {
		const { id } = req.params;
		const brandDataToUpdate = req.body;

		if (!id) {
			return res.status(400).json({ message: "Id parameter is missing" });
		}

		const brand = await Brand.findOne({ where: { id } });

		if (!brand) return res.status(404).json({ message: "Brand not found" });

		await brand.update(brandDataToUpdate);
		res.json({ message: "Brand updated successfully" });
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while updating the brand : ${error}`,
		});
	}
};

export const deleteBrand = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res.status(400).json({ message: "Id parameter is missing" });
		}

		const brand = await Brand.findOne({ where: { id } });

		if (!brand) return res.status(404).json({ message: "Brand not found" });

		await brand.destroy();

		res.json({
			message: "Brand deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			error: `An error occurred while deleting the brand : ${error}`,
		});
	}
};
