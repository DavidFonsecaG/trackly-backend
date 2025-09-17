import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createStudentDocument, getStudentDocumentsByUser, updateStudentDocument, deleteStudentDocument } from "../controllers/documentController";

const router = express.Router();

router.get("/list", protect, getStudentDocumentsByUser);
router.post("/create", protect, createStudentDocument);
router.post("/update", protect, updateStudentDocument);
router.delete("/delete/:studentId", protect, deleteStudentDocument);

export default router;