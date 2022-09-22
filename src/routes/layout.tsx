import { component$, Slot } from "@builder.io/qwik";
import Header from "../components/header/header";

export default component$(() => {
    return (
        <>
            <main class="absolute inset-0 flex flex-col">
                <Header />
                <section class="grow">
                    <Slot />
                </section>
                <footer class="border-t flex justify-center py-2 gap-1.5">
                    Bootstrapped with
                    <a href="https://qwik.builder.io/" target="_blank" class="hover:text-blue-600">
                        Qwik
                    </a>
                    by
                    <a href="https://github.com/Jakkalsie" target="_blank" class="hover:text-blue-600">
                        Dirk S Beukes
                    </a>
                </footer>
            </main>
        </>
    );
});
