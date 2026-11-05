import type { ApiSchemas } from "@shared/api/schema";

export type BoardsListColumn = {
  id: string;
  header: React.ReactNode;
  cell: (board: ApiSchemas["Board"]) => React.ReactNode;
  className?: string;
  width?: string;
};

const formatDate = (value: string) => new Date(value).toDateString();

export const boardsListColumns: BoardsListColumn[] = [
  {
    id: "name",
    header: "Name",
    cell: (board) => board.name,
    className: "w-[40%]",
    width: "w-3/4",
  },
  {
    id: "createdAt",
    header: "Created At",
    cell: (board) => formatDate(board.createdAt),
    className: "w-[22%]",
    width: "w-28",
  },
  {
    id: "updatedAt",
    header: "Updated At",
    cell: (board) => formatDate(board.updatedAt),
    className: "w-[22%]",
    width: "w-28",
  },
];

export const boardsListActionsColumnClassName = "w-[16%]";
export const boardsListActionsColumnWidth = "ml-auto w-16";
