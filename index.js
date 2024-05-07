import express from "express";
import cors from "cors";
import { sequelize } from "./config/database.js";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser, signUpUser } from "./controllers/UserController.js";
import { getAllBranches, getBranchById, createBranch, updateBranch, deleteBranch } from "./controllers/BranchController.js";
import { getAllDoneTasks, getDoneTaskById, createDoneTask, updateDoneTask, deleteDoneTask } from "./controllers/DoneTaskController.js";
import { getAllEquipment, getEquipmentById, createEquipment, updateEquipment, deleteEquipment } from "./controllers/EquipmentController.js";
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from "./controllers/RoleController.js";
import { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom } from "./controllers/RoomController.js";
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from "./controllers/TaskController.js";
import { getAllChecklists, getChecklistById, createChecklist, updateChecklist, deleteChecklist } from "./controllers/ChecklistController.js";


const app = express();
app.use(cors()); 
app.use(express.json());
const port = 3000;

const connectToDatabase = async () => {
        try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

app.listen(port, async () => {
    await connectToDatabase();
    console.log(`💫 サーバーがポート ${port} で動いてるよ`);
})


app.get('/users', getAllUsers);
app.get('/users/:id', getUserById);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

app.post('/users/login', loginUser);
app.post('/users/signup', signUpUser);

app.get('/branches', getAllBranches);
app.get('/branches/:id', getBranchById);
app.post('/branches', createBranch);
app.put('/branches/:id', updateBranch);
app.delete('/branches/:id', deleteBranch);

app.get('/checklists', getAllChecklists);
app.get('/checklists/:id', getChecklistById);
app.post('/checklists', createChecklist);
app.put('/checklists/:id', updateChecklist);
app.delete('/checklists/:id', deleteChecklist);

app.get('/donetasks', getAllDoneTasks);
app.get('/donetasks/:id', getDoneTaskById);
app.post('/donetasks', createDoneTask);
app.put('/donetasks/:id', updateDoneTask);
app.delete('/donetasks/:id', deleteDoneTask);

app.get('/equipments', getAllEquipment);
app.get('/equipments/:id', getEquipmentById);
app.post('/equipments', createEquipment);
app.put('/equipments/:id', updateEquipment);
app.delete('/equipments/:id', deleteEquipment);

app.get('/roles', getAllRoles);
app.get('/roles/:id', getRoleById);
app.post('/roles', createRole);
app.put('/roles/:id', updateRole);
app.delete('/roles/:id', deleteRole);

app.get('/rooms', getAllRooms);
app.get('/rooms/:id', getRoomById);
app.post('/rooms', createRoom);
app.put('/rooms/:id', updateRoom);
app.delete('/rooms/:id', deleteRoom);

app.get('/tasks', getAllTasks);
app.get('/tasks/:id', getTaskById);
app.post('/tasks', createTask);
app.put('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);

