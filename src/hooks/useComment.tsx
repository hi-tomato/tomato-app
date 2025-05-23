import { createComment, deleteComment, updateComment } from "@/api/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) =>
      createComment(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("댓글을 추가하는 것을 성공하였습니다.");
    },
    onError: (error) => {
      console.error(
        "댓글을 추가하는 도중 오류가 발생하였습니다.",
        error.message
      );
    },
  });
};
export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) =>
      updateComment(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("댓글 업데이트를 완료하였습니다.");
    },
    onError: (error) => {
      console.error(
        "댓글을 수정하는 도중 오류가 발생하였습니다.",
        error.message
      );
    },
  });
};
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: number }) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("댓글을 삭제하였습니다.");
    },
    onError: (error) => {
      console.error(
        `댓글을 삭제하던 중 오류가 발생하였습니다. ${error.message}`
      );
    },
  });
};
