import { createPost, deletePost, getPost, patchPost } from "@/api/post";
import { CreatePostRequest } from "@/types/feed";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreatePost = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ content }: CreatePostRequest) => createPost(content),
    onSuccess: (data) => {
      console.log(`서버로 게시물을 전송하였습니다. ${data}`);
      router.push("/");
    },
    onError: (error) => {
      console.error(
        `게시물을 서버에 보내는 도중 문제가 발생하였습니다.`,
        error.message
      );
    },
  });
};

export const useGetPost = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPost,
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ content, id }: { content: string; id: number }) =>
      patchPost(content, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("업데이트를 완료하였습니다.");
    },
    onError: (error) => {
      console.error(
        `데이터를 업데이트하던 중 오류가 발생하였습니다. ${error.message}`
      );
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("게시글을 삭제하였습니다.");
    },
    onError: (error) => {
      console.error(
        `데이터를 삭제하던 중 오류가 발생하였습니다. ${error.message}`
      );
    },
  });
};
