import { Router } from "express";
import { login, registerUser } from "../controller/auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

// Login route (accessible by all roles)
router.post("/login", login);

// Register user route (accessible by Admin only)
router.post("/register", authorize(["Admin"]), authenticateToken, registerUser);

export default router;
