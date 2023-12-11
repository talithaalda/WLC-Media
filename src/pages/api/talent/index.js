// pages/api/posts.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const talent = await prisma.talent.findMany({
      include: {
        category: true,
      },
    });
    res.status(200).json(talent);
  } catch (error) {
    console.error("Error fetching talent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
