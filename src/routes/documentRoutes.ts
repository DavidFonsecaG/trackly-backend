import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createStudentDocument, getStudentDocumentsByUser } from "../controllers/documentController";

const router = express.Router();

router.post("/create", protect, createStudentDocument);
router.post("/list", protect, getStudentDocumentsByUser);

export default router;