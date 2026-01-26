import { Request } from "express";
import { Role } from "../generated/prisma/client";

// interfaces define the structure of objects.
export interface AuthUser {
  id: string;
  role: Role;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
