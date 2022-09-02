<script lang="ts">
    import { Canvg } from "canvg";
    import { afterUpdate, beforeUpdate } from 'svelte';
    import { ship } from "../../stores/writeShip";
    import { ssdComponents } from "../../stores/writeSsd";
    import { layoutFactory } from "../layouts";
    import { svgLib } from "../svgLib";

    export let layoutID: string;

    const layout = layoutFactory(layoutID, 1000);
    const bSystems = layout.blockSystems();
    const bName = layout.blockName();
    const bHull = layout.blockHull();
    const bDrive = layout.blockDrive();
    const bFtl = layout.blockFtl();
    const bCore = layout.blockCore();
    const svgCore = svgLib.find(x => x.id === "coreSys")!;
    const svgDrive = svgLib.find(x => x.id === "drive")!;
    const hasFtl: boolean = $ship.systems.find(x => x.name === "ftl") !== undefined;
    let hasFtlAdv = false;
    let svgFtl = svgLib.find(x => x.id === "ftl")!;
    if (hasFtl) {
        const sys = $ship.systems.find(x => x.name === "ftl")!;
        if ( (sys.hasOwnProperty("advanced")) && (sys.advanced) ) {
            hasFtlAdv = true;
            svgFtl = svgLib.find(x => x.id === "ftlAdv")!;
        }
    }
    let nameElement: SVGTextElement;
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
        // Add purchased DCPs when implemented
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

        const blocksHigh = Math.floor(bHull.height / layout.cellsize);
        const svgHull = svgLib.find(x => x.id === "hull")!;
        const svgHullCrew = svgLib.find(x => x.id === "hullCrew")!;
        const svgArmour = svgLib.find(x => x.id === "armour")!;
        let s = `<symbol id="_ssdHull" viewBox="-1 -1 ${bHull.width + 2} ${bHull.height + 2}">`;
        s += `<defs>`;
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

    afterUpdate(() => {
        if (nameElement !== undefined) {
            var bb = nameElement.getBBox();
            var widthTransform = bName.width * 0.9 / bb.width;
            var heightTransform = bName.height * 0.9 / bb.height;
            var value = widthTransform < heightTransform ? widthTransform : heightTransform;
            nameElement.setAttribute("transform", "matrix("+value+", 0, 0, "+value+", 0,0)");
            const currx = parseFloat(nameElement.getAttribute("x"));
            const curry = parseFloat(nameElement.getAttribute("y"));
            nameElement.setAttribute("x", (currx / value).toString());
            nameElement.setAttribute("y", (curry / value).toString());
        }
        if (thrustElement !== undefined) {
            var bb = thrustElement.getBBox();
            var widthTransform = bDrive.width * 0.75 / bb.width;
            var heightTransform = bDrive.height * 0.75 / bb.height;
            var value = widthTransform < heightTransform ? widthTransform : heightTransform;
            thrustElement.setAttribute("transform", "matrix("+value+", 0, 0, "+value+", 0,0)");
            const currx = parseFloat(thrustElement.getAttribute("x"));
            const curry = parseFloat(thrustElement.getAttribute("y"));
            thrustElement.setAttribute("x", (currx / value).toString());
            thrustElement.setAttribute("y", (curry / value).toString());
        }
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
        {#if hasFtl}
            {@html svgFtl.svg}
        {/if}
        </defs>
    <rect x="0" y="0" width="{layout.width}" height="{layout.height}" stroke="black" fill="white" />
    <text x="{bName.minx + (bName.width / 2)}" y="{bName.miny + (bName.height / 2)}" bind:this="{nameElement}" dominant-baseline="middle" text-anchor="middle">{$ship.class} "{$ship.name}"</text>
    <use href="#_ssdSystems" x="{bSystems.minx}" y="{bSystems.miny}" width="{bSystems.width}" height="{bSystems.height}" />
    <use href="#_ssdHull" x="{bHull.minx}" y="{bHull.miny}" width="{bHull.width}" height="{bHull.height}" />
    <use href="#svg_coreSys" x="{bCore.minx}" y="{bCore.miny}" width="{bCore.width}" height="{bCore.height}" />
{#if hasFtlAdv}
    <use href="#svg_ftlAdv" x="{bFtl.minx}" y="{bFtl.miny}" width="{bFtl.width}" height="{bFtl.height}" />
{:else if hasFtl}
    <use href="#svg_ftl" x="{bFtl.minx}" y="{bFtl.miny}" width="{bFtl.width}" height="{bFtl.height}" />
{/if}
    <use href="#svg_drive" x="{bDrive.minx}" y="{bDrive.miny}" width="{bDrive.width}" height="{bDrive.height}" />
    <text x="{bDrive.minx + (bDrive.width / 2)}" y="{bDrive.miny + (bDrive.height / 2) + (bDrive.height * 0.1)}" bind:this="{thrustElement}" dominant-baseline="middle" text-anchor="middle">{totalThrust}</text>
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