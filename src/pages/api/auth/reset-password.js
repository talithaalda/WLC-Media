// pages/api/auth/reset-password.js

import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../../utils/auth";
import { type } from "os";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { token, newPassword } = req.body;

  try {
    // Find the user based on the token
    const user = await prisma.user.findUnique({
      where: {
        token,
      },
    });

    if (!user || !user.token || user.tokenExp < new Date()) {
      return res.status(400).json({ error: "Invalid or expired token" });
    } else if (user.token === token) {
      const hashedPassword = await hashPassword(newPassword);

      // Update the user's password and reset token
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
          token: null,
          tokenExp: null,
        },
      });
    }
    console.log("Password reset successful");
    return res.status(200).json({ success: true });
    // Hash the new password
  } catch (error) {
    console.error("Error resetting password:", error);
    return res
      .status(500)
      .json({ error: "Failed to reset password. Please try again." });
  }
}
