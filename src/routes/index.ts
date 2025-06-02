import { Router } from "express";
import authRoutes from "./authRoutes";
import studentRoutes from "./studentRoutes";

const router = Router();
router.use("/auth", authRoutes );
router.use("/student", studentRoutes );

export default router;