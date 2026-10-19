import { Table, TableHeader } from "@shared/ui/kit/table";
import {
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@shared/ui/kit/table";
import { Skeleton } from "@shared/ui/kit/skeleton";

export const BoardsTableSkeleton = ({ rows = 10 }: { rows?: number }) => {
  const nameWidths = [
    "w-2/5",
    "w-1/3",
    "w-1/2",
    "w-3/5",
    "w-2/5",
    "w-1/4",
    "w-1/2",
    "w-1/3",
    "w-2/5",
    "w-1/2",
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow className="cursor-default hover:bg-transparent">
          <TableHead>Name</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead />
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }, (_, index) => (
          <TableRow
            key={index}
            className="hover:bg-transparent [&_[data-slot=skeleton]]:h-4 [&_[data-slot=table-cell]]:p-6"
          >
            <TableCell>
              <Skeleton className={nameWidths[index % nameWidths.length]} />
            </TableCell>
            <TableCell>
              <Skeleton className="w-28" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-28" />
            </TableCell>
            <TableCell>
              <Skeleton className="ml-auto w-4 rounded-sm" />
            </TableCell>
            <TableCell>
              <Skeleton className="ml-auto w-4 rounded-sm" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
