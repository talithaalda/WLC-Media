// pages/api/posts.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const categoryPorto = await prisma.categoryPorto.findMany();
    res.status(200).json(categoryPorto);
  } catch (error) {
    console.error("Error fetching categoryPorto:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
