import { Post } from "@/types/feed";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  const toggleLike = (postId: number) => {
    queryClient.setQueryData<Post[]>(["posts"], (old) => {
      if (!old) return old;
      return old.map((post) => {
        if (post.id !== postId) return post;
        const newIsLiked = !post.isLiked;
        return {
          ...post,
          isLiked: newIsLiked,
          likeCount: post.likeCount + (newIsLiked ? 1 : -1),
        };
      });
    });
  };

  return toggleLike;
};
