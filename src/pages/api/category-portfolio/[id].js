// /pages/api/categoryPorto/[id].js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  // Check if the 'id' parameter is missing or not a valid integer
  if (!id || isNaN(parseInt(id, 10))) {
    return res.status(400).json({ error: "Invalid or missing 'id' parameter" });
  }

  try {
    const categoryPorto = await prisma.categoryPorto.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (!categoryPorto) {
      return res.status(404).json({ error: "categoryPorto not found" });
    }

    // res.status(200).json(categoryPorto);
  } catch (error) {
    console.error("Error fetching categoryPorto:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
