<script lang="ts">
    import { afterUpdate, beforeUpdate, onMount } from "svelte";
    import { ship } from "@/stores/writeShip";
    import type { ILayout as ILayoutSystem } from "@/stores/writeShip";
    import { ssdComponents } from "@/stores/writeSsd";
    import { systems, svgLib, hull } from "ftlibship";
    import type { ISystemSVG } from "ftlibship";
    import Export from "../Export.svelte";

    let layout = ($ship.layout as ILayoutSystem).blocks;
    const svgCore = svgLib.find((x) => x.id === "svglib_coreSys")!;
    const sysFtl: systems.ISystem = $ship.systems.find((x) => x.name === "ftl");
    let hasFtlAdv = false;
    let svgFtl: ISystemSVG;
    if (
        sysFtl !== undefined &&
        sysFtl.hasOwnProperty("advanced") &&
        sysFtl.advanced
    ) {
        hasFtlAdv = true;
    }
    if (sysFtl !== undefined) {
        svgFtl = systems.getSystem(sysFtl, $ship).glyph();
    }

    const sysDrive = $ship.systems.find((x) => x.name === "drive")!;
    let hasAdvDrive = false;
    if (sysDrive.hasOwnProperty("advanced") && sysDrive.advanced) {
        hasAdvDrive = true;
    }
    const svgDrive = systems.getSystem(sysDrive, $ship).glyph();

    let nameElement: SVGTextElement;
    let statsElement: SVGTextElement;
    let fullSsdSvg: SVGSVGElement;

    const genHull = () => {
        $ssdComponents.hull = hull.genSvg($ship, {
            cellsize: layout.blocks.cellsize,
            dim: {
                height: layout.blocks.blockHull.height,
                width: layout.blocks.blockHull.width,
            },
        });
        $ssdComponents = $ssdComponents;
    };

    beforeUpdate(() => {
        genHull();
    });

    onMount(() => {
        if (nameElement !== undefined) {
            var bb = nameElement.getBBox();
            var widthTransform =
                (layout.blocks.blockName.width * 0.9) / bb.width;
            var heightTransform =
                (layout.blocks.blockName.height * 0.9) / bb.height;
            var value =
                widthTransform < heightTransform
                    ? widthTransform
                    : heightTransform;
            nameElement.setAttribute(
                "transform",
                "matrix(" + value + ", 0, 0, " + value + ", 0,0)"
            );
            const currx = parseFloat(nameElement.getAttribute("x"));
            const curry = parseFloat(nameElement.getAttribute("y"));
            nameElement.setAttribute("x", (currx / value).toString());
            nameElement.setAttribute("y", (curry / value).toString());
        }
        if (statsElement !== undefined) {
            var bb = statsElement.getBBox();
            var widthTransform =
                (layout.blocks.blockStats.width * 0.9) / bb.width;
            var heightTransform =
                (layout.blocks.blockStats.height * 0.9) / bb.height;
            var value =
                widthTransform < heightTransform
                    ? widthTransform
                    : heightTransform;
            statsElement.setAttribute(
                "transform",
                "matrix(" + value + ", 0, 0, " + value + ", 0,0)"
            );
            const currx = parseFloat(statsElement.getAttribute("x"));
            const curry = parseFloat(statsElement.getAttribute("y"));
            statsElement.setAttribute("x", (currx / value).toString());
            statsElement.setAttribute("y", (curry / value).toString());
        }
    });

    let coreWidthOffset = 0;
    let coreHeightOffset = 0;
    let coreOffsetFactor = 0.15;
    afterUpdate(() => {
        coreHeightOffset =
            (layout.blocks.blockCore.height * coreOffsetFactor) / 2;
        coreWidthOffset =
            (layout.blocks.blockCore.width * coreOffsetFactor) / 2;
    });
</script>

{#if layout !== undefined}
    <div class="ssd">
        <svg
            viewBox="-1 -1 {layout.blocks.width + 2} {layout.blocks.height + 2}"
            width="100%"
            height="100%"
            bind:this="{fullSsdSvg}"
        >
            <defs>
                {@html $ssdComponents.systems}
                {@html $ssdComponents.hull}
                {@html svgCore.svg}
                {@html svgDrive.svg}
                {#if svgFtl !== undefined}
                    {@html svgFtl.svg}
                {/if}
            </defs>
            <rect
                x="0"
                y="0"
                width="{layout.blocks.width}"
                height="{layout.blocks.height}"
                stroke="black"
                fill="white"
            ></rect>
            <text
                x="{layout.blocks.blockName.minx +
                    layout.blocks.blockName.width / 2}"
                y="{layout.blocks.blockName.miny +
                    layout.blocks.blockName.height / 2}"
                bind:this="{nameElement}"
                dominant-baseline="middle"
                text-anchor="middle">{$ship.class} "{$ship.name}"</text
            >
            <text
                x="{layout.blocks.blockStats.minx +
                    layout.blocks.blockStats.width / 2}"
                y="{layout.blocks.blockStats.miny +
                    layout.blocks.blockStats.height / 2}"
                bind:this="{statsElement}"
                dominant-baseline="middle"
                text-anchor="middle"
                >Mass: {$ship.mass}, NPV: {$ship.points}, CPV: {$ship.cpv}</text
            >
            <use
                href="#_ssdSystems"
                x="{layout.blocks.blockSystems.minx}"
                y="{layout.blocks.blockSystems.miny}"
                width="{layout.blocks.blockSystems.width}"
                height="{layout.blocks.blockSystems.height}"
            ></use>
            <use
                href="#_ssdHull"
                x="{layout.blocks.blockHull.minx}"
                y="{layout.blocks.blockHull.miny}"
                width="{layout.blocks.blockHull.width}"
                height="{layout.blocks.blockHull.height}"
            ></use>
            <use
                href="#coreSys"
                x="{layout.blocks.blockCore.minx + coreWidthOffset}"
                y="{layout.blocks.blockCore.miny + coreHeightOffset}"
                width="{layout.blocks.blockCore.width * (1 - coreOffsetFactor)}"
                height="{layout.blocks.blockCore.height *
                    (1 - coreOffsetFactor)}"
            ></use>
            {#if hasFtlAdv}
                <use
                    href="#ftlAdv"
                    x="{layout.blocks.blockFtl.minx}"
                    y="{layout.blocks.blockFtl.miny}"
                    width="{layout.blocks.blockFtl.width}"
                    height="{layout.blocks.blockFtl.height}"
                ></use>
            {:else if sysFtl !== undefined}
                <use
                    href="#ftl"
                    x="{layout.blocks.blockFtl.minx}"
                    y="{layout.blocks.blockFtl.miny}"
                    width="{layout.blocks.blockFtl.width}"
                    height="{layout.blocks.blockFtl.height}"
                ></use>
            {/if}
            {#if hasAdvDrive}
                <use
                    href="#driveAdv"
                    x="{layout.blocks.blockDrive.minx}"
                    y="{layout.blocks.blockDrive.miny}"
                    width="{layout.blocks.blockDrive.width}"
                    height="{layout.blocks.blockDrive.height}"
                ></use>
            {:else}
                <use
                    href="#drive"
                    x="{layout.blocks.blockDrive.minx}"
                    y="{layout.blocks.blockDrive.miny}"
                    width="{layout.blocks.blockDrive.width}"
                    height="{layout.blocks.blockDrive.height}"
                ></use>
            {/if}
        </svg>
    </div>

    {#key fullSsdSvg}
        <Export
            width="{layout.blocks.width}"
            height="{layout.blocks.height}"
            svgDisplay="{fullSsdSvg}"
            on:message
        />
    {/key}
{/if}

<style>
    .ssd {
        width: 100%;
        height: 30rem;
        padding-bottom: 1em;
    }
</style>
