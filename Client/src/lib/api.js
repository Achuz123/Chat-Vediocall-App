import { axiosInstance } from "./axiosInstance.js";

export const signup = async (userData) => {
  const response = await axiosInstance.post("/auth/signup", userData);
  return response.data;
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const completeOnboarding = async (onboardingData) => {
  const res = await axiosInstance.post("/auth/onboarding", onboardingData);
  return res.data;
};
