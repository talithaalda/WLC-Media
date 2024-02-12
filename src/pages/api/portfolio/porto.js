// pages/api/posts.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const page = parseInt(req.query.page) || 1; // Halaman saat ini, default 1
  const limit = parseInt(req.query.limit) || 6; // Jumlah item per halaman, default 6
  const offset = (page - 1) * limit;

  try {
    const porto = await prisma.porto.findMany({
      take: limit,
      skip: offset,
      include: {
        category: true,
      },
    });

    const totalCount = await prisma.porto.count(); // Menghitung total jumlah data

    const hasNextPage = offset + limit < totalCount;
    const hasPreviousPage = page > 1;

    const nextPage = hasNextPage ? page + 1 : null;
    const previousPage = hasPreviousPage ? page - 1 : null;

    const paginationInfo = {
      nextPage: nextPage,
      previousPage: previousPage,
    };

    res.status(200).json({ porto, paginationInfo });
  } catch (error) {
    console.error("Error fetching porto:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
