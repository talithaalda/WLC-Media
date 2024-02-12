import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function createTalent(req, res) {
  if (req.method === "POST") {
    const {
      name,
      categoryId,
      userIG,
      follIG,
      ERIG,
      startfromIG,
      userTikTok,
      follTikTok,
      ERTikTok,
      startfromTikTok,
      path,
      filename,
    } = req.body;

    try {
      // Simpan data Talent ke database
      const newTalent = await prisma.talent.create({
        data: {
          name,
          category: parseInt(categoryId),
          userIG,
          follIG,
          ERIG,
          startfromIG,
          userTikTok,
          follTikTok,
          ERTikTok,
          startfromTikTok,
          path,
          filename,
          category: {
            connect: { id: categoryId }, // Connect to an existing category by ID
          },
        },
      });

      res.status(201).json(newTalent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
