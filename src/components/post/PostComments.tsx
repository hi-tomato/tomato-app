"use client";
import CommentList from "@/components/comment/CommentList";
import CommentForm from "@/components/comment/CommentForm";
import { Comment } from "@/types/comment";

interface PostCommentsProps {
  postId: number;
  comments: Comment[];
  isVisible: boolean;
  currentUser: string | undefined;
  onCommentSubmit: (postId: number, content: string) => void;
  onCommentDelete: (commentId: number) => void;
}

export default function PostComments({
  postId,
  comments,
  isVisible,
  currentUser,
  onCommentSubmit,
  onCommentDelete,
}: PostCommentsProps) {
  if (!isVisible) return null;

  return (
    <>
      <CommentList
        comments={comments}
        isVisible={true}
        onDelete={onCommentDelete}
      />
      <CommentForm
        postId={postId}
        currentUser={currentUser}
        onSubmit={onCommentSubmit}
      />
    </>
  );
}
