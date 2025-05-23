"use client";
import { useState } from "react";
import { useUpdatePost } from "@/hooks/usePost";

interface PostContentProps {
  postId: number;
  content: string;
  isEditing: boolean;
  onEditCancel: () => void;
  onEditComplete: () => void;
}

export default function PostContent({
  postId,
  content,
  isEditing,
  onEditCancel,
  onEditComplete,
}: PostContentProps) {
  const [editContent, setEditContent] = useState(content);
  const updateMutation = useUpdatePost();

  const handleEditSubmit = () => {
    updateMutation.mutate(
      { content: editContent, id: postId },
      {
        onSuccess: () => {
          onEditComplete();
        },
      }
    );
  };

  if (isEditing) {
    return (
      <div className="mb-4">
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          rows={4}
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleEditSubmit}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
            disabled={updateMutation.isPending || !editContent.trim()}
          >
            {updateMutation.isPending ? "저장 중..." : "저장"}
          </button>
          <button
            onClick={onEditCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            취소
          </button>
        </div>
      </div>
    );
  }

  return <p className="text-gray-800 leading-relaxed mb-4">{content}</p>;
}
