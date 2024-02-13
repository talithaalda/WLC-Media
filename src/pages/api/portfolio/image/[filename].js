import fs from "fs/promises";
import path from "path";
import os from "os";

export default async function handler(req, res) {
  // Destructure the filename from the request query parameters
  const { filename } = req.query;

  // Construct the absolute path to the file in the /tmp directory
  const filePath = path.join(os.tmpdir(), filename); // Change the directory to /tmp

  try {
    // Read the file asynchronously
    const fileContents = await fs.readFile(filePath);

    // Set the appropriate content type header based on file extension
    const contentType = getContentType(filename);
    res.setHeader("Content-Type", contentType);

    // Set Content-Disposition header to inline to prevent automatic download
    res.setHeader("Content-Disposition", "inline");

    // Send the file contents as the response
    res.end(fileContents);
  } catch (error) {
    console.error("Error handling file request:", error);
    res.status(404).send("Not Found");
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
