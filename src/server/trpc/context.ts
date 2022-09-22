import * as trpc from "@trpc/server";
import { prisma } from "../db/client";

export const createContext = async () => {
    return { prisma };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
