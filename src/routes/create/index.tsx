import { component$, useStore } from "@builder.io/qwik";
import { DocumentHead, Link } from "@builder.io/qwik-city";
import { trpc } from "~/client/trpc";

export default component$(() => {
    const store = useStore({
        title: "",
        content: "",
    });

    return (
        <div class="mx-auto max-w-7xl px-8 py-6">
            <Link href="/" class="font-medium text-gray-600">
                Back
            </Link>
            <div class="font-bold text-4xl">Create</div>
            <div class="text-sm text-gray-500">Create a new post</div>
            <div class="text-xl font-bold mt-4">Title</div>
            <input class="border rounded-lg p-2 w-full" value={store.title} onInput$={(e) => (store.title = (e.target as HTMLInputElement).value)} />
            <div class="text-xl font-bold mt-4">Content</div>
            <div className="flex flex-col border rounded-lg">
                <textarea
                    className="resize-y focus:outline-none rounded-t-lg p-2 min-h-[100px]"
                    aria-multiline="true"
                    maxLength={256}
                    value={store.content}
                    onInput$={(e) => (store.content = (e.target as HTMLTextAreaElement).value)}
                />
                <div className="border-t p-2 flex flex-row justify-end" aria-atomic="true" aria-live="polite" aria-label={`${store.content.length} of ${256} characters used`}>
                    <span className="text-sm" aria-hidden="true">
                        {store.content.length} / {256}
                    </span>
                </div>
            </div>
            <button
                class="bg-green-500 hover:bg-green-700 duration-150 rounded-md px-2 py-1 font-semibold text-white mt-4"
                onClick$={async () => {
                    await trpc.posts.createPost.mutate({ title: store.title, content: store.content });
                    window.location.href = "/"; // have no idea how to do this in qwik
                }}
            >
                Create
            </button>
        </div>
    );
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
};
