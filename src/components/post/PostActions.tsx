"use client";
import { BiHeart, BiMessage } from "react-icons/bi";

interface PostActionsProps {
  likeCount: number;
  isLiked: boolean;
  commentCount: number;
  onLikeClick: () => void;
  onCommentClick: () => void;
}

export default function PostActions({
  likeCount,
  isLiked,
  commentCount,
  onLikeClick,
  onCommentClick,
}: PostActionsProps) {
  return (
    <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
      <button
        onClick={onLikeClick}
        className={`flex items-center gap-2 ${
          isLiked ? "text-red-500" : "text-gray-600"
        } hover:text-red-500 transition-colors`}
      >
        <BiHeart />
        <span className="text-sm">{likeCount}</span>
      </button>

      <button
        onClick={onCommentClick}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
      >
        <BiMessage />
        <span className="text-sm">{commentCount}</span>
      </button>
    </div>
  );
}
