import Documentation from "../models/documentation.js";

export const getAllDocumentations = async (req, res) => {
    try {
        const queryConditions = req.query;
        const documentations = await Documentation.findAll({ where: queryConditions });
        res.status(200).json(documentations);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getDocumentationById = async (req, res) => {
    const documentationId = req.params.id;
    try {
        const documentation = await Documentation.findByPk(documentationId);
        if (documentation) {
            res.status(200).json(documentation);
        } else {
            res.status(404).json({ message: "Documentation not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createDocumentation = async (req, res) => {
    const { userID, data, file } = req.body;
    try {
        const newDocumentation = await Documentation.create({
            userID,
            data,
            file
        });
        res.status(201).json(newDocumentation);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateDocumentation = async (req, res) => {
    const documentationId = req.params.id;
    const { userID, data, file } = req.body;
    try {
        const documentation = await Documentation.findByPk(documentationId);
        if (documentation) {
            documentation.userID = userID;
            documentation.data = data;
            documentation.file = file;
            await documentation.save();
            res.status(200).json(documentation);
        } else {
            res.status(404).json({ message: "Documentation not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteDocumentation = async (req, res) => {
    const documentationId = req.params.id;
    try {
        const documentation = await Documentation.findByPk(documentationId);
        if (documentation) {
            await documentation.destroy();
            res.status(200).json({ message: "Documentation deleted successfully" });
        } else {
            res.status(404).json({ message: "Documentation not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
