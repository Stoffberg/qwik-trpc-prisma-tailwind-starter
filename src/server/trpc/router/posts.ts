import { t } from "../trpc";
import { z } from "zod";

export const postsRouter = t.router({
    getPosts: t.procedure.input(z.object({ query: z.string().optional() })).query(async ({ ctx, input }) => {
        const posts = await ctx.prisma.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: input.query,
                        },
                    },
                    {
                        content: {
                            contains: input.query,
                        },
                    },
                ],
            },
        });

        return posts;
    }),
    getPost: t.procedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
        const post = await ctx.prisma.post.findUnique({
            where: {
                id: input.id,
            },
        });

        return post;
    }),
    createPost: t.procedure.input(z.object({ title: z.string(), content: z.string() })).mutation(async ({ ctx, input }) => {
        const post = await ctx.prisma.post.create({
            data: {
                title: input.title,
                content: input.content,
            },
        });

        return post;
    }),
});
