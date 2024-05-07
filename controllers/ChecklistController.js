import Checklist from '../models/Checklist.js';

export const getAllChecklists = async (req, res) => {
    try {
        const queryConditions = req.query;
        const checklists = await Checklist.findAll({ where: queryConditions });
        res.status(200).json(checklists);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getChecklistById = async (req, res) => {
    const checklistId = req.params.id;
    try {
        const checklist = await Checklist.findByPk(checklistId);
        if (checklist) {
            res.status(200).json(checklist);
        } else {
            res.status(404).json({ message: "Checklist not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createChecklist = async (req, res) => {
    const { checklistType } = req.body; // Adjusted to match the model attributes
    try {
        const newChecklist = await Checklist.create({
            checklistType // Adjusted to match the model attributes
        });
        res.status(201).json(newChecklist);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateChecklist = async (req, res) => {
    const checklistId = req.params.id;
    const { checklistType } = req.body; // Adjusted to match the model attributes
    try {
        const checklist = await Checklist.findByPk(checklistId);
        if (checklist) {
            checklist.checklistType = checklistType; // Adjusted to match the model attributes
            await checklist.save();
            res.status(200).json(checklist);
        } else {
            res.status(404).json({ message: "Checklist not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteChecklist = async (req, res) => {
    const checklistId = req.params.id;
    try {
        const checklist = await Checklist.findByPk(checklistId);
        if (checklist) {
            await checklist.destroy();
            res.status(200).json({ message: "Checklist deleted successfully" });
        } else {
            res.status(404).json({ message: "Checklist not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
