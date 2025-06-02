import express from "express";
import passport from "passport";
import { register, logout, getUser } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";
import { generateToken } from "../utils/jwt";

const router = express.Router();

router.post("/register", register);
router.post("/logout", logout);
router.get("/me", protect, getUser);
router.post("/login",
    passport.authenticate("local", { session: false }),
    (req: any, res) => {
        const token = generateToken(req.user.id);
        res.cookie("token", token, { httpOnly: true, sameSite: "strict", secure: false });
        res.status(200).json({id: req.user._id, email: req.user.email, name: req.user.name });
    }
);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"]}));
router.get("/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    (req: any, res) => {
        const token = generateToken(req.user.id);
        res.cookie("token", token, { httpOnly: true, sameSite: "strict", secure: false });
        res.redirect("http://localhost:5173");
    }
);

export default router;