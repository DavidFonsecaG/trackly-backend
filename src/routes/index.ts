import { Router } from "express";
import authRoutes from "./authRoutes";
import studentRoutes from "./studentRoutes";
import documentRoutes from "./documentRoutes";
import configRoutes from "./configRoutes";

const router = Router();
router.use("/auth", authRoutes );
router.use("/student", studentRoutes );
router.use("/document", documentRoutes );
router.use("/config", configRoutes );

export default router;