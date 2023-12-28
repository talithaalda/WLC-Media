import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function createProfile(req, res) {
  if (req.method === "POST") {
    const { companyName, location, email, instagram, linkMaps, phone } =
      req.body;

    try {
      // Simpan data Profile ke database
      const newProfile = await prisma.profile.create({
        data: {
          companyName,
          location,
          email,
          instagram,
          linkMaps,
          phone,

          // file: filePath, // Gantilah ini dengan path atau URL file yang sesuai
        },
      });

      res.status(201).json(newProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
