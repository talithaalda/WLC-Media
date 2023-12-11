// /pages/api/portfolio/[id].js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Handle GET request to fetch portfolio data
    try {
      const portfolio = await prisma.porto.findUnique({
        where: {
          id: parseInt(id, 10),
        },
        include: {
          category: true,
        },
      });
      if (!portfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
      }

      res.status(200).json(portfolio);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "PUT") {
    // Handle PUT request to update portfolio data
    try {
      const { title, categoryId } = req.body;

      // Validate that title and categoryId are present in the request body
      if (!title || !categoryId) {
        return res
          .status(400)
          .json({ error: "Title and categoryId are required" });
      }

      // Update the portfolio data
      const updatedPortfolio = await prisma.porto.update({
        where: {
          id: parseInt(id, 10),
        },
        data: {
          title,
          categoryId: parseInt(categoryId, 10),
        },
        include: {
          category: true,
        },
      });

      res.status(200).json(updatedPortfolio);
    } catch (error) {
      console.error("Error updating portfolio:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "DELETE") {
    // Handle DELETE request to delete portfolio data
    try {
      // Delete the portfolio data
      const deletedPortfolio = await prisma.porto.delete({
        where: {
          id: parseInt(id, 10),
        },
        include: {
          category: true,
        },
      });

      res.status(204).end();
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
