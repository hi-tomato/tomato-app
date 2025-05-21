import AuthGuard from "@/components/auth/AuthGuard";
import Header from "@/components/ui/Header";
import Navigation from "@/components/ui/Navigation";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div>
        <Header />
        <main>{children}</main>
        <Navigation />
      </div>
    </AuthGuard>
  );
}
