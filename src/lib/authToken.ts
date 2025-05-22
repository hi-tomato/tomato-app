const ACCESS_TOKEN_KEY = "access_token";

export const setAccessToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return null;
};

export const removeAccessToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};
