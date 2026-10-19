import { rqClient } from "@shared/api/instance";

import { queryClient } from "@shared/api/query-client";
import { ROUTES } from "@shared/model/routes";
import { href, useNavigate } from "react-router-dom";

export const useCreateBoard = () => {
  const navigate = useNavigate();

  const navigateToBoard = (boardId: string) =>
    navigate(href(ROUTES.BOARD, { boardId }));

  const createBoard = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards"),
      );
    },
    onSuccess: (data) => {
      navigateToBoard(data.id);
    },
  });

  return {
    createBoard: () => createBoard.mutate({}),
    navigateToBoard,
    isPending: createBoard.isPending,
  };
};
