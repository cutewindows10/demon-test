// controllers/DoneTasksController.js

import DoneTask from '../models/DoneTask.js'; 

export const getAllDoneTasks = async (req, res) => {
    try {
        const queryConditions = req.query;
        const doneTasks = await DoneTask.findAll({ where: queryConditions });
        res.status(200).json(doneTasks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


export const getDoneTaskById = async (req, res) => {
    const doneTaskID = req.params.id;
    try {
        const doneTask = await DoneTask.findOne({ where: { doneTaskID: doneTaskID } });
        if (doneTask) {
            res.status(200).json(doneTask);
        } else {
            res.status(404).json({ message: "DoneTask not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}





export const createDoneTask = async (req, res) => {
    const { taskID, equipmentID, date, photo, okay, problem, solution, userID, roomID } = req.body;
    try {
        const doneTask = await DoneTask.create({
            taskID,
            equipmentID,
            date,
            photo,
            okay,
            problem,
            solution,
            userID,
            roomID
        });
        res.status(201).json(doneTask);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const updateDoneTask = async (req, res) => {
    const doneTaskID = req.params.id;
    const { taskID, equipmentID, date, photo, okay, problem, solution, userID, roomID } = req.body;
    try {
        let doneTask = await DoneTask.findOne({ where: { doneTaskID: doneTaskID } });
        if (!doneTask) {
            return res.status(404).json({ message: "DoneTask not found" });
        }
        doneTask.taskID = taskID;
        doneTask.equipmentID = equipmentID;
        doneTask.date = date;
        doneTask.photo = photo;
        doneTask.okay = okay;
        doneTask.problem = problem;
        doneTask.solution = solution;
        doneTask.userID = userID;
        doneTask.roomID = roomID;
        await doneTask.save();
        res.status(200).json(doneTask);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const deleteDoneTask = async (req, res) => {
    const doneTaskID = req.params.id;
    try {
        let doneTask = await DoneTask.findOne({ where: { doneTaskID: doneTaskID } });
        if (doneTask) {
            await doneTask.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: "DoneTask not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}