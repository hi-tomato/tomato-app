import AuthGuard from "@/components/auth/AuthGuard";
import Header from "@/components/ui/Header";
import Navigation from "@/components/ui/Navigation";
import React from "react";

export default function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div>
        <Header />
        <main>{children}</main>

        <Navigation />
        {modal}
      </div>
    </AuthGuard>
  );
}
