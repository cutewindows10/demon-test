import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
    try {
        const queryConditions = req.query;
        const users = await User.findAll({ where: queryConditions });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createUser = async (req, res) => {
    const { name, CIN, role, email, password, key, branchID, username } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name, CIN, role, email, password: hashedPassword, key, branchID, username
        });
        res.status(201).json({ message: "User created successfully", userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, CIN, role, email, password, key, branchID, username } = req.body;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            user.name = name;
            user.CIN = CIN;
            user.role = role;
            user.email = email;
            user.password = await bcrypt.hash(password, 10);
            user.key = key;
            user.branchID = branchID;
            user.username = username;
            await user.save();
            res.status(200).json({ message: "User updated successfully", userId: user.id });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.destroy();
            res.status(204).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = password == user.password ;
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", userId: user.userID });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


//test
