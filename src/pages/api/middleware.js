// pages/api/dashboard.js
import authMiddleware from "../../utils/middleware";

const dashboardHandler = async (req, res) => {
  // Your dashboard logic here
  res.status(200).json({ message: "Dashboard data" });
};

export default authMiddleware(dashboardHandler);
