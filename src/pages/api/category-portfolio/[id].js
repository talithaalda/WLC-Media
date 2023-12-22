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
    if (req.method === "GET") {
      const categoryPorto = await prisma.categoryPorto.findUnique({
        where: {
          id: parseInt(id, 10),
        },
      });

      if (!categoryPorto) {
        return res.status(404).json({ error: "categoryPorto not found" });
      }

      res.status(200).json(categoryPorto);
    } else if (req.method === "DELETE") {
      const deletedCategoryPorto = await prisma.categoryPorto.delete({
        where: {
          id: parseInt(id, 10),
        },
      });

      if (!deletedCategoryPorto) {
        return res.status(404).json({ error: "categoryPorto not found" });
      }

      res.status(204).end(); // 204 No Content for successful deletion
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
