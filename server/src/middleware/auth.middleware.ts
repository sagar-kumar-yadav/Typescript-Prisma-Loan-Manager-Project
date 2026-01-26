// JWT Auth Middleware (verify token)
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../generated/prisma/client";
import { AuthRequest } from "../types/auth";

interface JwtPayload {
  id: string;
  role: Role;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];


  // check if token exists or not
  if (!token) {
    return res.sendStatus(401).json({ message: "Unauthorized" }); // Unauthorized
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.sendStatus(403).json({ message: "invalid token" }); // Forbidden
  }
};
