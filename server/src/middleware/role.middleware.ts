// admin authorization middleware
import { Response, NextFunction } from "express";
import { Role } from "../generated/prisma/client";
import { AuthRequest } from "../types/auth";

export const authorize =
  (...roles: Role[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
