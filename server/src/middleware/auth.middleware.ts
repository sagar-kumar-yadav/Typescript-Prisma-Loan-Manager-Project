import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  // get token from headers
  const token = req.headers.authorization?.split(" ")[1];

  // check if token exists or not
  if (!token) {
    return res.sendStatus(401).json({ message: "Unauthorized" }); // Unauthorized
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return res.sendStatus(403).json({ message: "invalid token" }); // Forbidden
  }
};
