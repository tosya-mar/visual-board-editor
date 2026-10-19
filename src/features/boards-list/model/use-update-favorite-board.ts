import { rqClient } from "@shared/api/instance";

import { queryClient } from "@shared/api/query-client";
import { startTransition, useOptimistic } from "react";

export const useFavoriteBoard = () => {
  const [favorite, setFavorite] = useOptimistic<Record<string, boolean>>({});

  const favoriteBoard = rqClient.useMutation(
    "put",
    "/boards/{boardId}/favorite",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        );
      },
    },
  );

  const toggleFavoriteBoard = (board: { id: string; isFavorite: boolean }) => {
    startTransition(async () => {
      setFavorite((prev) => ({
        ...prev,
        [board.id]: !board.isFavorite,
      }));

      await favoriteBoard.mutateAsync({
        params: { path: { boardId: board.id } },
        body: { isFavorite: !board.isFavorite },
      });
    });
  };

  const isOptimisticFavorite = (board: { id: string; isFavorite: boolean }) =>
    favorite[board.id] ?? board.isFavorite;

  return {
    toggleFavoriteBoard,
    isOptimisticFavorite,
  };
};
