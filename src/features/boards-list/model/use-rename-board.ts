import { rqClient } from "@shared/api/instance";

import { queryClient } from "@shared/api/query-client";

export const useRenameBoard = () => {
  const renameBoard = rqClient.useMutation("put", "/boards/{boardId}/rename", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards"),
      );
    },
  });

  return {
    renameBoard: (boardId: string, name: string) =>
      renameBoard.mutateAsync({
        params: { path: { boardId } },
        body: { name },
      }),
    isPending: renameBoard.isPending,
  };
};
