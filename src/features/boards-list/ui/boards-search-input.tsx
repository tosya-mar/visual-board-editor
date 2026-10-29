import { Input } from "@shared/ui/kit/input";

export function BoardsSearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Input
      id="input-field-search"
      value={value}
      onChange={(e) => {
        onChange(e.target.value ?? "");
      }}
      placeholder="Поиск по названию"
      className="w-64"
    />
  );
}
