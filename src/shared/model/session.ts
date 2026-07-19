import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { createGStore } from "create-gstore";
import { publicFetchClient } from "@shared/api/instance";

const TOKEN_KEY = "token";

type Session = {
  userId: string;
  email: string;
  exp: number;
  iat: number;
};

export const useSession = createGStore(() => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  let refreshTokenPromise: Promise<string | null> = null;

  const session = token ? jwtDecode<Session>(token) : null;

  const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const refreshToken = async () => {
    if (!token) return;

    const newSession = token ? jwtDecode<Session>(token) : null;

    if (newSession.exp < Date.now() / 1000) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = publicFetchClient
          .POST("/auth/refresh", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => res.data?.accessToken ?? null)
          .then((newToken) => {
            if (newToken) {
              login(newToken);
              return newToken;
            } else {
              logout();
              return null;
            }
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      const newToken = await refreshTokenPromise;

      if (newToken) {
        return newToken;
      } else {
        logout();
        return null;
      }
    }

    return token;
  };

  return { login, logout, session, refreshToken };
});
