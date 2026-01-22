import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  generateDashboard,
  getNews,
  getPrices,
  getAIInsight,
  getMeme,
} from "../controllers/dashboard.controller.js";

const router = new Router();

router.get("/", auth, generateDashboard);
router.get("/news", auth, getNews);
router.get("/prices", auth, getPrices);
router.get("/ai-insight", auth, getAIInsight);
router.get("/meme", auth, getMeme);
export default router;
