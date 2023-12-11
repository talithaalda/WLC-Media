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
    } = req.body;

    try {
      // Simpan data Talent ke database
      const newTalent = await prisma.talent.create({
        data: {
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
          // file: filePath, // Gantilah ini dengan path atau URL file yang sesuai
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
