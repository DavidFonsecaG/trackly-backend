import express from "express";
import { getStudentsByUser, getStudentById, createStudent, updateStudent, deleteStudent } from "../controllers/studentController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/list", protect, getStudentsByUser);
router.post("/create", protect, createStudent);
router.delete("/delete/:studentId", protect, deleteStudent);

router.get("/", protect, getStudentsByUser);
router.get("/", protect, getStudentsByUser);

export default router;