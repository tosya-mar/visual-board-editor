import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/kit/table";
import { BoardsTableSkeleton } from "./boards-table-skeleton";
import { BoardsCardsSkeleton } from "./boards-cards-skeleton";

export function BoardListLayout({
  header,
  content,
  filters,
}: {
  header: React.ReactNode;
  content: React.ReactNode;
  filters: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 p-4">
      {header}
      <div className="flex items-center justify-between gap-2">{filters}</div>
      <div className="min-h-0 flex-1 overflow-auto">{content}</div>
    </div>
  );
}

export function BoardListLayoutFilters({
  filters,
  sort,
  actions,
}: {
  filters?: React.ReactNode;
  sort?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div>{filters}</div>
      <div>{sort}</div>
      <div>{actions}</div>
    </div>
  );
}

export function BoardListLayoutHeader({
  title,
  actions,
}: {
  title: string;
  actions: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      {actions}
    </div>
  );
}

export function BoardListLayoutTable({
  headers,
  isPending,
  isEmpty,
  hasNextPage,
  cursorRef,
  isFetchingNextPage,
  children,
}: {
  headers: { id: string; label: React.ReactNode }[];
  isPending: boolean;
  isEmpty: boolean;
  hasNextPage: boolean;
  cursorRef: React.RefCallback<HTMLDivElement>;
  isFetchingNextPage: boolean;
  children: React.ReactNode;
}) {
  if (isPending) {
    return <BoardsTableSkeleton headers={headers} />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="cursor-default">
          {headers.map((header) => (
            <TableHead key={header.id} id={header.id}>
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {children}

        {isEmpty && (
          <TableCell colSpan={headers.length} className="text-gray-500">
            Нет досок
          </TableCell>
        )}
        {hasNextPage && (
          <TableCell colSpan={headers.length} ref={cursorRef}>
            {isFetchingNextPage && "Загрузка досок..."}
          </TableCell>
        )}
      </TableBody>
    </Table>
  );
}

export function BoardListLayoutCards({
  isPending,
  isEmpty,
  hasNextPage,
  cursorRef,
  isFetchingNextPage,
  children,
}: {
  isPending: boolean;
  isEmpty: boolean;
  hasNextPage: boolean;
  cursorRef: React.RefCallback<HTMLDivElement>;
  isFetchingNextPage: boolean;
  children: React.ReactNode;
}) {
  if (isPending) {
    return <BoardsCardsSkeleton />;
  }

  return (
    <div className="flex flex-col gap-4">
      {isEmpty ? (
        <p className="text-gray-500">Нет досок</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {children}
        </div>
      )}

      {hasNextPage && (
        <div ref={cursorRef} className="py-4 text-center text-sm text-muted-foreground">
          {isFetchingNextPage && "Загрузка досок..."}
        </div>
      )}
    </div>
  );
}
