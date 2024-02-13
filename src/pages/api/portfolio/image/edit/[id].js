import multer from "multer";
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Specify the destination folder for file uploads
const uploadDestination = path.join(process.cwd(), "images/portfolio");

// Multer configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDestination,
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
}).single("file");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "POST") {
    const fileInfo = await prisma.porto.findUnique({
      where: {
        id: parseInt(id, 10),
      },
    });

    // Mendapatkan informasi path gambar lama dari database atau tempat lain
    const oldImagePath = fileInfo.path; // Gantilah dengan path yang sesuai

    // Menghapus gambar lama
    if (fs.existsSync(path.join(process.cwd(), oldImagePath))) {
      fs.unlinkSync(path.join(process.cwd(), oldImagePath));
    }

    try {
      await new Promise((resolve, reject) => {
        upload(req, res, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      // Access the uploaded file from req.file
      const file = req.file;

      // Check if file and file.buffer are defined before accessing them
      if (file) {
        // Process the file as needed (e.g., save to disk, database, etc.)
        // In this example, we're just sending back the file details
        res.status(200).json({
          originalname: file.originalname,
          encoding: file.encoding,
          mimetype: file.mimetype,
          filename: file.filename,
          path: `/images/portfolio/${file.filename}`, // Add the path to the response
        });
      } else {
        // Handle the case where file or file.buffer is undefined
        throw new Error("Uploaded file or buffer is undefined");
      }
    } catch (error) {
      console.error("Error handling file upload:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const fileInfo = await prisma.porto.findUnique({
        where: {
          id: parseInt(id, 10),
        },
      });

      if (fileInfo) {
        const oldImagePath = fileInfo.path;
        // Check if the file exists before attempting to delete it
        if (fs.existsSync(path.join(process.cwd(), oldImagePath))) {
          fs.unlinkSync(path.join(process.cwd(), oldImagePath));
        }

        res
          .status(200)
          .json({ success: true, message: "Image deleted successfully" });
      } else {
        res.status(404).json({ error: "Image not found" });
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  }
}
