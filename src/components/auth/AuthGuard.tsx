"use client";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { isLoadingAtom, isLoggedInAtom } from "../../../atoms/auth";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/login");
    }
  }, [isLoggedIn, router, isLoading]);

  // 아직 로딩 중이면 로딩 표시
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-spin">🍅</div>
          <p className="text-gray-600">로그인 상태 확인 중...</p>
        </div>
      </div>
    );
  }

  // 로그인이 안되어 있으면 아무것도 렌더링 안함 (리다이렉트 대기)
  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
