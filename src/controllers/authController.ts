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
    const picture = "https://api.dicebear.com/9.x/initials/svg?seed=" + name;
    const user = await User.create({ email, password: hashed, name, picture });

    const token = generateToken(user.id);
    res.cookie("token", token, { httpOnly: true, sameSite: "none", secure: true, maxAge: 60 * 60 * 1000 *24 });
    res.status(201).json({ id: user._id, email: user.email, name: user.name, picture: user.picture });
};

export const logout: RequestHandler = (req, res) => {
    res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
    res.status(200).json({ message: "Logged out" });
};

export const getUser: RequestHandler = async (req: any, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    };
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ id: user._id, email: user.email, name: user.name, picture: user.picture });
};

export const update: RequestHandler = async (req: any, res: any) => {
    const user = await User.findById(req.user.id);
    const { password, newPassword } = req.body;
    
    if (!user || !user.password) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    };

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    };

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(
        user._id,
        { password: hashed },
        { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ message: "Password updated"})
};