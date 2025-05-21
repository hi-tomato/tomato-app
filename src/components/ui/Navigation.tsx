"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const navItems = [
    {
      href: "/",
      label: "홈",
      icon: "🏠",
      activeIcon: "🏡",
    },
    {
      href: "/create",
      label: "글쓰기",
      icon: "✏️",
      activeIcon: "📝",
    },
    {
      href: "/profile",
      label: "프로필",
      icon: "👤",
      activeIcon: "👥",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 min-w-[60px] ${
                isActive
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-600 hover:text-orange-500 hover:bg-gray-50"
              }`}
            >
              <span className="text-xl mb-1">
                {isActive ? item.activeIcon : item.icon}
              </span>
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-orange-600" : "text-gray-600"
                }`}
              >
                {item.label}
              </span>

              {isActive && (
                <div className="w-1 h-1 bg-orange-500 rounded-full mt-1 animate-pulse"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
