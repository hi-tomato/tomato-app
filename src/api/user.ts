import axios from "axios";
import { getAccessToken } from "@/lib/authToken";

const userAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

userAPI.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUser = async () => {
  const response = await userAPI.get("/user/me");
  console.log(response.data);
  return response.data;
};
