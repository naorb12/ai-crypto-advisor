import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { addFeedback } from "../controllers/feedback.controller.js";

const router = new Router();

router.post("/", auth, addFeedback);
export default router;
