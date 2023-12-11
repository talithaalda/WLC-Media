// pages/api/posts.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const porto = await prisma.porto.findMany({
      include: {
        category: true,
      },
    });
    res.status(200).json(porto);
  } catch (error) {
    console.error("Error fetching porto:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
