import { Comment } from "@/types/comment";
import React from "react";

interface CommentListProps {
  comments: Comment[];
  isVisible: boolean;
}
export default function CommentList({ comments, isVisible }: CommentListProps) {
  console.log("받아온 코멘트:" + comments);
  return (
    <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50 rounded-lg">
      <div className="px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          💬 댓글 {comments.length}개
        </h3>

        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-3xl mb-2">🤔</div>
            <p className="text-sm">아직 댓글이 없어요</p>
            <p className="text-xs text-gray-400 mt-1">
              첫 번째 댓글을 남겨보세요!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex gap-3">
                  {/* 프로필 아바타 */}
                  <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white text-xs font-bold">
                      {comment.writer[0]}
                    </span>
                  </div>

                  {/* 댓글 내용 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm text-gray-800 group-hover:text-gray-900 transition-colors">
                        {comment.writer}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {/* {comment.createdAt)} */}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed break-words group-hover:text-gray-800 transition-colors">
                      {comment.content}
                    </p>

                    {/* 댓글 액션 버튼들 */}
                    <div className="flex items-center gap-4 mt-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-gray-500 hover:text-red-500 transition-colors ">
                        좋아요
                      </button>
                      <button className="text-gray-500 hover:text-blue-500 transition-colors">
                        수정
                      </button>
                      <button className="text-gray-500">삭제</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
