import type { AppRouter } from "#router";
import { createClient } from "fulgur/client";

export const api = createClient<AppRouter>();
