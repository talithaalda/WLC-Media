import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function createTalent(req, res) {
  if (req.method === "POST") {
    const { name } = req.body;

    try {
      // Simpan data portfolio ke database
      const newcategory = await prisma.categoryTalent.create({
        data: {
          name,
          // file: filePath, // Gantilah ini dengan path atau URL file yang sesuai
        },
      });

      res.status(201).json(newcategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
