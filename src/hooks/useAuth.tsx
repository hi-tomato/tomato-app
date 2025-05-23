import { signIn, signUp } from "@/api/auth";
import { getUser } from "@/api/user";
import { userAtom } from "@/atoms/auth";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/lib/authToken";
import { SigninRequest, SignUpRequest } from "@/types/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import React from "react";

export const useSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ name, email, password }: SignUpRequest) =>
      signUp(name, email, password),
    onSuccess(data) {
      console.log("회원 가입을 성공하였습니다.", data);
      router.push("/signin");
    },
    onError(error) {
      console.error(
        "회원가입을 시도중에 문제가 발생하였습니다: ",
        error.message
      );
    },
  });
};

export const useSignIn = () => {
  const setUser = useSetAtom(userAtom);
  const router = useRouter();

  return useMutation({
    mutationFn: ({ email, password }: SigninRequest) => signIn(email, password),

    onSuccess: async (data) => {
      setAccessToken(data.accessToken);

      try {
        const userData = await getUser();
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
        });
        router.push("/");
      } catch (error) {
        console.error("유저 정보 가져오기 실패", error);
        removeAccessToken();
      }
    },

    onError(error) {
      console.error("로그인을 시도중에 문제가 발생하였습니다: ", error.message);
    },
  });
};

export const useGetUser = () => {
  const setUser = useSetAtom(userAtom);

  const userQuery = {
    queryKey: ["user"] as const,
    queryFn: getUser,
    enabled: !!getAccessToken(),
    retry: false as const,
  };
  const query = useQuery(userQuery);

  React.useEffect(() => {
    if (query.data) {
      setUser({
        id: query.data.id,
        email: query.data.email,
        name: query.data.name,
      });
    } else if (query.isError) {
      setUser(null);
      removeAccessToken();
    }
  }, [query.data, query.isError, setUser]);

  return query;
};

export const useLogout = () => {
  const setUser = useSetAtom(userAtom);
  const router = useRouter();

  return () => {
    removeAccessToken();
    setUser(null);
    router.push("/signin");
  };
};
