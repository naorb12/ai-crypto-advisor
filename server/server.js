import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";
import userPreferencesRouter from "./src/routes/user-preferences.routes.js";
import dashboardRouter from "./src/routes/dashboard.routes.js";
import feedbackRouter from "./src/routes/feedback.routes.js";

const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use("/auth", authRouter);
app.use("/user-preferences", userPreferencesRouter);
app.use("/dashboard", dashboardRouter);
app.use("/feedback", feedbackRouter);
