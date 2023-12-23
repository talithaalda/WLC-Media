import multer from "multer";
import path from "path";

// Specify the destination folder for file uploads
const uploadDestination = path.join(process.cwd(), "images/talent");

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
        path: `/images/talent/${file.filename}`, // Add the path to the response
      });
    } else {
      // Handle the case where file or file.buffer is undefined
      throw new Error("Uploaded file or buffer is undefined");
    }
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
