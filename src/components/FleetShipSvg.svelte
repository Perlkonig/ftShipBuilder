<script lang="ts">
    import { afterUpdate, onDestroy, onMount } from "svelte";
    import { renderSvg, resizeSsdTitles } from "ftlibship";
    import type { FullThrustShip } from "ftlibship";

    export let ship: FullThrustShip;
    export let invertFooter: boolean;

    let container: HTMLDivElement;
    let resizeObserver: ResizeObserver | undefined;

    const paint = () => {
        const svg = renderSvg(ship, { invertFooter });
        if (!container || !svg) return;
        container.innerHTML = svg;
        const root = container.querySelector("svg");
        if (root instanceof SVGSVGElement) {
            const runResize = () => resizeSsdTitles(root);
            if (document.fonts?.ready) {
                document.fonts.ready.then(runResize);
            } else {
                runResize();
            }
        }
    };

    onMount(() => {
        paint();
        resizeObserver = new ResizeObserver(() => paint());
        resizeObserver.observe(container);
    });
    afterUpdate(paint);
    onDestroy(() => resizeObserver?.disconnect());
</script>

<div bind:this="{container}" class="fleet-ship-svg"></div>

<style>
    .fleet-ship-svg {
        width: 100%;
    }
</style>
