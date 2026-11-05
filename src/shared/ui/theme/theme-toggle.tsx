import { Moon, Sun } from "lucide-react";
import { Button } from "@shared/ui/kit/button";
import { useTheme } from "@shared/ui/theme/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Sun className=" h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
      ) : (
        <Moon className=" h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 " />
      )}
    </Button>
  );
}
