import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";
import preferencesRouter from "./src/routes/preferences.routes.js";
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use("/auth", authRouter);
app.use("/preferences", preferencesRouter);
