// /pages/api/talent/[id].js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Handle GET request to fetch talent data
    try {
      const talent = await prisma.talent.findUnique({
        where: {
          id: parseInt(id, 10),
        },
        // include: {
        //   category: true,
        // },
      });
      if (!talent) {
        return res.status(404).json({ error: "talent not found" });
      }

      res.status(200).json(talent);
    } catch (error) {
      console.error("Error fetching talent:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "PUT") {
    // Handle PUT request to update talent data
    try {
      const {
        name,
        userIG,
        follIG,
        ERIG,
        startfromIG,
        userTikTok,
        follTikTok,
        ERTikTok,
        startfromTikTok,
        category,
        filename,
        path,
      } = req.body;

      // Validate that name and categoryId are present in the request body
      if (
        !name ||
        !category ||
        !userIG ||
        !follIG ||
        !ERIG ||
        !startfromIG ||
        !userTikTok ||
        !follTikTok ||
        !ERTikTok ||
        !startfromTikTok
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Update the talent data
      const updatedtalent = await prisma.talent.update({
        where: {
          id: parseInt(id, 10),
        },
        data: {
          name,
          category,
          // categoryId: parseInt(categoryId, 10),
          userIG,
          follIG,
          ERIG,
          startfromIG,
          userTikTok,
          follTikTok,
          ERTikTok,
          startfromTikTok,
          filename,
          path,
        },
        // include: {
        //   category: true,
        // },
      });

      res.status(200).json(updatedtalent);
    } catch (error) {
      console.error("Error updating talent:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "DELETE") {
    // Handle DELETE request to delete talent data
    try {
      // Delete the talent data
      const deletedtalent = await prisma.talent.delete({
        where: {
          id: parseInt(id, 10),
        },
        // include: {
        //   category: true,
        // },
      });

      res.status(204).end();
    } catch (error) {
      console.error("Error deleting talent:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
