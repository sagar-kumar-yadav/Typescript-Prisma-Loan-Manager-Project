import { Router } from "express";
import { login, registerUser } from "../controller/auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { Role } from "../generated/prisma/client";

const router = Router();

// Login route (accessible by all roles)
router.post("/login", login);

// create Admin 
router.post(
  "/create-admin",
  authenticateToken,
  authorize(Role.SUPER_ADMIN),
  registerUser,
);


// SUPER_ADMIN + ADMIN → create OFFICER / CUSTOMER_SERVICE
// Register user route (accessible by Admin only)
router.post(
  "/register",
  authenticateToken,
  authorize(Role.SUPER_ADMIN, Role.ADMIN),
  registerUser,
);

export default router;
