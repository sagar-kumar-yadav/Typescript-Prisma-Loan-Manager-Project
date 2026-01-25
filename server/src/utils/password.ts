import bcrypt from "bcrypt";

// Hash the password using bcrypt
export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

// Compare the plain password with the hashed password
export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
