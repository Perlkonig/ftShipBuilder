<script lang="ts">
    import { Canvg } from "canvg";
    import { afterUpdate, beforeUpdate } from 'svelte';
    import { ship } from "../../stores/writeShip";
    import { savedLayouts } from "../../stores/writeStoredLayouts";
    import { ssdComponents } from "../../stores/writeSsd";
    import { layouts } from "../../lib/layouts";
    import type { ILayout } from "../../lib/layouts";
    import { getSystem } from "../../lib/systems";
    import { svgLib } from "../../lib/svgLib";
    import type { IGlyph } from "src/lib/systems/_base";

    export let layoutID: string;

    const allLayouts: ILayout[] = [...layouts, ...$savedLayouts];
    const layout = allLayouts.find(x => x.id === layoutID);
    const svgCore = svgLib.find(x => x.id === "coreSys")!;
    const sysFtl = $ship.systems.find(x => x.name === "ftl")!;
    const hasFtl: boolean = sysFtl !== undefined;
    let hasFtlAdv = false;
    let svgFtl: IGlyph;
    if ( (hasFtl) && (sysFtl.hasOwnProperty("advanced")) && (sysFtl.advanced) ) {
        hasFtlAdv = true;
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
    let thrustElement: SVGTextElement;
    let fullSsdSvg: SVGElement;
    let svgDataStr: string;
    let pngDataStr: string;
    let pngCanvas: HTMLCanvasElement;
    $: if (fullSsdSvg !== undefined) {
        svgDataStr = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(fullSsdSvg.outerHTML);

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
        const cf = Math.ceil($ship.mass / 20);
        const interval = Math.ceil($ship.hull.points / cf);
        const boxes: number[] = [];
        for (let i = 0; i < $ship.hull.points; i++) {
            if ( ((i + 1) % interval === 0) || (i === $ship.hull.points - 1) ) {
                boxes.push(1);
            } else {
                boxes.push(0);
            }
        }
        const hullRows: number[][] = [];
        let baselen = Math.floor($ship.hull.points / $ship.hull.rows);
        let delta = $ship.hull.points % $ship.hull.rows;
        for (let i = 0; i < $ship.hull.rows; i++) {
            if (baselen > boxes.length) { baselen = boxes.length; }
            const node = boxes.splice(0, baselen);
            if (delta > 0) {
                node.push(...boxes.splice(0, 1));
                delta--;
            }
            hullRows.push(node);
        }

        const blocksHigh = Math.floor(layout.blockHull.height / layout.cellsize);
        const svgHull = svgLib.find(x => x.id === "hull")!;
        const svgHullCrew = svgLib.find(x => x.id === "hullCrew")!;
        const svgArmour = svgLib.find(x => x.id === "armour")!;
        const svgStealth = svgLib.find(x => x.id === "stealthHull");
        let s = `<symbol id="_ssdHull" viewBox="-1 -1 ${layout.blockHull.width + 2} ${layout.blockHull.height + 2}">`;
        s += `<defs>`;
        if ($ship.hull.stealth !== "0") {
            s += svgStealth.svg;
        }
        s += svgHull.svg;
        s += svgHullCrew.svg;
        if ( ($ship.hasOwnProperty("armour")) && ($ship.armour.length > 0) ) {
            s += svgArmour.svg;
        }
        s += `</defs>`;

        // Hull boxes
        hullRows.reverse();
        for (let row = 0; row < hullRows.length; row++) {
            const boxes = hullRows[row];
            const y = (blocksHigh - (row + 1)) * layout.cellsize;
            for (let col = 0; col < boxes.length; col++) {
                const x = col * layout.cellsize;
                let id = "hull";
                let width = svgHull.width * layout.cellsize;
                let height = svgHull.height * layout.cellsize
                if (boxes[col] === 1 ) {
                    id = "hullCrew";
                    width = svgHullCrew.width * layout.cellsize;
                    height = svgHullCrew.height * layout.cellsize
                }
                s += `<use href="#svg_${id}" x="${x}" y="${y}" width="${width}" height="${height}" />`;

            }
            if (
                    ( ($ship.hull.stealth === "2") &&
                        ( (hullRows.length - (row + 1) === 2) ||
                        (hullRows.length - (row + 1) === 0) ) ) ||
                    ( ($ship.hull.stealth === "1") &&
                        ( (hullRows.length - (row + 1) === 1)) ) ) {
                    s += `<use href="#svg_stealthHull" x="${boxes.length * layout.cellsize}" y="${y}" width="${svgStealth.width * layout.cellsize}" height="${svgStealth.height * layout.cellsize}" />`;
            }
        }

        // Armour circles
        for (let row = 0; row < $ship.armour.length; row++) {
            const y = (blocksHigh - ($ship.hull.rows + 1) - row) * layout.cellsize;
            for (let col = 0; col < $ship.armour[row]; col++) {
                const x = col * layout.cellsize;
                const width = svgArmour.width * layout.cellsize;
                const height = svgArmour.height * layout.cellsize;
                s += `<use href="#svg_armour" x="${x}" y="${y}" width="${width}" height="${height}" />`;
            }
        }
        s += `</symbol>`;

        $ssdComponents.hull = s;
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
        if (thrustElement !== undefined) {
            var bb = thrustElement.getBBox();
            var widthTransform = layout.blockDrive.width * 0.75 / bb.width;
            var heightTransform = layout.blockDrive.height * 0.75 / bb.height;
            var value = widthTransform < heightTransform ? widthTransform : heightTransform;
            thrustElement.setAttribute("transform", "matrix("+value+", 0, 0, "+value+", 0,0)");
            const currx = parseFloat(thrustElement.getAttribute("x"));
            const curry = parseFloat(thrustElement.getAttribute("y"));
            thrustElement.setAttribute("x", (currx / value).toString());
            thrustElement.setAttribute("y", (curry / value).toString());
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
        {#if ( (hasFtl) && (svgFtl !== undefined) )}
            {@html svgFtl.svg}
        {/if}
        </defs>
    <rect x="0" y="0" width="{layout.width}" height="{layout.height}" stroke="black" fill="white" />
    <text x="{layout.blockName.minx + (layout.blockName.width / 2)}" y="{layout.blockName.miny + (layout.blockName.height / 2)}" bind:this="{nameElement}" dominant-baseline="middle" text-anchor="middle">{$ship.class} "{$ship.name}"</text>
    <text x="{layout.blockStats.minx + (layout.blockStats.width / 2)}" y="{layout.blockStats.miny + (layout.blockStats.height / 2)}" bind:this="{statsElement}" dominant-baseline="middle" text-anchor="middle">Mass: {$ship.mass}, NPV: {$ship.points}</text>
    <use href="#_ssdSystems" x="{layout.blockSystems.minx}" y="{layout.blockSystems.miny}" width="{layout.blockSystems.width}" height="{layout.blockSystems.height}" />
    <use href="#_ssdHull" x="{layout.blockHull.minx}" y="{layout.blockHull.miny}" width="{layout.blockHull.width}" height="{layout.blockHull.height}" />
    <use href="#svg_coreSys" x="{layout.blockCore.minx + coreWidthOffset}" y="{layout.blockCore.miny + coreHeightOffset}" width="{layout.blockCore.width * (1 - coreOffsetFactor)}" height="{layout.blockCore.height * (1 - coreOffsetFactor)}" />
{#if hasFtlAdv}
    <use href="#svg_ftlAdv" x="{layout.blockFtl.minx}" y="{layout.blockFtl.miny}" width="{layout.blockFtl.width}" height="{layout.blockFtl.height}" />
{:else if hasFtl}
    <use href="#svg_ftl" x="{layout.blockFtl.minx}" y="{layout.blockFtl.miny}" width="{layout.blockFtl.width}" height="{layout.blockFtl.height}" />
{/if}
{#if hasAdvDrive}
    <use href="#svg_driveAdv" x="{layout.blockDrive.minx}" y="{layout.blockDrive.miny}" width="{layout.blockDrive.width}" height="{layout.blockDrive.height}" />
    <text x="{layout.blockDrive.minx + (layout.blockDrive.width / 2)}" y="{layout.blockDrive.miny + (layout.blockDrive.height / 2) + (layout.blockDrive.height * 0.05)}" bind:this="{thrustElement}" dominant-baseline="middle" text-anchor="middle">{totalThrust}</text>
{:else}
    <use href="#svg_drive" x="{layout.blockDrive.minx}" y="{layout.blockDrive.miny}" width="{layout.blockDrive.width}" height="{layout.blockDrive.height}" />
    <text x="{layout.blockDrive.minx + (layout.blockDrive.width / 2)}" y="{layout.blockDrive.miny + (layout.blockDrive.height / 2) + (layout.blockDrive.height * 0.1)}" bind:this="{thrustElement}" dominant-baseline="middle" text-anchor="middle">{totalThrust}</text>
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