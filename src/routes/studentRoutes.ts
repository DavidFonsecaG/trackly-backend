import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getStudentsByUser, createStudent, updateStudent, deleteStudent } from "../controllers/studentController";

const router = express.Router();

router.get("/list", protect, getStudentsByUser);
router.post("/create", protect, createStudent);
router.post("/update", protect, updateStudent);
router.delete("/delete/:studentId", protect, deleteStudent);

export default router;