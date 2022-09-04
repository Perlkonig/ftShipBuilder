<script lang="ts">
    import { ship } from "../stores/writeShip";
    import { obj2name } from "./sysNames";
    import { getSVG } from "./svgLib";
    import type { ISystemSVG } from "./svgLib";
    import Advanced from './SysDisplay/Advanced.svelte';
    import Aa from './SysDisplay/AA.svelte';
    import Capacity from './SysDisplay/Capacity.svelte';
    import MassPts from './SysDisplay/MassPts.svelte';
    import Type from "./SysDisplay/Type.svelte";
    import Id from "./SysDisplay/Id.svelte";
    import Modifier from "./SysDisplay/Modifier.svelte";
    import ArcSingle from "./SysDisplay/ArcSingle.svelte";
    import Arcs from "./SysDisplay/Arcs.svelte";
    import Magazine from "./SysDisplay/Magazine.svelte";
    import Area from "./SysDisplay/Area.svelte";

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
    {:else if sys.name === "ecm"}
        <Area
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
        />
    {:else if sys.name === "bay"}
        <Type
            prop={prop}
            idx={idx}
            choices={[["passenger","Passenger Berth"],["troop","Troop Berth"],["cargo","Cargo Hold"]]}
        />
        <Capacity
            prop={prop}
            idx={idx}
            min={1}
        />
        <Id
            prop={prop}
            idx={idx}
        />
    {:else if sys.name === "magazine"}
        <Modifier
            prop={prop}
            idx={idx}
            choices={[["er", "Long Range"], ["twostage", "Multistage"]]}
        />
        <Capacity
            prop={prop}
            idx={idx}
            min={2}
        />
        <Id
            prop={prop}
            idx={idx}
        />
    {:else if ( (sys.name === "missile") || (sys.name === "salvo") ) }
        <Modifier
            prop={prop}
            idx={idx}
            choices={[["er", "Long Range"], ["twostage", "Multistage"]]}
        />
    {:else if sys.name === "mkp"}
        <ArcSingle
            prop={prop}
            idx={idx}
        />
    {:else if sys.name === "rocketPod"}
        <Arcs
            prop={prop}
            idx={idx}
            minArcs={3}
            maxArcs={3}
            arcBlacklist={["FS", "AS", "A"]}
        />
    {:else if sys.name === "salvoLauncher"}
        <Arcs
            prop={prop}
            idx={idx}
            minArcs={3}
            maxArcs={3}
            arcBlacklist={["FS", "AS", "A"]}
        />
        <Magazine
            prop={prop}
            idx={idx}
        />
    {/if}
    <MassPts
        prop={prop}
        idx={idx}
    />
    </div>
    <div class="media-right"><button class="delete" on:click="{delSystem}"></button></div>
</article>
