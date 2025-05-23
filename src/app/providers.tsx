"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Provider } from "jotai";
import { getAccessToken } from "@/lib/authToken";
import { useGetUser } from "@/hooks/useAuth";

const queryClient = new QueryClient();

function AuthStateProvider({ children }: { children: React.ReactNode }) {
  const { refetch } = useGetUser();
  useEffect(() => {
    if (typeof window !== "undefined" && getAccessToken()) {
      refetch();
    }
  }, [refetch]);
  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <AuthStateProvider>{children}</AuthStateProvider>
      </QueryClientProvider>
    </Provider>
  );
}
