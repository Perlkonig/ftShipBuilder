<script lang="ts">
    import { ship } from "../stores/writeShip";
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
    import { getSystem } from "./systems";
    import type { System } from "./systems";
import Range from "./SysDisplay/Range.svelte";
import Class from "./SysDisplay/Class.svelte";

    interface ISystem {
        name: string;
        [k: string]: unknown;
    };

    export let prop: string;
    export let idx: number;
    let sys: System;
    $: sys = getSystem($ship[prop][idx], $ship);

    const delSystem = () => {
        ($ship[prop] as unknown[]).splice(idx, 1);
        $ship = $ship;
    };
</script>

<article class="media">
    {#if sys.glyph() !== undefined}
    <figure class="media-left" style="width: {sys.glyph().width}rem; height: {sys.glyph().height}rem;">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" height="100%" width="100%">
            <defs>
                {@html sys.glyph().svg}
            </defs>
            <use href="#svg_{sys.glyph().id}" x="0" y="0" height="100%" width="100%"></use>
        </svg>
    </figure>
    {/if}
    <div class="media-content">
        <div class="content">
            {sys.fullName()}
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
    {:else if sys.name === "ads"}
        <Arcs
            prop={prop}
            idx={idx}
            minArcs={3}
            maxArcs={6}
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
    {:else if sys.name.startsWith("spinal")}
        <Range
            prop={prop}
            idx={idx}
            choices={[["short", "Short range (24 mu)"], ["medium", "Medium range (32 mu)"], ["long", "Long range (48 mu)"]]}
        />
    {:else if ["beam"].includes(sys.name)}
        <Class
            prop={prop}
            idx={idx}
            min={1}
            max={4}
        />
        <Arcs
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
