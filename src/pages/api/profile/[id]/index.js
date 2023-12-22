import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function editProfile(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      // Periksa apakah ID yang diberikan valid
      if (!id || id === "0") {
        return res.status(400).json({ error: "Invalid or missing ID" });
      }

      // Dapatkan data profil berdasarkan ID yang diberikan
      const profile = await prisma.profile.findUnique({
        where: {
          id: parseInt(id, 10),
        },
      });

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      res.status(200).json(profile);
    } catch (error) {
      console.error("Error fetching Profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "PUT" || req.method === "PATCH") {
    const { companyName, location, email, instagram, linkMaps } = req.body;

    try {
      // Periksa apakah ID yang diberikan valid
      if (!id || id === "0") {
        return res.status(400).json({ error: "Invalid or missing ID" });
      }

      // Update profil berdasarkan ID yang diberikan
      const updatedProfile = await prisma.profile.update({
        where: {
          id: parseInt(id, 10),
        },
        data: {
          companyName,
          location,
          email,
          instagram,
          linkMaps,
          // tambahkan bidang lain sesuai kebutuhan
        },
      });

      res.status(200).json(updatedProfile);
    } catch (error) {
      console.error("Error updating Profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
