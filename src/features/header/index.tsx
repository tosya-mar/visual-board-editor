import { useSession } from "@/shared/model/session";
import { Button } from "@/shared/ui/kit/button";
import { useNavigate } from "react-router-dom";

export function AppHeader() {
  const { session, logout } = useSession();
  const navigate = useNavigate();

  if (!session) {
    return null;
  }

  return (
    <header className="shrink-0 bg-background border-b border-border/40 shadow-sm py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          className="text-xl font-semibold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Board Editor
        </button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{session.email}</span>
          <Button variant="outline" size="sm" onClick={() => logout()}>
            Выйти
          </Button>
        </div>
      </div>
    </header>
  );
}
