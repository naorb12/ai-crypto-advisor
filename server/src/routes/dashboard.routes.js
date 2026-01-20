import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { generateDashboard } from "../controllers/dashboard.controller.js";

const router = new Router();

router.post("/", auth, generateDashboard);
export default router;
