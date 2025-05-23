"use client";
import { useState } from "react";
import { useUpdateComment } from "@/hooks/useComment";

interface CommentEditProps {
  commentId: number;
  currentContent: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function CommentEdit({
  commentId,
  currentContent,
  onCancel,
  onSuccess,
}: CommentEditProps) {
  const [content, setContent] = useState(currentContent);
  const updateMutation = useUpdateComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      updateMutation.mutate(
        { id: commentId, content: content.trim() },
        {
          onSuccess: () => {
            onSuccess();
          },
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        rows={2}
        placeholder="댓글을 수정하세요..."
      />
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          disabled={updateMutation.isPending || !content.trim()}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {updateMutation.isPending ? "수정 중..." : "수정"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
        >
          취소
        </button>
      </div>
    </form>
  );
}
