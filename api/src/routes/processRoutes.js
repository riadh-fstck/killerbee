import ManufacturingProcesses from "../models/postgres-process.js";
import {Op} from "sequelize";

export const getProcesses = async (req, res) => {
    try {
        // get all processes with the model associated to each process
        const processes = await ManufacturingProcesses.findAll({
            include: ["Model"],
        });
        res.json(processes);
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while retrieving the processes : ${error}`,
        });
    }
}

export const createProcess = async (req, res) => {
    try {
        const process = await ManufacturingProcesses.create(req.body);
        res.json(process);
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while creating the process : ${error}`,
        });
    }
}

export const updateProcess = async (req, res) => {
    try {
        const {id} = req.params;
        const ingredientDataToUpdate = req.body;

        if (!id) {
            return res.status(400).json({message: "Id parameter is missing"});
        }

        const process = await ManufacturingProcesses.findOne({where: {id}});

        if (!process) return res.status(404).json({message: "Process not found"});

        await process.update(ingredientDataToUpdate);
        res.json({message: "Process updated successfully"});
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while updating the process : ${error}`,
        });
    }
}

export const deleteProcess = async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({message: "Id parameter is missing"});
        }

        const process = await ManufacturingProcesses.findOne({where: {id}});

        if (!process) return res.status(404).json({message: "Process not found"});

        await process.destroy();
        res.json({message: "Process deleted successfully"});
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while deleting the process : ${error}`,
        });
    }
}

export const getProcess = async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return res.status(400).json({message: "Id parameter is missing"});
        }

        const process = await ManufacturingProcesses.findOne({
            where: {id},
            include: ["ManufacturingProcesses"],
        });

        if (!process) return res.status(404).json({message: "Process not found"});

        res.json(process);
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while retrieving the process : ${error}`,
        });
    }
}

export const searchProcesses = async (req, res) => {
    try {
        const {name} = req.params;

        if (!name) {
            return res.status(400).json({message: "Name parameter is missing"});
        }

        const processes = await ManufacturingProcesses.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
        });

        if (!processes) return res.status(404).json({message: "Process not found"});

        res.json(processes);
    } catch (error) {
        res.status(500).json({
            error: `An error occurred while retrieving the process : ${error}`,
        });
    }
}

