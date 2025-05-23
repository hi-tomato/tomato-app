import { getAccessToken } from "@/lib/authToken";
// import { CommentResponse } from "@/types/comment";
import axios from "axios";

const commentAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

commentAPI.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createComment = async (id: number, content: string) => {
  const response = await commentAPI.post(`/feed/${id}/comment`, {
    content,
  });
  return response.data;
};

export const deleteComment = async (id: number) => {
  const response = await commentAPI.delete(`/comment/${id}`);
  return response.data;
};

export const updateComment = async (id: number, content: string) => {
  const response = await commentAPI.patch(`/comment/${id}`, {
    content,
  });
  return response.data;
};
