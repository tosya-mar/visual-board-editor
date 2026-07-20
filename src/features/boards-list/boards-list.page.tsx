// TODO: decompose this file

import { rqClient } from "@shared/api/instance";
import { cn } from "@shared/lib/css";
import { ROUTES } from "@shared/model/routes";
import { Button } from "@shared/ui/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/kit/dialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@shared/ui/kit/dropdown-menu";
import { Field } from "@shared/ui/kit/field";
import { Input } from "@shared/ui/kit/input";
import { Skeleton } from "@shared/ui/kit/skeleton";
import {
  Table,
  TableCell,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from "@shared/ui/kit/table";
import { useQueryClient } from "@tanstack/react-query";
import {
  EllipsisVerticalIcon,
  PlusIcon,
  StarIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BoardsListPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const boardsQuery = rqClient.useQuery("get", "/boards", {
    params: { query: {} },
  });

  const createBoard = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards"),
      );
    },
  });

  const renameBoard = rqClient.useMutation("put", "/boards/{boardId}/rename", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards"),
      );
    },
  });

  const favoriteBoard = rqClient.useMutation(
    "put",
    "/boards/{boardId}/favorite",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        );
      },
    },
  );

  const deleteBoard = rqClient.useMutation("delete", "/boards/{boardId}", {
    onSuccess: () => {
      queryClient.invalidateQueries(rqClient.queryOptions("get", "/boards"));
    },
  });

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 p-4">
      <Button
        onClick={() => {
          createBoard.mutate({});
        }}
        className="shrink-0 self-end p-4 cursor-pointer"
        disabled={createBoard.isPending}
      >
        Создать доску <PlusIcon className="w-4 h-4" fill="var(--accent)" />
      </Button>

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

function BoardActions({
  boardId,
  boardName,
  onRename,
  onDelete,
  isPending,
}: {
  boardId: string;
  boardName: string;
  onRename: (name: string) => Promise<unknown>;
  onDelete: () => Promise<unknown>;
  isPending: boolean;
}) {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" type="reset">
            <EllipsisVerticalIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem
            className="cursor-pointer focus:bg-muted focus:text-black"
            onSelect={() => setRenameOpen(true)}
          >
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer focus:bg-muted focus:text-black"
            onSelect={() => setDeleteOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const name = String(formData.get("name") ?? "").trim();

              if (!name) {
                return;
              }

              try {
                await onRename(name);
                setRenameOpen(false);
              } catch {}
            }}
          >
            <DialogHeader>
              <DialogTitle>Rename Board</DialogTitle>
              <DialogDescription className="mb-4">
                Enter the new name for the board.
              </DialogDescription>
            </DialogHeader>

            <Field>
              <Input
                id={`name-${boardId}`}
                name="name"
                defaultValue={boardName}
              />
            </Field>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Board</DialogTitle>
            <DialogDescription className="mt-4 mb-4">
              Are you sure you want to delete this board?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              onClick={async () => {
                try {
                  await onDelete();
                  setDeleteOpen(false);
                } catch {
                  // keep dialog open on error
                }
              }}
              disabled={isPending}
            >
              <TrashIcon className="w-4 h-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function BoardsTableSkeleton({ rows = 10 }: { rows?: number }) {
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
}

export const Component = BoardsListPage;
