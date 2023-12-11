import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function editTalent(req, res) {
  const { id } = req.query;

  if (req.method === "PUT" || req.method === "PATCH") {
    const {
      name,
      category,
      userIG,
      follIG,
      ERIG,
      startfromIG,
      userTikTok,
      follTikTok,
      ERTikTok,
      startfromTikTok,
    } = req.body;

    try {
      const updatedPortfolio = await prisma.porto.update({
        where: {
          id: parseInt(id, 10),
        },
        data: {
          name,
          categoryId: category,
          userIG,
          follIG,
          ERIG,
          startfromIG,
          userTikTok,
          follTikTok,
          ERTikTok,
          startfromTikTok,
        },
      });

      res.status(200).json(updatedPortfolio);
    } catch (error) {
      console.error("Error updating talent:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
