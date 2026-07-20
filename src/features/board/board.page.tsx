import { rqClient } from "@shared/api/instance";
import { useParams } from "react-router-dom";

function BoardPage() {
  const { boardId } = useParams();

  const { data } = rqClient.useQuery("get", `/boards/{boardId}`, {
    params: { path: { boardId: boardId as string } },
    enabled: !!boardId,
  });

  return <div>{data?.name}</div>;
}

export const Component = BoardPage;
