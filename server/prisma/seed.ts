import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "../src/config/db";
import { Role } from "../src/generated/prisma/client";

// Defines the main seeding function
// Database operations are asynchronous, so the function needs to handle promises
async function main() {
  // The ! operator: TypeScript non-null assertion - tells the compiler this won't be undefined 
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL!;

  // Check if super admin already exists
  const existingSuperAdmin = await prisma.user.findUnique({
    where: { email: superAdminEmail },
  });

  if (existingSuperAdmin) {
    console.log("⚠️ Super Admin already exists. Skipping seed.");
    return;
  }

  const hashedPassword = await bcrypt.hash(
    process.env.SUPER_ADMIN_PASSWORD!,
    parseInt(process.env.SALT_ROUNDS!),
  );

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: superAdminEmail,
      password: hashedPassword,
      role: Role.SUPER_ADMIN, // must match Prisma enum
    },
  });

  console.log("✅ Super Admin user seeded successfully");
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
