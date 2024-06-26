import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
    const { name, username, CIN, role, email, password, branchID, photo } = req.body;
    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            username,
            CIN,
            role,
            email,
            password: hashedPassword,
            branchID,
            photo
        });
        res.status(201).json({ message: "User registered successfully", userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, CIN, role, email, password, key, branchID, username, photo } = req.body;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            user.name = name;
            user.CIN = CIN;
            user.role = role;
            user.email = email;
            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }
            user.key = key;
            user.branchID = branchID;
            user.username = username;
            user.photo = photo;
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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", userId: user.userID, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


export const signUpUser = async (req, res) => {
    const { name, username, CIN, role, email, password, branchID, photo } = req.body;
    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            username,
            CIN,
            role,
            email,
            password: hashedPassword,
            branchID,
            photo
        });
        res.status(201).json({ message: "User registered successfully", userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};





export const loginUserWithJWT = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Set token to never expire by not defining an expiration time
        const token = jwt.sign({ id: user.id, key: user.key }, process.env.JWT_SECRET, { expiresIn: '100y' });
        res.status(200).json({ message: "Login successful", userId: user.id, token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};