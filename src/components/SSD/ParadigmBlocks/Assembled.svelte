<script lang="ts">
    import { Canvg } from "canvg";
    import { afterUpdate, beforeUpdate, onMount, createEventDispatcher } from 'svelte';
    import { ship } from "@/stores/writeShip";
    import type { ILayout as ILayoutSystem } from "@/stores/writeShip";
    import { ssdComponents } from "@/stores/writeSsd";
    import { systems, svgLib, hull } from "ftlibship";
    import type { ISystemSVG } from "ftlibship";

    const dispatch = createEventDispatcher();

    let layout = ($ship.layout as ILayoutSystem).blocks;
    const svgCore = svgLib.find(x => x.id === "coreSys")!;
    const sysFtl: systems.ISystem = $ship.systems.find(x => x.name === "ftl");
    let hasFtlAdv = false;
    let svgFtl: ISystemSVG;
    if ( (sysFtl !== undefined) && (sysFtl.hasOwnProperty("advanced")) && (sysFtl.advanced) ) {
        hasFtlAdv = true;
    }
    if (sysFtl !== undefined) {
        svgFtl = systems.getSystem(sysFtl, $ship).glyph();
    }

    const sysDrive = $ship.systems.find(x => x.name === "drive")!;
    let hasAdvDrive = false;
    if ( (sysDrive.hasOwnProperty("advanced")) && (sysDrive.advanced) ) {
        hasAdvDrive = true;
    }
    const svgDrive = systems.getSystem(sysDrive, $ship).glyph();

    let nameElement: SVGTextElement;
    let statsElement: SVGTextElement;
    let fullSsdSvg: SVGElement;
    let svgDataStr: string;
    let pngDataStr: string;
    let pngCanvas: HTMLCanvasElement;
    let injectXlink: boolean;

    const genHull = () => {
        $ssdComponents.hull = hull.genSvg($ship, layout.blocks.cellsize, {height: layout.blocks.blockHull.height, width: layout.blocks.blockHull.width});
        $ssdComponents = $ssdComponents;
    };

    beforeUpdate(() => {
        genHull();
    });

    onMount(() => {
        if (nameElement !== undefined) {
            var bb = nameElement.getBBox();
            var widthTransform = layout.blocks.blockName.width * 0.9 / bb.width;
            var heightTransform = layout.blocks.blockName.height * 0.9 / bb.height;
            var value = widthTransform < heightTransform ? widthTransform : heightTransform;
            nameElement.setAttribute("transform", "matrix("+value+", 0, 0, "+value+", 0,0)");
            const currx = parseFloat(nameElement.getAttribute("x"));
            const curry = parseFloat(nameElement.getAttribute("y"));
            nameElement.setAttribute("x", (currx / value).toString());
            nameElement.setAttribute("y", (curry / value).toString());
        }
        if (statsElement !== undefined) {
            var bb = statsElement.getBBox();
            var widthTransform = layout.blocks.blockStats.width * 0.9 / bb.width;
            var heightTransform = layout.blocks.blockStats.height * 0.9 / bb.height;
            var value = widthTransform < heightTransform ? widthTransform : heightTransform;
            statsElement.setAttribute("transform", "matrix("+value+", 0, 0, "+value+", 0,0)");
            const currx = parseFloat(statsElement.getAttribute("x"));
            const curry = parseFloat(statsElement.getAttribute("y"));
            statsElement.setAttribute("x", (currx / value).toString());
            statsElement.setAttribute("y", (curry / value).toString());
        }
    })

    let coreWidthOffset = 0;
    let coreHeightOffset = 0;
    let coreOffsetFactor = 0.15;
    afterUpdate(() => {
        if (fullSsdSvg !== undefined) {
            let text: string;
            if (injectXlink) {
                text = fullSsdSvg.outerHTML;
                text = text.replaceAll(`href=`, `xlink:href=`);

            } else {
                text = fullSsdSvg.outerHTML;
                text = text.replace(`<svg `, `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" `);
            }
            svgDataStr = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(text);

            const ctx = pngCanvas.getContext("2d");
            const v = Canvg.fromString(ctx, fullSsdSvg.outerHTML);
            v.render();
            pngDataStr = pngCanvas.toDataURL("image/png");
        }

        coreHeightOffset = (layout.blocks.blockCore.height * coreOffsetFactor) / 2;
        coreWidthOffset = (layout.blocks.blockCore.width * coreOffsetFactor) / 2;
    });
</script>

{#if layout !== undefined}
<div class="ssd">
    <svg viewBox="-1 -1 {layout.blocks.width + 2} {layout.blocks.height + 2}" width="100%" height="100%" bind:this="{fullSsdSvg}">
        <defs>
            {@html $ssdComponents.systems}
            {@html $ssdComponents.hull}
            {@html svgCore.svg}
            {@html svgDrive.svg}
        {#if (svgFtl !== undefined) }
            {@html svgFtl.svg}
        {/if}
        </defs>
    <rect x="0" y="0" width="{layout.blocks.width}" height="{layout.blocks.height}" stroke="black" fill="white" />
    <text x="{layout.blocks.blockName.minx + (layout.blocks.blockName.width / 2)}" y="{layout.blocks.blockName.miny + (layout.blocks.blockName.height / 2)}" bind:this="{nameElement}" dominant-baseline="middle" text-anchor="middle">{$ship.class} "{$ship.name}"</text>
    <text x="{layout.blocks.blockStats.minx + (layout.blocks.blockStats.width / 2)}" y="{layout.blocks.blockStats.miny + (layout.blocks.blockStats.height / 2)}" bind:this="{statsElement}" dominant-baseline="middle" text-anchor="middle">Mass: {$ship.mass}, NPV: {$ship.points}, CPV: {$ship.cpv}</text>
    <use href="#_ssdSystems" x="{layout.blocks.blockSystems.minx}" y="{layout.blocks.blockSystems.miny}" width="{layout.blocks.blockSystems.width}" height="{layout.blocks.blockSystems.height}" />
    <use href="#_ssdHull" x="{layout.blocks.blockHull.minx}" y="{layout.blocks.blockHull.miny}" width="{layout.blocks.blockHull.width}" height="{layout.blocks.blockHull.height}" />
    <use href="#svg_coreSys" x="{layout.blocks.blockCore.minx + coreWidthOffset}" y="{layout.blocks.blockCore.miny + coreHeightOffset}" width="{layout.blocks.blockCore.width * (1 - coreOffsetFactor)}" height="{layout.blocks.blockCore.height * (1 - coreOffsetFactor)}" />
{#if hasFtlAdv}
    <use href="#svg_ftlAdv" x="{layout.blocks.blockFtl.minx}" y="{layout.blocks.blockFtl.miny}" width="{layout.blocks.blockFtl.width}" height="{layout.blocks.blockFtl.height}" />
{:else if sysFtl !== undefined}
    <use href="#svg_ftl" x="{layout.blocks.blockFtl.minx}" y="{layout.blocks.blockFtl.miny}" width="{layout.blocks.blockFtl.width}" height="{layout.blocks.blockFtl.height}" />
{/if}
{#if hasAdvDrive}
    <use href="#svg_driveAdv" x="{layout.blocks.blockDrive.minx}" y="{layout.blocks.blockDrive.miny}" width="{layout.blocks.blockDrive.width}" height="{layout.blocks.blockDrive.height}" />
{:else}
    <use href="#svg_drive" x="{layout.blocks.blockDrive.minx}" y="{layout.blocks.blockDrive.miny}" width="{layout.blocks.blockDrive.width}" height="{layout.blocks.blockDrive.height}" />
{/if}
</svg>
</div>

<div class="level">
    <div class="level-item">
        <div class="field">
            <div class="control">
            <a href="{svgDataStr}" download="SSD.svg">
                <button class="button">Download SVG</button>
            </a>
            </div>
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" bind:checked="{injectXlink}">
                    Adjust for apps (<a on:click="{() => dispatch("message", {msg: "showSvg"})
                    }">read more</a>)
                  </label>
            </div>
        </div>
    </div>
    <div class="level-item">
        <a href="{pngDataStr}" download="SSD.png">
            <button class="button">Download PNG</button>
        </a>
    </div>
</div>
<div class="content">
    <p>
        Note that the exports will not be identical because they cannot see the applied CSS. This is most evident in text elements.
    </p>
</div>


<div class="hidden">
    <canvas width="{layout.blocks.width + 2}" height="{layout.blocks.height + 2}" bind:this="{pngCanvas}"></canvas>
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