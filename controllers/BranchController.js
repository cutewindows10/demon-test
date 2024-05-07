import Branch from '../models/Branch.js';

export const getAllBranches = async (req, res) => {
    try {
        const queryConditions = req.query;
        const branches = await Branch.findAll({ where: queryConditions });
        res.status(200).json(branches);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getBranchById = async (req, res) => {
    const branchId = req.params.id;
    try {
        const branch = await Branch.findByPk(branchId);
        if (branch) {
            res.status(200).json(branch);
        } else {
            res.status(404).json({ message: "Branch not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createBranch = async (req, res) => {
    const { branchName } = req.body; // Adjusted to match the model attributes
    try {
        const newBranch = await Branch.create({
            branchName // Adjusted to match the model attributes
        });
        res.status(201).json(newBranch);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateBranch = async (req, res) => {
    const branchId = req.params.id;
    const { branchName } = req.body; // Adjusted to match the model attributes
    try {
        const branch = await Branch.findByPk(branchId);
        if (branch) {
            branch.branchName = branchName; // Adjusted to match the model attributes
            await branch.save();
            res.status(200).json(branch);
        } else {
            res.status(404).json({ message: "Branch not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteBranch = async (req, res) => {
    const branchId = req.params.id;
    try {
        const branch = await Branch.findByPk(branchId);
        if (branch) {
            await branch.destroy();
            res.status(200).json({ message: "Branch deleted successfully" });
        } else {
            res.status(404).json({ message: "Branch not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
