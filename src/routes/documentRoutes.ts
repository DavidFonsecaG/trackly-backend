import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createStudentDocument, getStudentDocumentsByUser, updateStudentDocument } from "../controllers/documentController";

const router = express.Router();

router.post("/list", protect, getStudentDocumentsByUser);
router.post("/create", protect, createStudentDocument);
router.post("/update", protect, updateStudentDocument);

export default router;