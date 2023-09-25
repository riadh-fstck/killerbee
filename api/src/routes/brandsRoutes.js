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
