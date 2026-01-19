import { Router } from "express";
import { getPreferences } from "../controllers/user-preferences.controller.js";
import { auth } from "../middleware/auth.js";

const router = new Router();

router.get("/", auth, getPreferences);
// router.post("/", updatePrefernces);

export default router;
