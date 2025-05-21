"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Provider } from "jotai";
import { userAtom } from "@/atoms/auth";
import { auth } from "@/lib/firebase";

const queryClient = new QueryClient();

function AuthStateProvider({ children }: { children: React.ReactNode }) {
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const result = {
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName || undefined,
        };
        setUser(result);
        console.log("현재 로그인한 상태:", result);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, [setUser]);

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
