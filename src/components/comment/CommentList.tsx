import { CommentResponse } from "@/types/comment";
import { useState } from "react";
import CommentEdit from "./CommentEdit";
interface CommentListProps {
  comments: CommentResponse[];
  isVisible: boolean;
  onDelete: (commentId: number) => void;
}

export default function CommentList({
  comments,
  onDelete,
  isVisible,
}: CommentListProps) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  if (!isVisible || !comments) return null;

  const handleEditClick = (commentId: number) => {
    setEditingCommentId(commentId);
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
  };

  const handleEditSuccess = () => {
    setEditingCommentId(null);
  };

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white text-xs font-bold">
                {comment.user.name[0]}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm text-gray-800 group-hover:text-gray-900 transition-colors">
                  {comment.user.name}
                </h4>
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>

              {editingCommentId === comment.id ? (
                <CommentEdit
                  commentId={comment.id}
                  currentContent={comment.content}
                  onCancel={handleEditCancel}
                  onSuccess={handleEditSuccess}
                />
              ) : (
                <>
                  <p className="text-sm text-gray-700 leading-relaxed break-words group-hover:text-gray-800 transition-colors">
                    {comment.content}
                  </p>

                  <div className="flex items-center gap-4 mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                      onClick={() => handleEditClick(comment.id)}
                    >
                      수정
                    </button>
                    <button
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      onClick={() => onDelete(comment.id)}
                    >
                      삭제
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
