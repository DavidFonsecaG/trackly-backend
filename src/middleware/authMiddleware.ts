import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const protect = (req: any, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "Unauthorized" }); 
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: "Token invalid" });
        return;
    }
};