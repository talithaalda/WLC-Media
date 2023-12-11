// /pages/api/categoryTalent/[id].js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  // Check if the 'id' parameter is missing or not a valid integer
  if (!id || isNaN(parseInt(id, 10))) {
    return res.status(400).json({ error: "Invalid or missing 'id' parameter" });
  }

  try {
    const categoryTalent = await prisma.categoryTalent.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (!categoryTalent) {
      return res.status(404).json({ error: "categoryTalent not found" });
    }

    // res.status(200).json(categoryTalent);
  } catch (error) {
    console.error("Error fetching categoryTalent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
