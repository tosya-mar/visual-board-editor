import { rqClient } from "@shared/api/instance";

import { queryClient } from "@shared/api/query-client";

export const useDeleteBoard = () => {
  const deleteBoard = rqClient.useMutation("delete", "/boards/{boardId}", {
    onSuccess: () => {
      queryClient.invalidateQueries(rqClient.queryOptions("get", "/boards"));
    },
  });

  return {
    deleteBoard: (boardId: string) =>
      deleteBoard.mutateAsync({
        params: { path: { boardId } },
      }),
    getIsDeleting: (boardId: string) =>
      deleteBoard.isPending &&
      deleteBoard.variables?.params?.path?.boardId === boardId,
  };
};
