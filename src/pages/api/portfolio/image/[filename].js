import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    // Destructure the filename from the request query parameters
    const { filename } = req.query;

    // Construct the absolute path to the file in the /tmp directory
    const filePath = path.join("/tmp", filename);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Set the appropriate content type header based on file extension
      const contentType = getContentType(filename);
      res.setHeader("Content-Type", contentType);

      // Set Content-Disposition header to inline to prevent automatic download
      res.setHeader("Content-Disposition", "inline");

      // Read the file synchronously and send it as response
      const fileContents = fs.readFileSync(filePath);
      res.end(fileContents);
    } else {
      // If file does not exist, send 404 response
      res.status(404).send("File not found");
    }
  } catch (error) {
    console.error("Error handling file request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to determine the content type based on file extension
function getContentType(filename) {
  const extension = path.extname(filename).toLowerCase();
  switch (extension) {
    case ".png":
      return "image/png";
    case ".jpeg":
    case ".jpg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".mp4":
      return "video/mp4";
    case ".mov":
      return "video/quicktime";
    default:
      return "application/octet-stream"; // Default to binary data if content type is unknown
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};
