// pages/api/posts.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const categoryTalent = await prisma.categoryTalent.findMany();
    res.status(200).json(categoryTalent);
  } catch (error) {
    console.error("Error fetching categoryTalent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
