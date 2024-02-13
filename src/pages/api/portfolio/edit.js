import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function editPorto(req, res) {
  const { id } = req.query;

  if (req.method === "PUT" || req.method === "PATCH") {
    const { title, category, sow, talent } = req.body;

    try {
      const updatedPortfolio = await prisma.porto.update({
        where: {
          id: parseInt(id, 10),
        },
        data: {
          title,
          categoryId: category,
          sow,
          talent,
          // tambahkan bidang lain sesuai kebutuhan
        },
      });

      res.status(200).json(updatedPortfolio);
    } catch (error) {
      console.error("Error updating portfolio:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
