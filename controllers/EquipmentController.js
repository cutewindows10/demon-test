import Equipment from '../models/Equipment.js';

export const getAllEquipment = async (req, res) => {
    try {
        const queryConditions = req.query;
        const equipment = await Equipment.findAll({ where: queryConditions });
        res.status(200).json(equipment);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getEquipmentById = async (req, res) => {
    const equipmentId = req.params.id;
    try {
        const equipment = await Equipment.findByPk(equipmentId);
        if (equipment) {
            res.status(200).json(equipment);
        } else {
            res.status(404).json({ message: "Equipment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createEquipment = async (req, res) => {
    const { equipmentName, roomID, checklistID } = req.body;
    try {
        const newEquipment = await Equipment.create({
            equipmentName, roomID, checklistID
        });
        res.status(201).json(newEquipment);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateEquipment = async (req, res) => {
    const equipmentId = req.params.id;
    const { equipmentName, roomID, checklistID } = req.body;
    try {
        const equipment = await Equipment.findByPk(equipmentId);
        if (equipment) {
            equipment.equipmentName = equipmentName;
            equipment.roomID = roomID;
            equipment.checklistID = checklistID;
            await equipment.save();
            res.status(200).json(equipment);
        } else {
            res.status(404).json({ message: "Equipment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteEquipment = async (req, res) => {
    const equipmentId = req.params.id;
    try {
        const equipment = await Equipment.findByPk(equipmentId);
        if (equipment) {
            await equipment.destroy();
            res.status(200).json({ message: "Equipment deleted successfully" });
        } else {
            res.status(404).json({ message: "Equipment not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
