import express from "express";
import passport from "passport";
import { register, login, logout, getUser } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/me", protect, getUser);

export default router;