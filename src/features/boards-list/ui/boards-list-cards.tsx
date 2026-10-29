import type { RefCallback } from "react";
import type { ApiSchemas } from "@shared/api/schema";
import { BoardListLayoutCards } from "./boar-list-layout";
import { BoardsListCard } from "./boards-list-card";

type Board = ApiSchemas["Board"];

export function BoardsListCards({
  boards,
  isPending,
  hasNextPage,
  cursorRef,
  isFetchingNextPage,
  onOpen,
  renderActions,
}: {
  boards: Board[];
  isPending: boolean;
  hasNextPage: boolean;
  cursorRef: RefCallback<HTMLDivElement>;
  isFetchingNextPage: boolean;
  onOpen: (boardId: string) => void;
  renderActions: (board: Board) => React.ReactNode;
}) {
  return (
    <BoardListLayoutCards
      isPending={isPending}
      isEmpty={boards.length === 0}
      hasNextPage={hasNextPage}
      cursorRef={cursorRef}
      isFetchingNextPage={isFetchingNextPage}
    >
      {boards.map((board) => (
        <BoardsListCard
          key={board.id}
          board={board}
          onOpen={() => onOpen(board.id)}
          actions={renderActions(board)}
        />
      ))}
    </BoardListLayoutCards>
  );
}
