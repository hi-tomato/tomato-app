"use client";
import { useState } from "react";

export default function CreateForm() {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Post 요청 보내기
    console.log("작성한 내용:", content);
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 text-tomato-dark"
    >
      <h2 className="text-2xl font-bold text-center">🍅 오늘의 토마토 일기</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="오늘 하루 어땠나요? 토마토처럼 상큼하게 적어보세요!"
        rows={6}
        className="w-full rounded-xl p-4 border border-tomato/30 focus:outline-none focus:ring-2 focus:ring-tomato-dark resize-none shadow-sm"
        required
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-tomato to-tomato-dark text-white font-semibold py-2 px-4 rounded-xl hover:brightness-110 shadow-md transition"
      >
        🍅 등록하기
      </button>
    </form>
  );
}
