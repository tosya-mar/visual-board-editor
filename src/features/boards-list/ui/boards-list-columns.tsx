import type { ApiSchemas } from "@shared/api/schema";

export type BoardsListColumn = {
  id: string;
  header: React.ReactNode;
  cell: (board: ApiSchemas["Board"]) => React.ReactNode;
  className?: string;
};

const formatDate = (value: string) => new Date(value).toDateString();

export const boardsListColumns: BoardsListColumn[] = [
  {
    id: "name",
    header: "Name",
    cell: (board) => board.name,
  },
  {
    id: "createdAt",
    header: "Created At",
    cell: (board) => formatDate(board.createdAt),
  },
  {
    id: "updatedAt",
    header: "Updated At",
    cell: (board) => formatDate(board.updatedAt),
  },
];
