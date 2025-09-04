import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.route.js";
import mongoose from "mongoose";
dotenv.config();
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/user.route.js";
import chatRoutes from "./Routes/chat.route.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
