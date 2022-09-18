<script lang="ts">
    import { Canvg } from "canvg";
    import { afterUpdate, beforeUpdate } from 'svelte';
    import { ship } from "@/stores/writeShip";
    import { savedLayouts } from "@/stores/writeStoredLayouts";
    import { ssdComponents } from "@/stores/writeSsd";
    import { layouts } from "@/lib/layouts";
    import type { ILayout } from "@/lib/layouts";
    import { getSystem } from "@/lib/systems";
    import { svgLib } from "@/lib/svgLib";
    import { genSvg } from "@/lib/hull";
    import type { ISystem } from "src/lib/systems/_base";
    import type { ISystemSVG } from "@/lib/svgLib";

    export let layoutID: string;

    const allLayouts: ILayout[] = [...layouts, ...$savedLayouts];
    const layout = allLayouts.find(x => x.id === layoutID);
    const svgCore = svgLib.find(x => x.id === "coreSys")!;
    const sysFtl: ISystem = $ship.systems.find(x => x.name === "ftl");
    let hasFtlAdv = false;
    let svgFtl: ISystemSVG;
    if ( (sysFtl !== undefined) && (sysFtl.hasOwnProperty("advanced")) && (sysFtl.advanced) ) {
        hasFtlAdv = true;
    }
    if (sysFtl !== undefined) {
        svgFtl = getSystem(sysFtl, $ship).glyph();
    }

    const sysDrive = $ship.systems.find(x => x.name === "drive")!;
    let hasAdvDrive = false;
    if ( (sysDrive.hasOwnProperty("advanced")) && (sysDrive.advanced) ) {
        hasAdvDrive = true;
    }
    const svgDrive = getSystem(sysDrive, $ship).glyph();

    let nameElement: SVGTextElement;
    let statsElement: SVGTextElement;
    let fullSsdSvg: SVGElement;
    let svgDataStr: string;
    let pngDataStr: string;
    let pngCanvas: HTMLCanvasElement;
    $: if (fullSsdSvg !== undefined) {
        svgDataStr = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(fullSsdSvg.outerHTML.replaceAll(`href=`, `xlink:href=`));

        genPgn();
    }

    const totalThrust = ($ship.systems.find(x => x.name === "drive")!).thrust;

    const genPgn = () => {
        const ctx = pngCanvas.getContext("2d");
        const v = Canvg.fromString(ctx, fullSsdSvg.outerHTML);
        v.render();
        pngDataStr = pngCanvas.toDataURL("image/png");
    };

    const genHull = () => {
        $ssdComponents.hull = genSvg($ship, layout.cellsize, {height: layout.blockHull.height, width: layout.blockHull.width});
        $ssdComponents = $ssdComponents;
    };

    beforeUpdate(() => {
        genHull();
    });

    let coreWidthOffset = 0;
    let coreHeightOffset = 0;
    let coreOffsetFactor = 0.15;
    afterUpdate(() => {
        if (nameElement !== undefined) {
            var bb = nameElement.getBBox();
            var widthTransform = layout.blockName.width * 0.9 / bb.width;
            var heightTransform = layout.blockName.height * 0.9 / bb.height;
            var value = widthTransform < heightTransform ? widthTransform : heightTransform;
            nameElement.setAttribute("transform", "matrix("+value+", 0, 0, "+value+", 0,0)");
            const currx = parseFloat(nameElement.getAttribute("x"));
            const curry = parseFloat(nameElement.getAttribute("y"));
            nameElement.setAttribute("x", (currx / value).toString());
            nameElement.setAttribute("y", (curry / value).toString());
        }
        if (statsElement !== undefined) {
            var bb = statsElement.getBBox();
            var widthTransform = layout.blockStats.width * 0.9 / bb.width;
            var heightTransform = layout.blockStats.height * 0.9 / bb.height;
            var value = widthTransform < heightTransform ? widthTransform : heightTransform;
            statsElement.setAttribute("transform", "matrix("+value+", 0, 0, "+value+", 0,0)");
            const currx = parseFloat(statsElement.getAttribute("x"));
            const curry = parseFloat(statsElement.getAttribute("y"));
            statsElement.setAttribute("x", (currx / value).toString());
            statsElement.setAttribute("y", (curry / value).toString());
        }
        coreHeightOffset = (layout.blockCore.height * coreOffsetFactor) / 2;
        coreWidthOffset = (layout.blockCore.width * coreOffsetFactor) / 2;
    });
</script>

{#if layout !== undefined}
<div class="ssd">
    <svg viewBox="-1 -1 {layout.width + 2} {layout.height + 2}" width="100%" height="100%" bind:this="{fullSsdSvg}">
        <defs>
            {@html $ssdComponents.systems}
            {@html $ssdComponents.hull}
            {@html svgCore.svg}
            {@html svgDrive.svg}
        {#if (svgFtl !== undefined) }
            {@html svgFtl.svg}
        {/if}
        </defs>
    <rect x="0" y="0" width="{layout.width}" height="{layout.height}" stroke="black" fill="white" />
    <text x="{layout.blockName.minx + (layout.blockName.width / 2)}" y="{layout.blockName.miny + (layout.blockName.height / 2)}" bind:this="{nameElement}" dominant-baseline="middle" text-anchor="middle">{$ship.class} "{$ship.name}"</text>
    <text x="{layout.blockStats.minx + (layout.blockStats.width / 2)}" y="{layout.blockStats.miny + (layout.blockStats.height / 2)}" bind:this="{statsElement}" dominant-baseline="middle" text-anchor="middle">Mass: {$ship.mass}, NPV: {$ship.points}, CPV: {$ship.cpv}</text>
    <use href="#_ssdSystems" x="{layout.blockSystems.minx}" y="{layout.blockSystems.miny}" width="{layout.blockSystems.width}" height="{layout.blockSystems.height}" />
    <use href="#_ssdHull" x="{layout.blockHull.minx}" y="{layout.blockHull.miny}" width="{layout.blockHull.width}" height="{layout.blockHull.height}" />
    <use href="#svg_coreSys" x="{layout.blockCore.minx + coreWidthOffset}" y="{layout.blockCore.miny + coreHeightOffset}" width="{layout.blockCore.width * (1 - coreOffsetFactor)}" height="{layout.blockCore.height * (1 - coreOffsetFactor)}" />
{#if hasFtlAdv}
    <use href="#svg_ftlAdv" x="{layout.blockFtl.minx}" y="{layout.blockFtl.miny}" width="{layout.blockFtl.width}" height="{layout.blockFtl.height}" />
{:else if sysFtl !== undefined}
    <use href="#svg_ftl" x="{layout.blockFtl.minx}" y="{layout.blockFtl.miny}" width="{layout.blockFtl.width}" height="{layout.blockFtl.height}" />
{/if}
{#if hasAdvDrive}
    <use href="#svg_driveAdv" x="{layout.blockDrive.minx}" y="{layout.blockDrive.miny}" width="{layout.blockDrive.width}" height="{layout.blockDrive.height}" />
{:else}
    <use href="#svg_drive" x="{layout.blockDrive.minx}" y="{layout.blockDrive.miny}" width="{layout.blockDrive.width}" height="{layout.blockDrive.height}" />
{/if}
</svg>
</div>

<div class="level">
    <div class="level-item">
        <a href="{svgDataStr}" download="SSD.svg">
            <button class="button">Download SVG</button>
        </a>
    </div>
    <div class="level-item">
        <a href="{pngDataStr}" download="SSD.png">
            <button class="button">Download PNG</button>
        </a>
    </div>
</div>

<div class="hidden">
    <canvas width="{layout.width + 2}" height="{layout.height + 2}" bind:this="{pngCanvas}"></canvas>
</div>
{/if}

<style>
    .ssd {
        width: 100%;
        height: 30rem;
        padding-bottom: 1em;
    }

    .hidden {
        display: none;
    }
</style>