// admin authorization middleware
import { Response, NextFunction } from "express";
import { Role } from "../generated/prisma/client";
import { AuthRequest } from "../types/auth";

export const authorize =
  (...allowedRoles: Role[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userRole = req.user.role as Role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: Access is denied" });
    }

    next();
  };
