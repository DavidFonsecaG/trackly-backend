import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getConfig, updateConfig } from "../controllers/configController";

const router = express.Router();

router.get("/", protect, getConfig);
router.post("/update", protect, updateConfig);

export default router;
