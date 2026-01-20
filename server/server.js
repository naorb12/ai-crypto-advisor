import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";
import userPreferencesRouter from "./src/routes/user-preferences.routes.js";
import { getMarketNews } from "./src/services/dashboard/news.service.js";

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use("/auth", authRouter);
app.use("/user-preferences", userPreferencesRouter);
