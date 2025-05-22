"use client";
import { usePost, useToggleLike } from "@/hooks/useMockPost";
import React, { useState } from "react";
import { BiHeart, BiMessage } from "react-icons/bi";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";

export default function PostList() {
  const { data: posts = [], isLoading } = usePost();
  const toggleLike = useToggleLike();
  const [openComment, setOpenComment] = useState<number | null>(null);
  const [user] = useAtom(userAtom);

  const handleCommentSubmit = (postId: number, content: string) => {
    console.log("댓글 작성:", { postId, content });
  };

  const handleCommentDelete = (postId: number) => {
    console.log("삭제될 댓글:", postId);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 shadow-sm animate-pulse"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* 헤더 */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{post.writer[0]}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{post.writer}</h3>
              <p className="text-sm text-gray-500">방금 전</p>
            </div>
          </div>

          {/* 내용 */}
          <p className="text-gray-800 leading-relaxed mb-4">{post.content}</p>

          {/* 액션 */}
          <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
            <button
              onClick={() => toggleLike(post.id)}
              className="flex items-center gap-2 text-gray-600 hover:text-red-500"
            >
              <BiHeart />
              <span className="text-sm">{post.likeCount}</span>
            </button>
            <button
              onClick={() =>
                setOpenComment(openComment === post.id ? null : post.id)
              }
              className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
            >
              <BiMessage />
              <span className="text-sm">{post.comments.length}</span>
            </button>
          </div>

          {openComment === post.id && (
            <>
              <CommentList
                comments={post.comments}
                isVisible={true}
                onDelete={handleCommentDelete}
              />
              <CommentForm
                postId={post.id}
                currentUser={user?.displayName || user?.email?.split("@")[0]}
                onSubmit={handleCommentSubmit}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
