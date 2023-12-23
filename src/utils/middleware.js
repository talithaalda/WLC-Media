// middleware/auth.js
import { verify } from "jsonwebtoken";
import { getSession } from "next-auth/react";

const authMiddleware = (handler) => async (req, res) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // You can add more checks here based on your requirements

    return handler(req, res);
  } catch (error) {
    console.error("Authentication failed", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default authMiddleware;
