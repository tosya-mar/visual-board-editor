import { TableCell, TableRow } from "@shared/ui/kit/table";
import type { ApiSchemas } from "@shared/api/schema";
import type { BoardsListColumn } from "./boards-list-columns";

export function BoardsListRow({
  board,
  columns,
  onOpen,
  actions,
}: {
  board: ApiSchemas["Board"];
  columns: BoardsListColumn[];
  onOpen: () => void;
  actions?: React.ReactNode;
}) {
  return (
    <TableRow
      className="cursor-pointer text-left [&_[data-slot=table-cell]]:p-4"
      onClick={onOpen}
    >
      {columns.map((column) => (
        <TableCell key={column.id} className={column.className}>
          {column.cell(board)}
        </TableCell>
      ))}

      {actions != null && (
        <TableCell className="flex items-right justify-end gap-10">
          {actions}
        </TableCell>
      )}
    </TableRow>
  );
}
