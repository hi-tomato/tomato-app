"use client";
import React, { useState } from "react";

interface CommentFormProps {
  postId: number;
  currentUser: string | undefined;
  onSubmit: (postId: number, content: string) => void;
}

export default function CommentForm({
  postId,
  currentUser,
  onSubmit,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(postId, content);
    setContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handlePost(e);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-100 bg-white">
      <form onSubmit={handlePost} className="flex gap-3 items-start">
        {/* 현재 사용자 아바타 */}
        <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="text-white text-xs font-bold">
            {currentUser?.[0] || "🍅"}
          </span>
        </div>

        {/* 입력 영역 */}
        <div className="flex-1 flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="토마토에게 댓글을..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              className={`w-full px-4 py-3 border rounded-full resize-none transition-all outline-none text-sm ${
                isFocused
                  ? "border-red-500 ring-2 ring-red-500/20 bg-white shadow-md"
                  : "border-gray-300 hover:border-gray-400 bg-gray-50"
              }`}
              maxLength={500}
            />
          </div>

          {/* 전송 버튼 */}
          <button
            type="submit"
            disabled={content.trim().length === 0}
            className={`px-5 py-3 rounded-full font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
              content.trim().length > 0
                ? "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg transform hover:scale-105"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span className="text-base">💬</span>
            작성
          </button>
        </div>
      </form>

      {/* 키보드 단축키 안내 (포커스시에만) */}
      {isFocused && (
        <div className="mt-2 ml-11 text-xs text-gray-500 animate-in slide-in-from-top-1 duration-200">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">
            Cmd
          </kbd>{" "}
          +
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono ml-1">
            Enter
          </kbd>
          로 빠른 전송
        </div>
      )}
    </div>
  );
}
