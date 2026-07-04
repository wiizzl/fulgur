import { treaty, type Treaty } from "@elysia/eden";
import type { AnyElysia } from "elysia";

import { API_PREFIX } from "./shared/constants";

export const createClient = <T extends AnyElysia>(config?: Treaty.Config) => {
  const base =
    typeof window !== "undefined"
      ? `${window.location.origin}${API_PREFIX}`
      : API_PREFIX;

  return treaty<T>(base, config);
};
