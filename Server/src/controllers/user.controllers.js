import e from "express";
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

export async function acceptFriendRequest(req, res) {
  try {
    const requestId = req.params.id;
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    //chcek if the logged in user is the recipient of the request

    if (friendRequest.recipient.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this request" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // Add the users to each other's friends list
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { friends: friendRequest.sender },
    });

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: req.user.id },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendRequests(req, res) {
  try {
    const requests = await FriendRequest.find({
      $and: [{ sender: req.user.id }, { status: "pending" }],
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage "
    );

    res.status(200).json({ requests });
  } catch (error) {
    console.error("Error fetching outgoing friend requests:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
