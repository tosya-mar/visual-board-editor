import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "./App";
import { ROUTES } from "@shared/model/routes";
import { Providers } from "./providers";
import { AppHeader } from "@features/header";
import { ProtectedRoute, protectedLoader } from "./protected-route";

export const router = createBrowserRouter([
  {
    element: (
      <Providers>
        <App />
      </Providers>
    ),
    children: [
      {
        path: ROUTES.LOGIN,
        lazy: () => import("@features/auth/login.page"),
      },
      {
        path: ROUTES.REGISTER,
        lazy: () => import("@features/auth/register.page"),
      },

      {
        loader: protectedLoader,
        element: (
          <>
            <AppHeader />
            <ProtectedRoute />
          </>
        ),
        children: [
          {
            path: ROUTES.HOME,
            loader: () => redirect(ROUTES.BOARDS),
          },
          {
            path: ROUTES.BOARD,
            lazy: () => import("@features/board/board.page"),
          },
          {
            path: ROUTES.BOARDS,
            lazy: () => import("@features/boards-list/boards-list.page"),
          },
        ],
      },
    ],
  },
]);
