import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import { DocumentHead, Link, useLocation } from "@builder.io/qwik-city";
import { Post } from "@prisma/client";
import { trpc } from "~/client/trpc";

export default component$(() => {
    const store = useStore({
        content: null as Post | null,
    });

    const location = useLocation();

    useClientEffect$(async () => {
        const postContent = await trpc.posts.getPost.query({ id: parseInt(location.params.id) });
        store.content = postContent;
    });

    return (
        <div class="mx-auto max-w-7xl px-8 py-6">
            <Link href="/" class="font-medium text-gray-600">
                Back
            </Link>
            <div class="text-4xl font-bold mb-2">{store.content?.title}</div>
            <div>{store.content?.content}</div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Quick - Post",
};
