<script lang="ts">
    import Builder from "./components/Builder.svelte";
    import Status from "./components/Status.svelte";
    import SSD from "./components/SSD.svelte";
    import LoadShip from "./components/LoadShip.svelte";
    import Nav from "./components/Nav.svelte";
    import { SvelteToast } from "@zerodevx/svelte-toast";
    import { onMount } from "svelte";
    import Fleet from "./components/Fleet.svelte";

    const optionsToast = {};

    let shipParam: string;
    onMount(() => {
        const idx = window.location.href.indexOf("?");
        if (idx !== -1) {
            const params = new URLSearchParams(
                window.location.href.substring(idx)
            );
            for (const [k, v] of params.entries()) {
                if (k.toLocaleLowerCase() === "ship") {
                    shipParam = v;
                }
            }
        }
    });
</script>

<main class="container p-6">
    <Nav />
    <h1 class="title">Full Thrust Ship Builder</h1>
    <!-- svelte-ignore missing-declaration -->
    <p class="version subtitle">Version: {__APP_VERSION__}</p>
    <div class="sticky">
        <Status />
    </div>
    {#if shipParam === undefined}
        <LoadShip />
    {:else}
        <LoadShip incomingParam="{shipParam}" />
    {/if}
    <div class="container">
        <Builder />
    </div>
    <hr />
    <div class="container">
        <SSD />
    </div>
    <hr />
    <div>
        <Fleet />
    </div>
</main>

<footer class="footer">
    <div class="content has-text-centered">
        <p>
            <a href="https://github.com/Perlkonig/ftShipBuilder"
                >Fork me on GitHub!</a
            >
        </p>
        <p>
            I believe in the "value for value" model. If you find this tool
            valuable, consider a donation proportional to that value: <a
                href="https://paypal.me/abstractplay">paypal.me/abstractplay</a
            >. Thank you!
        </p>
    </div>
</footer>

<SvelteToast options="{optionsToast}" />

<style>
    .sticky {
        position: sticky;
        top: 0;
        z-index: 100;
        width: 100%;
        background: white;
    }
</style>
