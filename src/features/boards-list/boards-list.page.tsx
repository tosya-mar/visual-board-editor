import { cn } from "@shared/lib/css";
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
import { BoardsTableSkeleton } from "./ui/boards-table-skeleton";
import { BoardActions } from "./ui/board-actions";
import { useBoardsList } from "./model/use-boards-list";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@shared/ui/kit/select";
import { useCreateBoard } from "./model/use-create-board";
import { useRenameBoard } from "./model/use-rename-board";
import { useFavoriteBoard } from "./model/use-update-favorite-board";
import { useDeleteBoard } from "./model/use-delete-board";
import { Input } from "@shared/ui/kit/input";
import { useBoardsFilter } from "./model/use-boards-filter";
import { useDebounceValue } from "@shared/lib/react";
import { BoardListLayout, BoardListLayoutHeader } from "./ui/boar-list-layout";

function BoardsListPage() {
  const { search, setSearch, sort, setSort } = useBoardsFilter();

  const { boards, isFetchingNextPage, isPending, hasNextPage, cursorRef } =
    useBoardsList({
      limit: 20,
      // isFavorite: useDebounceValue(isFavorite, 500),
      search: useDebounceValue(search, 500),
      sort,
    });

  const {
    createBoard,
    isPending: isCreateBoardPending,
    navigateToBoard,
  } = useCreateBoard();
  const { renameBoard } = useRenameBoard();
  const { toggleFavoriteBoard, isOptimisticFavorite } = useFavoriteBoard();
  const { deleteBoard, getIsDeleting } = useDeleteBoard();

  return (
    <BoardListLayout
      header={<BoardListLayoutHeader title="Доски" actions={<Button
        onClick={() => {
          createBoard();
        }}
        className="shrink-0 self-end p-4 cursor-pointer"
        disabled={isCreateBoardPending}
      >
        Создать доску <PlusIcon className="w-4 h-4" fill="var(--accent)" />
      </Button>} />}

      filters={<> 
      <Input
        id="input-field-search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value ?? "");
        }}
        placeholder="Поиск по названию"
        className="w-64"
      />

      <Select
        defaultValue={sort}
        onValueChange={(value) => {
          setSort(value);
        }}
      >
        <SelectGroup className="w-100">
          <div className="flex items-center gap-2">
            <SelectLabel>Сортировать по:</SelectLabel>
            <SelectTrigger className="cursor-pointer">
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
      </Select></>}
    >

      {isPending ? (
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
            {boards.map((board) => (
              <TableRow
                key={board.id}
                className="cursor-pointer text-left [&_[data-slot=table-cell]]:p-4"
                onClick={() => {
                  navigateToBoard(board.id);
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

                <TableCell className="flex items-right justify-end gap-10">
                  <Button
                    variant="ghost"
                    className="border-none bg-transparent hover:bg-transparent cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation();

                      toggleFavoriteBoard(board);
                    }}
                  >
                    <StarIcon
                      className={cn(
                        "w-4 h-4",
                        isOptimisticFavorite(board)
                          ? "fill-yellow-500"
                          : "fill-none",
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
                    onDelete={() => deleteBoard(board.id)}
                    isPending={
                      renameBoard.isPending || getIsDeleting(board.id)
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}

            {boards.length === 0 && !isPending && (
              <TableCell colSpan={5} className=" text-gray-500">
                Нет досок
              </TableCell>
            )}
            {hasNextPage && (
              <TableCell colSpan={5} ref={cursorRef}>
                {isFetchingNextPage && "Загрузка досок..."}
              </TableCell>
            )}
          </TableBody>
        </Table>
      )}
    </BoardListLayout>
  )

}

export const Component = BoardsListPage;
