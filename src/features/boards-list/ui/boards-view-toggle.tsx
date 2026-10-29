import { LayoutGridIcon, LayoutListIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@shared/ui/kit/tabs";
import type { BoardsViewMode } from "../model/use-boards-filter";

export function BoardsViewToggle({
  value,
  onValueChange,
}: {
  value: BoardsViewMode;
  onValueChange: (value: BoardsViewMode) => void;
}) {
  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) => {
        onValueChange(nextValue as BoardsViewMode);
      }}
    >
      <TabsList>
        <TabsTrigger value="list" aria-label="Таблица">
          <LayoutListIcon />
        </TabsTrigger>
        <TabsTrigger value="cards" aria-label="Плитка">
          <LayoutGridIcon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
