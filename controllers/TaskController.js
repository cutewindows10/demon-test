// controllers/TaskController.js

import Task from '../models/Task.js'; // Adjust the import path according to your actual Task model location

export const getAllTasks = async (req, res) => {
    try {
        const queryConditions = req.query;
        const tasks = await Task.findAll({ where: queryConditions });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const getTaskById = async (req, res) => {
    const taskId = req.params.id;
    try {
        const task = await Task.findByPk(taskId);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


export const createTask = async (req, res) => {
    const { taskTitle, checklistID } = req.body;
    try {
        const task = await Task.create({
            taskTitle,
            checklistID
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const { taskTitle, checklistID } = req.body;
    try {
        let task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        task.taskTitle = taskTitle;
        task.checklistID = checklistID;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        let task = await Task.findByPk(taskId);
        if (task) {
            await task.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}