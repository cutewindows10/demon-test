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


export const getDoneTasksByDate = async (req, res) => {
    const { day, month, year } = req.query;

    try {
        const whereClause = {};
        if (day) whereClause.date = sequelize.where(sequelize.fn('DAY', sequelize.col('date')), day);
        if (month) whereClause.date = sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), month);
        if (year) whereClause.date = sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year);

        const doneTasks = await DoneTask.findAll({
            where: whereClause
        });

        if (doneTasks.length > 0) {
            res.status(200).json(doneTasks);
        } else {
            res.status(404).json({ message: "No done tasks found for the specified date." });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const getDoneTasksByCurrentTime = async (req, res) => {
    const { timeFrame } = req.query; // timeFrame can be 'day', 'month', 'week', 'year'
    const currentDate = new Date();

    try {
        const whereClause = {};
        if (timeFrame === 'day') {
            whereClause.date = sequelize.where(sequelize.fn('DAY', sequelize.col('date')), currentDate.getDate());
            whereClause.date = sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), currentDate.getMonth() + 1);
            whereClause.date = sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), currentDate.getFullYear());
        } else if (timeFrame === 'month') {
            whereClause.date = sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), currentDate.getMonth() + 1);
            whereClause.date = sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), currentDate.getFullYear());
        } else if (timeFrame === 'week') {
            const currentDay = currentDate.getDay();
            const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDay));
            const lastDayOfWeek = new Date(firstDayOfWeek);
            lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

            whereClause.date = {
                [sequelize.Op.gte]: firstDayOfWeek,
                [sequelize.Op.lte]: lastDayOfWeek
            };
        } else if (timeFrame === 'year') {
            whereClause.date = sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), currentDate.getFullYear());
        } else {
            return res.status(400).json({ message: "Invalid time frame specified. Choose 'day', 'month', 'week', or 'year'." });
        }

        const doneTasks = await DoneTask.findAll({
            where: whereClause
        });

        if (doneTasks.length > 0) {
            res.status(200).json(doneTasks);
        } else {
            res.status(404).json({ message: "No done tasks found for the specified time frame." });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
