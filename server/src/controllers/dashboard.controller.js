import { buildDashboard } from "../services/dashboard/dashboard.service.js";

export async function generateDashboard(req, res, next) {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ error: "No user id" });
    }

    const dashboard = await buildDashboard(userId);
    res.status(201).json(dashboard);
  } catch (err) {
    if (err.message === "Preferences don't exist") {
      return res.status(400).json({ error: err.message });
    }
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "error generating dashboard" });
  }
}
