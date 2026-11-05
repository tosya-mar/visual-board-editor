import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@shared/ui/kit/table";
import { Skeleton } from "@shared/ui/kit/skeleton";

export const BoardsTableSkeleton = ({
  rows = 10,
  headers,
}: {
  rows?: number;
  headers: {
    id: string;
    label: React.ReactNode;
    className?: string;
    width?: string;
  }[];
}) => {
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow className="cursor-default hover:bg-transparent">
          {headers.map((header) => (
            <TableHead key={header.id} className={header.className}>
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }, (_, index) => (
          <TableRow
            key={index}
            className="hover:bg-transparent [&_[data-slot=skeleton]]:h-4 [&_[data-slot=table-cell]]:p-4"
          >
            {headers.map((header) => (
              <TableCell key={header.id} className={header.className}>
                <Skeleton className={header.width ?? "w-24"} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
