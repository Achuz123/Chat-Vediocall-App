import { generateStreamToken } from "../models/stream.js";
export const getSteamToken = (req, res) => {
  try {
    const token = generateStreamToken(req.user.id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate token" });
  }
};
