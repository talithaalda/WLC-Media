// /api/portfolio/create.js

import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if (req.method === "POST") {
    const { title, sow, talent, path, filename } = req.body;

    try {
      // Simpan data portfolio ke database menggunakan Prisma
      const newPortfolio = await prisma.porto.create({
        data: {
          title,
          // categoryId: parseInt(categoryId),
          sow,
          talent,
          path,
          brand,
          filename,
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
