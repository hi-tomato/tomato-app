"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { signUp } from "@/lib/auth";

type SignupData = {
  email: string;
  password: string;
};

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signupMutation = useMutation<User, Error, SignupData>({
    mutationFn: ({ email, password }: SignupData) => signUp(email, password), // Using parameters
    onSuccess: () => {
      router.push("/");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      console.log("회원가입을 성공하였습니다");
    },
    onError: (error) => {
      console.error("에러가 발생하였습니다.", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    signupMutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl border border-red-100">
        {/* Header -> 멋쟁이 토마토 */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4 animate-bounce">🍅</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            멋쟁이 토마토
          </h1>
          <p className="text-gray-500">
            동료 토마토들의 일상들을 확인하려면 가입하세요.
          </p>
        </div>

        {/* 폼 -> 이메일, 비밀번호 X 4 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
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
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mt-6"
          >
            가입하기
          </button>
        </form>

        {/* 푸터 -> TEXT */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            이미 계정이 있으신가요?{" "}
            <span
              className="text-red-500 hover:text-red-600 cursor-pointer font-medium"
              onClick={() => router.push("/")}
            >
              로그인
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
