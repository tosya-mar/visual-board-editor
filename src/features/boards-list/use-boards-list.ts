import { rqClient } from "@shared/api/instance";

import { queryClient } from "@shared/api/query-client";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

type Sort = "createdAt" | "updatedAt" | "lastOpenedAt" | "name";

export const useBoardsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortId = useMemo(() => {
    return searchParams.get("sort") ?? "createdAt";
  }, [searchParams]) as Sort;

  const boardsQuery = rqClient.useQuery("get", "/boards", {
    params: { query: { sort: sortId } },
  });

  const createBoard = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards"),
      );
    },
  });

  const renameBoard = rqClient.useMutation("put", "/boards/{boardId}/rename", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards"),
      );
    },
  });

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

  const deleteBoard = rqClient.useMutation("delete", "/boards/{boardId}", {
    onSuccess: () => {
      queryClient.invalidateQueries(rqClient.queryOptions("get", "/boards"));
    },
  });

  return {
    createBoard,
    renameBoard,
    favoriteBoard,
    deleteBoard,
    boardsQuery,
    setSearchParams,
  };
};
