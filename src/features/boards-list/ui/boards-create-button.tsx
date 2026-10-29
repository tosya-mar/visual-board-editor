import { Button } from "@shared/ui/kit/button";
import { PlusIcon } from "lucide-react";

export function BoardsCreateButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      className="shrink-0 self-end p-4 cursor-pointer"
      disabled={disabled}
    >
      Создать доску <PlusIcon className="w-4 h-4" fill="var(--accent)" />
    </Button>
  );
}
