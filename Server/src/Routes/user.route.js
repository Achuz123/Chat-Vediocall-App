import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

import {
  getMyFriends,
  getReccomendedUsers,
  sendFriendRequest,
} from "../controllers/user.controllers.js";
const router = express.Router();

router.use(protectRoute); // Protect all routes after this middleware

router.get("/", getReccomendedUsers);
router.get("/friends", getMyFriends);
router.post("/friend-request/:id", sendFriendRequest);

export default router;
