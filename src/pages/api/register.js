// pages/api/register.js

import { createUser, getUserByEmail } from "../../utils/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, password } = req.body;

  // Check if the email already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  try {
    // Create a new user
    const newUser = await createUser(name, email, password);

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
