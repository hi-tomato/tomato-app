"use client";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isLoadingAtom, isLoggedInAtom } from "@/atoms/auth";
import { getAccessToken } from "@/lib/authToken";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/signin", "signup"];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    const token = getAccessToken();

    if (!isPublicRoute && !token) {
      router.push("/signin");
      return;
    }
    if (!isLoggedIn && !isLoading && !isPublicRoute && token) {
      // 토큰은 있지만 유저 정보가 없는 경우 로딩 대기
      return;
    }
    if (!isLoggedIn && !isLoading && !isPublicRoute) {
      router.push("/signin");
    }
  }, [isLoggedIn, router, isLoading, isPublicRoute]);

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

  if (!isPublicRoute && !isLoggedIn && !isLoading) {
    return null;
  }

  return <>{children}</>;
}
