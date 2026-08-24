import { rqClient } from "@shared/api/instance";
import { cn } from "@shared/lib/css";
import { ROUTES } from "@shared/model/routes";
import { Button } from "@shared/ui/kit/button";
import {
  Table,
  TableCell,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from "@shared/ui/kit/table";
import { PlusIcon, StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BoardsTableSkeleton } from "./boards-table-skeleton";
import { BoardActions } from "./board-actions";
import { useBoardsList } from "./use-boards-list";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@shared/ui/kit/select";

function BoardsListPage() {
  const navigate = useNavigate();

  const {
    boardsQuery,
    createBoard,
    renameBoard,
    favoriteBoard,
    deleteBoard,
    setSearchParams,
  } = useBoardsList();

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-2">
        <Select
          defaultValue="createdAt"
          onValueChange={(value) => {
            setSearchParams({ sort: value });
          }}
        >
          <SelectGroup>
            <div className="flex items-center gap-2">
              <SelectLabel>Сортировать по:</SelectLabel>
              <SelectTrigger>
                <SelectValue placeholder="Дате создания" />
              </SelectTrigger>
            </div>

            <SelectContent>
              <SelectItem value="createdAt">Дате создания</SelectItem>
              <SelectItem value="name">Названию</SelectItem>
              <SelectItem value="updatedAt">Дате обновления</SelectItem>
              <SelectItem value="lastOpenedAt">
                Дате последнего открытия
              </SelectItem>
            </SelectContent>
          </SelectGroup>
        </Select>

        <Button
          onClick={() => {
            createBoard.mutate({});
          }}
          className="shrink-0 self-end p-4 cursor-pointer"
          disabled={createBoard.isPending}
        >
          Создать доску <PlusIcon className="w-4 h-4" fill="var(--accent)" />
        </Button>
      </div>

      <div className="min-h-0 flex-1">
        {boardsQuery.isPending ? (
          <BoardsTableSkeleton />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="cursor-default">
                <TableHead id="name">Name</TableHead>
                <TableHead id="createdAt">Created At</TableHead>
                <TableHead id="updatedAt">Updated At</TableHead>
                <TableHead id="isFavorite"></TableHead>
                <TableHead id="actions"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {boardsQuery.data?.boards.map((board) => (
                <TableRow
                  key={board.id}
                  className="cursor-pointer text-left [&_[data-slot=table-cell]]:p-4"
                  onClick={() => {
                    navigate(ROUTES.BOARD.replace(":boardId", board.id));
                  }}
                >
                  <TableCell>{board.name}</TableCell>
                  <TableCell>
                    {new Date(board.createdAt).toDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(board.updatedAt).toDateString()}
                  </TableCell>
                  <TableCell></TableCell>

                  <TableCell
                    className="flex items-right justify-end gap-10"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Button
                      variant="ghost"
                      className="border-none bg-transparent hover:bg-transparent cursor-pointer"
                      onClick={() =>
                        favoriteBoard.mutate({
                          params: { path: { boardId: board.id } },
                          body: { isFavorite: !board.isFavorite },
                        })
                      }
                    >
                      <StarIcon
                        className={cn(
                          "w-4 h-4",
                          board.isFavorite ? "fill-yellow-500" : "fill-none",
                        )}
                      />
                    </Button>

                    <BoardActions
                      boardId={board.id}
                      boardName={board.name}
                      onRename={(name) =>
                        renameBoard.mutateAsync({
                          params: { path: { boardId: board.id } },
                          body: { name },
                        })
                      }
                      onDelete={() =>
                        deleteBoard.mutateAsync({
                          params: { path: { boardId: board.id } },
                        })
                      }
                      isPending={renameBoard.isPending || deleteBoard.isPending}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export const Component = BoardsListPage;
