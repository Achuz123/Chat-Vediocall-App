import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protectRoute(req, res, next) {
  try {
    const cookie = req.cookies.jwt; //to use this you need to usee cookie parser

    if (!cookie) {
      return res.status(401).json({ message: "Not authorized| No jwt token " });
    }

    const decoded = jwt.verify(cookie, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(decoded.id).select("-password");

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    res.status(401).json({ message: "Not authorized" });
  }
}
