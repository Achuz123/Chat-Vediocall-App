import { axiosInstance } from "./axiosInstance.js";

export const signup = async (userData) => {
  const response = await axiosInstance.post("/auth/signup", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.error("Error fetching auth user:", error);
    return null;
  }
};

export const completeOnboarding = async (onboardingData) => {
  const res = await axiosInstance.post("/auth/onboarding", onboardingData);
  return res.data;
};

export const getfriends = async () => {
  const res = await axiosInstance.get("/users/friends");
  return res.data;
};

export const getRecommendedFriends = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};

export const outgoingFriendRequest = async () => {
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  return res.data;
};

export const sendFriendRequest = async (userId) => {
  const res = await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
};
