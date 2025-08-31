import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.route.js";
import mongoose from "mongoose";
dotenv.config();

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

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
