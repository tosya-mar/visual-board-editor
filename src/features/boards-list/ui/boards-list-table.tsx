import type { RefCallback } from "react";
import type { ApiSchemas } from "@shared/api/schema";
import { BoardListLayoutTable } from "./boar-list-layout";
import { BoardsListRow } from "./boards-list-row";
import {
  boardsListActionsColumnClassName,
  boardsListActionsColumnWidth,
  boardsListColumns,
  type BoardsListColumn,
} from "./boards-list-columns";

type Board = ApiSchemas["Board"];

export function BoardsListTable({
  boards,
  columns = boardsListColumns,
  isPending,
  hasNextPage,
  cursorRef,
  isFetchingNextPage,
  onOpen,
  renderActions,
}: {
  boards: Board[];
  columns?: BoardsListColumn[];
  isPending: boolean;
  hasNextPage: boolean;
  cursorRef: RefCallback<HTMLDivElement>;
  isFetchingNextPage: boolean;
  onOpen: (boardId: string) => void;
  renderActions: (board: Board) => React.ReactNode;
}) {
  const headers = [
    ...columns.map((column) => ({
      id: column.id,
      label: column.header,
      className: column.className,
      width: column.width,
    })),
    {
      id: "actions",
      label: null,
      className: boardsListActionsColumnClassName,
      width: boardsListActionsColumnWidth,
    },
  ];

  return (
    <BoardListLayoutTable
      headers={headers}
      isPending={isPending}
      isEmpty={boards.length === 0}
      hasNextPage={hasNextPage}
      cursorRef={cursorRef}
      isFetchingNextPage={isFetchingNextPage}
    >
      {boards.map((board) => (
        <BoardsListRow
          key={board.id}
          board={board}
          columns={columns}
          onOpen={() => onOpen(board.id)}
          actions={renderActions(board)}
        />
      ))}
    </BoardListLayoutTable>
  );
}
