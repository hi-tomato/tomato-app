import { Post } from "@/types/feed";
import { useQuery } from "@tanstack/react-query";
import mockData from "@/mock/mockPost.json";

const fetchPosts = async (): Promise<Post[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockData.posts.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    comments: post.comments.map((comment) => ({
      ...comment,
      createdAt: new Date(comment.createdAt),
      updatedAt: new Date(comment.updatedAt),
    })),
  }));
};

export const usePost = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};
