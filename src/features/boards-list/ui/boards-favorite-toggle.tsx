import { cn } from "@shared/lib/css";
import { Button } from "@shared/ui/kit/button";
import { StarIcon } from "lucide-react";

export function BoardsFavoriteToggle({
  isFavorite,
  onToggle,
}: {
  isFavorite: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      variant="ghost"
      className="border-none bg-transparent hover:bg-transparent cursor-pointer"
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
    >
      <StarIcon
        className={cn(
          "w-4 h-4",
          isFavorite ? "fill-yellow-500" : "fill-none",
        )}
      />
    </Button>
  );
}
