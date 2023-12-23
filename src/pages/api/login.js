// pages/api/login.js
import { compare } from "bcryptjs";
import { getUserByEmail } from "../../utils/auth";
import { sign } from "jsonwebtoken";
export default async function handler(req, res) {
  const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Verify the password
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "3h", // Adjust the expiration time as needed
    });

    res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Secure`);
    console.log("Cookies in headers:", req.headers.cookie);

    // Send success response
    // return res.status(200).json({ success: true });
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login failed", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
