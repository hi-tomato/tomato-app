"use client";
import Link from "next/link";
import { useAtom } from "jotai";
import { isLoggedInAtom, userAtom } from "@/atoms/auth";
import { useLogout } from "@/hooks/useAuth";

export default function Header() {
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [user] = useAtom(userAtom);
  const logout = useLogout();
  const handleLogout = async () => {
    logout();
  };

  return (
    <header
      className="sticky top-0 z-50 shadow-lg backdrop-blur-sm"
      style={{
        background: "linear-gradient(to right, #e35d5b, #e53935)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 섹션 */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                <span className="text-2xl group-hover:animate-bounce">🍅</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-sm group-hover:text-yellow-100 transition-colors">
                멋쟁이 토마토
              </h1>
              <p className="text-orange-100 text-xs font-medium">
                토마토들의 소통공간
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            {isLoggedIn ? (
              <>
                {/* 사용자 정보 */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                      <span className="text-red-600 font-bold text-sm">
                        {user?.name?.[0] || user?.email?.[0] || "🍅"}
                      </span>
                    </div>
                    <span className="text-white font-semibold text-sm drop-shadow">
                      {user?.name || user?.email?.split("@")[0]}
                    </span>
                  </div>

                  {/* 글쓰기 버튼 */}
                  <Link
                    href="/write"
                    className="bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-md flex items-center gap-2 backdrop-blur-sm border border-white/20"
                  >
                    <span className="sm:inline">피드 작성하기</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="bg-white text-red-600 hover:text-red-700 hover:bg-gray-50 font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-md flex items-center gap-2"
                  >
                    <span className="sm:inline">로그아웃</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/signin"
                  className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 shadow-sm"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-red-600 hover:text-red-700 font-bold px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  회원가입
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
