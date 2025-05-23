"use client";
import CommentList from "@/components/comment/CommentList";
import CommentForm from "@/components/comment/CommentForm";
import { Comment } from "@/types/feed";
import { useCreateComment, useDeleteComment } from "@/hooks/useComment";

interface PostCommentsProps {
  postId: number;
  comments: Comment[];
  isVisible: boolean;
  currentUser: string | undefined;
}

export default function PostComments({
  postId,
  comments,
  isVisible,
  currentUser,
}: PostCommentsProps) {
  const createCommentMutation = useCreateComment();
  const deleteCommentMutation = useDeleteComment();

  const handleCommentSubmit = (postId: number, content: string) => {
    createCommentMutation.mutate({ id: postId, content });
  };

  const handleCommentDelete = (commentId: number) => {
    deleteCommentMutation.mutate({ id: commentId });
  };

  if (!isVisible) return null;
  return (
    <>
      <CommentList
        comments={comments}
        isVisible={true}
        onDelete={handleCommentDelete}
      />
      <CommentForm
        postId={postId}
        currentUser={currentUser}
        onSubmit={handleCommentSubmit}
      />
    </>
  );
}
