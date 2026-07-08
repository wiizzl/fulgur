import { treaty, type Treaty } from "@elysia/eden";
import type { AnyElysia } from "elysia";

import { API_PREFIX } from "#/shared/constants";

/**
 * Creates an Eden treaty client to call your API with full type-safety.
 * @param config - Optional Eden treaty configuration.
 */
export const createClient = <T extends AnyElysia>(
  config?: Treaty.Config,
): Treaty.Create<T> => {
  const base =
    typeof window !== "undefined"
      ? `${window.location.origin}${API_PREFIX}`
      : API_PREFIX;

  return treaty<T>(base, config);
};
