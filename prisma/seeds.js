// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const prisma = new PrismaClient();
  const saltRounds = 10;
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "talithaalda@gmail.com",
      password: await bcrypt.hash("123456", saltRounds),
      role: "admin",
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
