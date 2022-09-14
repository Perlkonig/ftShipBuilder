<script lang="ts">
    import { ship } from "../stores/writeShip";
    import { getSystem } from "../lib/systems";
    import type { System } from "../lib/systems";
    import Aa from './SysDisplay/AA.svelte';
    import Advanced from './SysDisplay/Advanced.svelte';
    import Arcs from "./SysDisplay/Arcs.svelte";
    import ArcSingle from "./SysDisplay/ArcSingle.svelte";
    import Area from "./SysDisplay/Area.svelte";
    import Boolean from "./SysDisplay/Boolean.svelte";
    import Capacity from './SysDisplay/Capacity.svelte';
    import Class from "./SysDisplay/Class.svelte";
    import Fighters from "./SysDisplay/Fighters.svelte";
    import Graser from "./SysDisplay/Graser.svelte";
    import Hangar from "./SysDisplay/Hangar.svelte";
    import Id from "./SysDisplay/Id.svelte";
    import Magazine from "./SysDisplay/Magazine.svelte";
    import MassPts from './SysDisplay/MassPts.svelte';
    import Modifier from "./SysDisplay/Modifier.svelte";
    import Range from "./SysDisplay/Range.svelte";
    import Type from "./SysDisplay/Type.svelte";
    import Turret from "./SysDisplay/Turret.svelte";

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
    {#if ( (sys.name === "adfc") || (sys.name === "fireControl") || (sys.name === "sensors") )}
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
    {:else if ( (sys.name.startsWith("spinal")) && (sys.name !== "spinalNova") && (sys.name !== "spinalWave") ) }
        <Range
            prop={prop}
            idx={idx}
            choices={[["short", "Short range (24 mu)"], ["medium", "Medium range (32 mu)"], ["long", "Long range (48 mu)"]]}
        />
    {:else if ["beam", "emp", "plasmaCannon", "phaser", "transporter", "needle"].includes(sys.name)}
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
    {:else if sys.name === "graser"}
        <Class
            prop={prop}
            idx={idx}
            min={1}
            max={4}
        />
        <Graser
            prop={prop}
            idx={idx}
        />
        <Arcs
            prop={prop}
            idx={idx}
        />
    {:else if ["gatling", "particle", "meson", "pulser"].includes(sys.name)}
        <Arcs
            prop={prop}
            idx={idx}
        />
    {:else if sys.name === "submunition"}
        <Arcs
            prop={prop}
            idx={idx}
            minArcs={3}
            maxArcs={3}
        />
    {:else if sys.name === "fusion"}
        <Arcs
            prop={prop}
            idx={idx}
            minArcs={1}
            maxArcs={3}
        />
    {:else if sys.name === "torpedoPulse"}
        <Modifier
            prop={prop}
            idx={idx}
            choices={[["short", "Short Range"], ["long", "Long Range"]]}
        />
        <Arcs
            prop={prop}
            idx={idx}
            minArcs={1}
            maxArcs={3}
        />
    {:else if sys.name === "pbl"}
        <Class
            prop={prop}
            idx={idx}
            min={1}
            max={6}
        />
        <Arcs
            prop={prop}
            idx={idx}
            maxArcs={3}
        />
    {:else if sys.name === "kgun"}
        <Class
            prop={prop}
            idx={idx}
            min={1}
            max={6}
        />
        <Arcs
            prop={prop}
            idx={idx}
            minArcs={1}
        />
        <Modifier
            prop={prop}
            idx={idx}
            choices={[["short", "Short Range"], ["long", "Long Range"]]}
        />
    {:else if sys.name === "gravitic"}
        <Class
            prop={prop}
            idx={idx}
            min={1}
            max={3}
        />
        <Arcs
            prop={prop}
            idx={idx}
            minArcs={1}
        />
    {:else if sys.name === "hangar"}
        <Id
            prop={prop}
            idx={idx}
        />
        <Hangar
            prop={prop}
            idx={idx}
        />
    {:else if sys.name === "launchTube"}
        <Boolean
            prop={prop}
            idx={idx}
            flagName={"catapult"}
            flagText={"Equipped with launch catapult"}
        />
    {:else if sys.name === "fighters"}
        <Fighters
            prop={prop}
            idx={idx}
        />
    {:else if sys.name === "turret"}
        <Turret
            prop={prop}
            idx={idx}
        />
    {:else if sys.name === "decoy"}
        <Type
            prop={prop}
            idx={idx}
            choices={[["cruiser","Cruiser Decoy"],["capital","Capital Decoy"]]}
        />
    {/if}
    <MassPts
        prop={prop}
        idx={idx}
    />
    </div>
    <div class="media-right"><button class="delete" on:click="{delSystem}"></button></div>
</article>
