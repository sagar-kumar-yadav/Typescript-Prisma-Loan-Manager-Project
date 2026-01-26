import { Response } from "express";
import { AuthRequest } from "../types/auth";
import prisma from "../config/db";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { Role } from "../generated/prisma/client";

/**
 * LOGIN (Admin / Officer / Customer Service)
 */
export const login = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({ id: user.id, role: user.role });
  res.json({
    token,
    user: { id: user.id, email: user.email, role: user.role },
  });
};

/**
 * REGISTER USER (ADMIN ONLY)
 */
export const registerUser = async (req: AuthRequest, res: Response) => {
  try {
    // 🔐 Only ADMIN can access this route anyway
    if (req.user?.role !== Role.ADMIN) {
      return res.status(403).json({ message: "Only admin can create users" });
    }
    const { name, email, password, role } = req.body;

    // ❌ Block admin creation explicitly
    if (role === Role.ADMIN) {
      return res
        .status(403)
        .json({ message: "Admin cannot create another admin" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    // ✅ Allowed roles only
    const allowedRoles = [Role.OFFICER, Role.CUSTOMER_SERVICE];

    const userRole = allowedRoles.includes(role) ? role : Role.OFFICER; // fallback safe role

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userRole,
        createdBy: {
          connect: { id: req.user.id },
        },
      },
    });

    return res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Registration failed" });
  }
};
