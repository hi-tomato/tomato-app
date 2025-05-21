"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { signLogin } from "@/lib/auth";

type SignInPageData = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const signUpMutation = useMutation<User, Error, SignInPageData>({
    mutationFn: ({ email, password }) => signLogin(email, password),
    onSuccess: () => {
      router.push("/");
      setEmail("");
      setPassword("");
      console.log("유저가 로그인을 성공하였습니다!");
    },
    onError: (error) => {
      console.error(`유저가 로그인을 하던 중, 오류가 발생하였습니다. ${error}`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim().length === 0 && password.trim().length === 0) {
      return null;
    }

    signUpMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl border border-red-100">
        {/* 헤더: 애니메이션 부분 */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4 animate-bounce">🍅</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            멋쟁이 토마토
          </h1>
          <p className="text-gray-500">멋쟁이 토마토들의 소통 공간이에요!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              이메일
            </label>
            <input
              type="text"
              id="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요."
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            로그인하기
          </button>
        </form>

        {/* Footer -> 리다이렉션 부분 */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            계정이 없으신가요?{" "}
            <span
              className="text-red-500 hover:text-red-600 cursor-pointer font-bold"
              onClick={() => router.push("/signup")}
            >
              회원가입
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
