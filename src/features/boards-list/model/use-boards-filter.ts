import { useState } from "react";

export type BoardsSortOption =
  | "createdAt"
  | "updatedAt"
  | "lastOpenedAt"
  | "name";

export type BoardsViewMode = "list" | "cards";

export const useBoardsFilter = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<BoardsSortOption>("createdAt");
  const [isFavorite, setIsFavorite] = useState(false);
  const [viewMode, setViewMode] = useState<BoardsViewMode>("list");

  return {
    search,
    setSearch,
    sort,
    setSort,
    isFavorite,
    setIsFavorite,
    viewMode,
    setViewMode,
  };
};
