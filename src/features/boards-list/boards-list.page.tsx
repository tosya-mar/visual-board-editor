import { useBoardsList } from "./model/use-boards-list";
import { useCreateBoard } from "./model/use-create-board";
import { useRenameBoard } from "./model/use-rename-board";
import { useFavoriteBoard } from "./model/use-update-favorite-board";
import { useDeleteBoard } from "./model/use-delete-board";
import { useBoardsFilter } from "./model/use-boards-filter";
import { useDebounceValue } from "@shared/lib/react";
import {
  BoardListLayout,
  BoardListLayoutFilters,
  BoardListLayoutHeader,
} from "./ui/boar-list-layout";
import { BoardsSortSelect } from "./ui/boards-sort-select";
import { BoardsSearchInput } from "./ui/boards-search-input";
import { BoardsCreateButton } from "./ui/boards-create-button";
import { BoardsListTable } from "./ui/boards-list-table";
import { BoardsListCards } from "./ui/boards-list-cards";
import { BoardsFavoriteToggle } from "./ui/boards-favorite-toggle";
import { BoardActions } from "./ui/board-actions";
import { BoardsViewToggle } from "./ui/boards-view-toggle";

function BoardsListPage() {
  const { search, setSearch, sort, setSort, viewMode, setViewMode } =
    useBoardsFilter();

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
  const { renameBoard, isPending: isRenamePending } = useRenameBoard();
  const { toggleFavoriteBoard, isOptimisticFavorite } = useFavoriteBoard();
  const { deleteBoard, getIsDeleting } = useDeleteBoard();

  const renderActions = (board: (typeof boards)[number]) => (
    <>
      <BoardsFavoriteToggle
        isFavorite={isOptimisticFavorite(board)}
        onToggle={() => toggleFavoriteBoard(board)}
      />
      <BoardActions
        boardId={board.id}
        boardName={board.name}
        onRename={(name) => renameBoard(board.id, name)}
        onDelete={() => deleteBoard(board.id)}
        isPending={isRenamePending || getIsDeleting(board.id)}
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
    </>
  );

  const listProps = {
    boards,
    isPending,
    hasNextPage,
    cursorRef,
    isFetchingNextPage,
    onOpen: navigateToBoard,
    renderActions,
  };

  return (
    <BoardListLayout
      header={
        <BoardListLayoutHeader
          title="Доски"
          actions={
            <BoardsCreateButton
              onClick={createBoard}
              disabled={isCreateBoardPending}
            />
          }
        />
      }
      filters={
        <BoardListLayoutFilters
          sort={<BoardsSortSelect value={sort} onValueChange={setSort} />}
          filters={<BoardsSearchInput value={search} onChange={setSearch} />}
          actions={
            <BoardsViewToggle value={viewMode} onValueChange={setViewMode} />
          }
        />
      }
      content={
        viewMode === "list" ? (
          <BoardsListTable {...listProps} />
        ) : (
          <BoardsListCards {...listProps} />
        )
      }
    />
  );
}

export const Component = BoardsListPage;
