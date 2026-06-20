import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { authHandlers } from "./handlers/auth";

export const worker = setupWorker(...handlers, ...authHandlers);
