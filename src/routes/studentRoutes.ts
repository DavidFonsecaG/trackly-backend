import express from "express";
import { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } from "../controllers/studentController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect, getAllStudents);

export default router;