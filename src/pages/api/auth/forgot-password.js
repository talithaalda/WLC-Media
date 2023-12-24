// pages/api/forgot-password.js
import {
  resetPasswordToken,
  getUserByEmail,
  sendResetPasswordEmail,
} from "../../../utils/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    try {
      // Check if the user with the provided email exists
      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate a reset password token
      const token = await resetPasswordToken(user.id);

      // Send a reset password email with the token
      await sendResetPasswordEmail(user.email, token);

      // Respond with success
      return res
        .status(200)
        .json({ message: "Password reset email sent successfully" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // If the request method is not POST, respond with a 405 Method Not Allowed status
  return res.status(405).end();
}
