import { Button } from "@shared/ui/kit/button";
import { EllipsisVerticalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
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

export const BoardActions = ({
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
}) => {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
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
};
