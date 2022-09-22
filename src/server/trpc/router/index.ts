// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { postsRouter } from "./posts";

export const appRouter = t.router({
    posts: postsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
