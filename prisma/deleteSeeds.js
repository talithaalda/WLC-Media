const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    // Delete all records from the related tables
    await prisma.porto.deleteMany();
    await prisma.categoryPorto.deleteMany();
    await prisma.talent.deleteMany();
    await prisma.user.deleteMany();
    console.log("Database cleared successfully!");
  } catch (error) {
    console.error("Error clearing the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearDatabase();
