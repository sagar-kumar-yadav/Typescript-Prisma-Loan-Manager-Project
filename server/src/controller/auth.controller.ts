import { Response } from "express";
import { AuthRequest } from "../types/auth";
import prisma from "../config/db";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { Role } from "../generated/prisma/client";

/**
 * LOGIN ( Super Admin / Admin / Officer / Customer Service)
 */
export const login = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  // 1. Check user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // 2. Check password
  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // 3. Generate token
  const token = generateToken({
    id: user.id,
    role: user.role, // SUPER_ADMIN / ADMIN / OFFICER / CUSTOMER_SERVICE
  });

  // 4. Send token to client
  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
};

/**
 * REGISTER USER
 * Super Admin → can create Admin
 * Admin → can create Officer & Customer Service
 */
export const registerUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, email, password, role } = req.body;

    // Validate role
    if (!Object.values(Role).includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Block SUPER_ADMIN creation
    if (role === Role.SUPER_ADMIN) {
      return res
        .status(403)
        .json({ message: "SUPER_ADMIN cannot be created via API" });
    }

    // Role rules
    if (req.user.role === Role.SUPER_ADMIN && role !== Role.ADMIN) {
      return res
        .status(403)
        .json({ message: "Super Admin can only create Admin users" });
    }

    // Admin can create only Officer or Customer Service
    if (req.user.role === Role.ADMIN) {
      if (![Role.OFFICER, Role.CUSTOMER_SERVICE].includes(role)) {
        return res.status(403).json({
          message: "Admin can create Officer or Customer Service only",
        });
      }
    }

    // Only SUPER_ADMIN or ADMIN can create users
    if (req.user.role !== Role.SUPER_ADMIN && req.user.role !== Role.ADMIN) {
      return res.status(403).json({ message: "Access denied" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        createdById: req.user.id,
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
