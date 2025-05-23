import { Post } from "@/types/feed";
import React, { useState } from "react";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostComments from "./PostComments";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";
import { useDeletePost } from "@/hooks/usePost";
interface PostCardProps {
  post: Post;
}
export default function PostCard({ post }: PostCardProps) {
  const [openComment, setOpenComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [user] = useAtom(userAtom);
  const deleteMutation = useDeletePost();

  const handleDeleteClick = () => {
    deleteMutation.mutate({ id: post.id });
  };

  const canEdit = user?.email === post.user.email;

  const handleLikeClick = () => {
    // TODO: 좋아요 API 연동
    console.log("좋아요 클릭:", post.id);
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <PostHeader
        post={post}
        canEdit={canEdit}
        onEditClick={handleEditStart}
        onDeleteClick={handleDeleteClick}
      />
      <PostContent
        postId={post.id}
        content={post.content}
        isEditing={isEditing}
        onEditCancel={handleEditCancel}
        onEditComplete={handleEditComplete}
      />
      <PostActions
        likeCount={post.likeCount}
        isLiked={post.isLiked}
        commentCount={post.comments.length}
        onLikeClick={handleLikeClick}
        onCommentClick={() => setOpenComment(!openComment)}
      />
      <PostComments
        postId={post.id}
        comments={post.comments}
        isVisible={openComment}
        currentUser={user?.name || user?.email?.split("@")[0]}
      />
    </div>
  );
}
