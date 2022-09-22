import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import { DocumentHead, Link } from "@builder.io/qwik-city";
import { Post } from "@prisma/client";
import { trpc } from "~/client/trpc";

export default component$(() => {
    const store = useStore({
        query: "",
        results: [] as Post[],
    });

    useClientEffect$(async ({ track, cleanup }) => {
        const controller = new AbortController();
        cleanup(() => controller.abort());

        const query = track(store, "query");
        const posts = await trpc.posts.getPosts.query({ query }, { signal: controller.signal });
        store.results = posts;
    });

    return (
        <div class="max-w-7xl mx-auto px-8 py-4">
            <div class="flex w-full gap-4">
                <input
                    type="text"
                    class="border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 grow"
                    placeholder="Search for post..."
                    value={store.query}
                    onInput$={(e) => (store.query = (e.target as HTMLInputElement).value)}
                />
                <Link href="/create" class="bg-green-500 hover:bg-green-700 duration-150 rounded-md px-2 py-1 font-semibold text-white">
                    Create
                </Link>
            </div>
            <div class="flex flex-col mt-2">
                {store.results.map((post) => (
                    <a
                        href={`/post/${post.id}`}
                        class="border border-gray-300 rounded-md shadow-sm py-1 px-2 my-1 flex justify-between items-center hover:bg-gray-100 duration-100"
                    >
                        <span>{post.title}</span>
                        <span class="text-gray-500">{post.createdAt.toDateString()}</span>
                    </a>
                ))}
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Qwik Posts",
};
