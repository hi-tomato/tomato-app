import { getAccessToken } from "@/lib/authToken";
import axios from "axios";

const authAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

const userAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

// 요청 인터셉터
userAPI.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signUp = async (name: string, email: string, password: string) => {
  const response = await authAPI.post("/auth/signup", {
    name,
    email,
    password,
  });
  return response;
};

export const signIn = async (email: string, password: string) => {
  const response = await authAPI.post("/auth/signin", {
    email,
    password,
  });
  return response.data; // { accessToken: string }
};

export const getUser = async () => {
  const response = await userAPI.get("/user/me");
  return response.data;
};
