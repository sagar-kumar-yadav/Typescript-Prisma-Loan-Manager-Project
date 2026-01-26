import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "../src/config/db";
import { Role } from "../src/generated/prisma/client";

async function main() {
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
