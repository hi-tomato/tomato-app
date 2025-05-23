"use client";
import { Post } from "@/types/feed";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface PostHeaderProps {
  post: Post;
  canEdit: boolean;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export default function PostHeader({
  post,
  canEdit,
  onEditClick,
  onDeleteClick,
}: PostHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">{post.user.name[0]}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        {canEdit && (
          <button
            onClick={onEditClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
            title="수정하기"
          >
            <FiEdit className="text-neutral-500 hover:text-orange-500 w-5 h-5" />
          </button>
        )}
        <button
          onClick={onDeleteClick}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="삭제하기"
        >
          <FiTrash2 className="text-neutral-500 hover:text-rose-500 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
