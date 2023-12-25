// pages/api/portfolio/image/[filename].js
import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  // Destructure the filename from the request query parameters
  const { filename } = req.query;

  // Construct the absolute path to the image file
  const imagePath = path.join(process.cwd(), "images/portfolio", filename);

  try {
    // Read the image file asynchronously
    const fileContents = await fs.readFile(imagePath);

    // Set the appropriate content type header
    res.setHeader("Content-Type", "image/png"); // Adjust based on your image type

    // Send the file contents as the response
    res.end(fileContents);
  } catch (error) {
    console.error("Error handling image request:", error);
    res.status(404).send("Not Found");
  }
}
