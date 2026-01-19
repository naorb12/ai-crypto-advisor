import { Router } from "express";
import { signUp, logIn } from "../controllers/auth.controller.js";

const router = new Router();

router.post("/signup", signUp);
router.post("/login", logIn);

export default router;
