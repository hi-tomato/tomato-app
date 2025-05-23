import { getAccessToken } from "@/lib/authToken";
import axios from "axios";

export const likeAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

likeAPI.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const clickLike = async (id: number) => {
  const response = await likeAPI.post(`/feed/${id}/like`);
  return response.data;
};

export const cancelLike = async (id: number) => {
  const response = await likeAPI.delete(`/feed/${id}/like`);
  return response.data;
};
