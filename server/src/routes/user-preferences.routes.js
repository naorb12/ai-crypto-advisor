import { Router } from "express";
import {
  getPreferences,
  setPreferences,
} from "../controllers/user-preferences.controller.js";
import { auth } from "../middleware/auth.js";

const router = new Router();

router.get("/", auth, getPreferences);
router.post("/", auth, setPreferences);

export default router;
