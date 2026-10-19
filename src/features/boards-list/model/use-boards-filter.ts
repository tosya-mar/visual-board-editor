import { useState } from "react";

type SortOption = "createdAt" | "updatedAt" | "lastOpenedAt" | "name";

export const useBoardsFilter = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [isFavorite, setIsFavorite] = useState(false);

  return {
    search,
    setSearch,
    sort: sort as SortOption,
    setSort,
    isFavorite,
    setIsFavorite,
  };
};
