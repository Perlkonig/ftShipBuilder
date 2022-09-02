<script lang="ts">
    import { ship } from "../stores/writeShip";
    import { obj2name } from "./sysNames";
    import { getSVG } from "./svgLib";
    import type { ISystemSVG } from "./svgLib";
    import Advanced from './SysDisplay/Advanced.svelte';
    import Aa from './SysDisplay/AA.svelte';
    import Capacity from './SysDisplay/Capacity.svelte';
    import MassPts from './SysDisplay/MassPts.svelte';

    interface ISystem {
        name: string;
        [k: string]: unknown;
    };

    export let prop: string;
    export let idx: number;
    let sys: ISystem;
    $: sys = $ship[prop][idx];

    const delSystem = () => {
        ($ship[prop] as unknown[]).splice(idx, 1);
        $ship = $ship;
    };

    let svg: ISystemSVG;
    $: svg = getSVG(sys);
</script>

<article class="media">
    {#if svg !== undefined}
    <figure class="media-left" style="width: {svg.width}rem; height: {svg.height}rem;">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" height="100%" width="100%">
            <defs>
                {@html svg.svg}
            </defs>
            <use href="#svg_{svg.id}" x="0" y="0" height="100%" width="100%"></use>
        </svg>
    </figure>
    {/if}
    <div class="media-content">
        <div class="content">
            {obj2name(sys)}
        </div>
    {#if ( (sys.name === "adfc") || (sys.name === "fireControl") )}
        <Advanced
            prop={prop}
            idx={idx}
        />
    {:else if sys.name === "screen"}
        <Aa
            prop={prop}
            idx={idx}
        />
    {:else if sys.name === "mineLayer"}
        <Capacity
            prop={prop}
            idx={idx}
            min={2}
            max={9}
        />
    {/if}
    <MassPts
        prop={prop}
        idx={idx}
    />
    </div>
    <div class="media-right"><button class="delete" on:click="{delSystem}"></button></div>
</article>
