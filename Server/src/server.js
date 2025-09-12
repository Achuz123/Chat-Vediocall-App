import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.route.js";
import mongoose from "mongoose";
dotenv.config();
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/user.route.js";
import chatRoutes from "./Routes/chat.route.js";
import cors from "cors";
import path from "path ";

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
