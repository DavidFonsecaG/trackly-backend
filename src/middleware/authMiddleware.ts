import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";

export const protect = (req: any, res: Response, next: NextFunction): void => {
    const token = req.cookies?.token;

    if (!token) {
        res.status(200).json(null); 
        return;
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
    } catch {
        res.status(200).json(null);
        return;
    };
};