import { Elysia } from "fulgur/server";

export const fulgur = new Elysia().get("/hello", () => {
  return { message: "Hello World!" };
});
