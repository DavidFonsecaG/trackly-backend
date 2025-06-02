import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

export const register: RequestHandler = async (req, res) => {
    const { email, password, name } = req.body;
    
    const existing = await User.findOne({ email });
    if (existing) {
        res.status(400).json({ message: "User already registered" });
        return;
    };

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, name });

    const token = generateToken(user.id);
    res.cookie("token", token, { httpOnly: true, sameSite: "strict", secure: false });
    res.status(201).json({ id: user._id, email: user.email, name: user.name });
};

// export const login: RequestHandler = async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
//         res.status(401).json({ message: "Invalid credentials" });
//         return;
//     };

//     const token = generateToken(user.id);
//     res.cookie("token", token, { httpOnly: true, sameSite: "strict", secure: false });
//     res.status(200).json({ id: user._id, email: user.email, name: user.name });
// };

export const logout: RequestHandler = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
};

export const getUser: RequestHandler = async (req: any, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    };

    res.json({ id: user._id, email: user.email, name: user.name });
};
