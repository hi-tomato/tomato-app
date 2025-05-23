import { cancelLike, clickLike } from "@/api/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isLiked }: { id: number; isLiked: boolean }) => {
      return isLiked ? cancelLike(id) : clickLike(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("좋아요 상태가 변경되었습니다.");
    },
    onError: (error) => {
      console.error(`좋아요 기능에 문제가 발생하였습니다. ${error.message}`);
    },
  });
};
