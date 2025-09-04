import { axiosInstance } from "./axiosInstance.js";

export const signup = async (userData) => {
  const response = await axiosInstance.post("/auth/signup", userData);
  return response.data;
};
