import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function createPorto(req, res) {
  if (req.method === "POST") {
    const { title, categoryId } = req.body;

    try {
      // Simpan data portfolio ke database
      const newPortfolio = await prisma.porto.create({
        data: {
          title,
          categoryId,
          // file: filePath, // Gantilah ini dengan path atau URL file yang sesuai
        },
      });

      res.status(201).json(newPortfolio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
