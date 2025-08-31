import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getReccomendedUsers(req, res) {
  try {
    const userId = req.user.id;
    const currentUser = req.user;

    const getReccomendedUsers = await User.find({
      $and: [
        { _id: { $ne: userId } }, //excliude current user
        { _id: { $nin: currentUser.friends } }, //exclude friends
        { isOnboarded: true },
      ],
    }).select("-password");

    res.status(200).json(getReccomendedUsers);
  } catch (error) {
    console.error("Error fetching reccomended users:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage "
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error fetching user friends:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const recipientId = req.params.id;
    // Prevent sending request to oneself
    if (myId == recipientId) {
      return res
        .status(400)
        .json({ message: "You cannot send request to yourself" });
    }

    const recipient = await User.findById(recipientId);

    // Check if recipient exists
    if (!recipient) {
      return res.status(404).json({ message: "Recipient user not found" });
    }

    // Check if already friends
    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    // Check if a pending request already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "A friend request already exists" });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(200).json({ message: "Friend request sent", friendRequest });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

expo;
