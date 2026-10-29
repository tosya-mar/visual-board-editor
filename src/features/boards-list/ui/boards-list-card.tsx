import type { ApiSchemas } from "@shared/api/schema";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/kit/card";
import { BoardUiPreview } from "./board-ui-preview";

export function BoardsListCard({
  board,
  onOpen,
  actions,
}: {
  board: ApiSchemas["Board"];
  onOpen: () => void;
  actions?: React.ReactNode;
}) {
  return (
    <Card
      size="sm"
      className="relative aspect-[16/10] cursor-pointer gap-0 overflow-hidden py-0"
      onClick={onOpen}
    >
      <BoardUiPreview />

      <div className="absolute inset-0 bg-linear-to-t from-[#0C084C]/80 via-[#0C084C]/20 to-transparent" />

      <CardHeader className="absolute top-0 right-0 left-0 z-10 pointer-events-none opacity-0 transition-opacity group-hover/card:pointer-events-auto group-hover/card:opacity-100 focus-within:pointer-events-auto focus-within:opacity-100">
        {actions != null && (
          <CardAction className="flex items-center gap-1 rounded-lg bg-background/80 p-1 backdrop-blur-sm">
            {actions}
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="relative z-10 mt-auto  p-3 text-white pt-8 text-left">
        <CardTitle className="truncate text-white">{board.name}</CardTitle>
        <CardDescription className="text-white/80">
          Обновлена: {new Date(board.updatedAt).toDateString()}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
