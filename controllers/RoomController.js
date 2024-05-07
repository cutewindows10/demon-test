import Room from '../models/Room.js';

export const getAllRooms = async (req, res) => {
    try {
        const queryConditions = req.query;
        const rooms = await Room.findAll({ where: queryConditions });
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getRoomById = async (req, res) => {
    const roomId = req.params.id;
    try {
        const room = await Room.findByPk(roomId);
        if (room) {
            res.status(200).json(room);
        } else {
            res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createRoom = async (req, res) => {
    const { roomName, branchID, status } = req.body;
    try {
        const newRoom = await Room.create({
            roomName, branchID, status
        });
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateRoom = async (req, res) => {
    const roomId = req.params.id;
    const { roomName, branchID, status } = req.body;
    try {
        const room = await Room.findByPk(roomId);
        if (room) {
            room.roomName = roomName;
            room.branchID = branchID;
            room.status = status;
            await room.save();
            res.status(200).json(room);
        } else {
            res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteRoom = async (req, res) => {
    const roomId = req.params.id;
    try {
        const room = await Room.findByPk(roomId);
        if (room) {
            await room.destroy();
            res.status(200).json({ message: "Room deleted successfully" });
        } else {
            res.status(404).json({ message: "Room not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
