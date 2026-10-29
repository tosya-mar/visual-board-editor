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
  headers: { id: string; label: React.ReactNode }[];
}) => {
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
          {headers.map((header) => (
            <TableHead key={header.id}>{header.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }, (_, index) => (
          <TableRow
            key={index}
            className="hover:bg-transparent [&_[data-slot=skeleton]]:h-4 [&_[data-slot=table-cell]]:p-6"
          >
            {headers.map((header, columnIndex) => (
              <TableCell key={header.id}>
                <Skeleton
                  className={
                    columnIndex === 0
                      ? nameWidths[index % nameWidths.length]
                      : "w-28"
                  }
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
