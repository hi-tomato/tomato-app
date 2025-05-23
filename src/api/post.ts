import { getAccessToken } from "@/lib/authToken";
import { FeedResponse } from "@/types/feed";
import axios from "axios";

const postAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

postAPI.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * 게시물 추가
 * */
export const createPost = async (content: string) => {
  const response = await postAPI.post("/feed", {
    content,
  });
  return response.data;
};

/**
 * 게시물 받아오기
 * */
export const getPost = async (): Promise<FeedResponse> => {
  const response = await postAPI.get("/feed");
  return response.data;
};

/**
 * 게시물 수정
 * */
export const patchPost = async (content: string, id: number) => {
  const response = await postAPI.patch(`/feed/${id}`, {
    content,
  });
  return response.data;
};

/**
 * 게시물 삭제
 * */
export const deletePost = async (id: number) => {
  const response = await postAPI.delete(`/feed/${id}`);
  return response.data;
};
