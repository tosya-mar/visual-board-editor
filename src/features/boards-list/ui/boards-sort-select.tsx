import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@shared/ui/kit/select";
import type { BoardsSortOption } from "../model/use-boards-filter";

export function BoardsSortSelect({
  value,
  onValueChange,
}: {
  value: BoardsSortOption;
  onValueChange: (value: BoardsSortOption) => void;
}) {
  return (
    <Select
      defaultValue={value}
      onValueChange={(nextValue) => {
        onValueChange(nextValue as BoardsSortOption);
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
          <SelectItem value="lastOpenedAt">Дате последнего открытия</SelectItem>
        </SelectContent>
      </SelectGroup>
    </Select>
  );
}
