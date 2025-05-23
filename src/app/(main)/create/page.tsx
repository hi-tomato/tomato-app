"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreatePost } from "@/hooks/usePost";

export default function CreatePage() {
  const [content, setContent] = useState("");
  const router = useRouter();
  const mutation = useCreatePost();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ content });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* 헤더 */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-red-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">🍅</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">새 글 작성</h1>
              <p className="text-gray-500 text-sm">토마토들과 소통해보세요!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                💭 내용
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="무슨 일이 일어나고 있나요? 자세히 알려주세요!"
                rows={10}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-none text-base leading-relaxed"
                required
              />
              <div className="mt-2 text-right text-sm text-gray-500">
                {content.length}/1000
              </div>
            </div>

            {/* 미리보기 영역 */}
            {content && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-600 mb-3">
                  📋 미리보기
                </h3>
                <div className="bg-white rounded-lg p-4 border">
                  {content && (
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {content}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 버튼 */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-4 px-6 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors text-lg"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={!content.trim()}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all text-lg shadow-lg"
              >
                🍅 작성 완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
