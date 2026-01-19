import { Router } from "express";
import { getUserByEmail, signUp, logIn } from "../controllers/auth.controller";

const router = new Router();

router.get("/:email", getUserByEmail);

router.post("/signup", signUp);
router.post("/login", logIn);
