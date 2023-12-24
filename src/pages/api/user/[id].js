// /pages/api/user/[id].js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    // Handle GET request to fetch user data
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(id, 10),
        },
      });
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "PUT") {
    // Handle PUT request to update user data
    try {
      const { name, email, role } = req.body;

      // Validate that title and categoryId are present in the request body
      if (!name || !email || !role) {
        return res
          .status(400)
          .json({ error: "name, email, role are required" });
      }

      // Update the user data
      const updateduser = await prisma.user.update({
        where: {
          id: parseInt(id, 10),
        },
        data: {
          name,
          email,
          role,
        },
      });

      res.status(200).json(updateduser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "DELETE") {
    // Handle DELETE request to delete user data
    try {
      // Delete the user data
      const deleteduser = await prisma.user.delete({
        where: {
          id: parseInt(id, 10),
        },
      });

      res.status(204).end();
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
