import { Router } from "express";

const router = new Router();

router.get("/", getPreferences);
router.post("/", updatePrefernces);
