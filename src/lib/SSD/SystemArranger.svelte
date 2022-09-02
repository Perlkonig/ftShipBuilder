<script lang="ts">
    import { ship } from "../../stores/writeShip";
    import { ssdComponents } from "../../stores/writeSsd";
    import { layoutFactory } from "../layouts";
    import type { IBox } from "../layouts";
    import type { ISystemSVG } from "../svgLib";
    import { getSVG } from "../svgLib";
    import { nanoid } from "nanoid";

    export let layoutID: string;

    interface ISystem {
        name: string;
        id: string;
        x: number;
        y: number;
        glyph: ISystemSVG;
        [k: string]: unknown;
    }

    interface IPoint {
        x: number;
        y: number;
    }

    const layout = layoutFactory(layoutID, 1000);
    let block: IBox;
    let blocksWide: number;
    let blocksHigh: number;
    const xs: number[] = [];
    const ys: number[] = [];
    let cellsize = 0;
    const systems: ISystem[] = [];
    const sysDistinct: ISystemSVG[] = [];
    $: if (layout !== undefined) {
        block = layout.blockSystems();
        blocksWide = Math.floor(block.width / layout.cellsize);
        blocksHigh = Math.floor(block.height / layout.cellsize);
        let currx = cellsize;
        while (currx < block.width) {
            xs.push(currx)
            currx += layout.cellsize;
        }
        let curry = cellsize;
        while (curry < block.height) {
            ys.push(curry)
            curry += layout.cellsize;
        }
        // Get full list of all system instances, adding coordinates and IDs as necessary.
        // Also add distinct glyphs to the `sysDistinct` array.
        for (const sys of $ship.systems) {
            if ( (sys.name === "drive") || (sys.name === "ftl") ) {
                continue;
            }
            if ( (! sys.hasOwnProperty("id")) || (sys.id === undefined) ) {
                sys.id = nanoid(5);
            }
            if ( (! sys.hasOwnProperty("x")) || (sys.x === undefined) ) {
                sys.x = 1;
            } else if (sys.x >= blocksWide) {
                sys.x = blocksWide - 1;
            }
            if ( (! sys.hasOwnProperty("y")) || (sys.y === undefined) ) {
                sys.y = 1;
            } else if (sys.y >= blocksHigh) {
                sys.y = blocksHigh - 1;
            }
            const svg = getSVG(sys);
            if (svg !== undefined) {
                sys.glyph = svg;
                const idx = sysDistinct.findIndex(x => x.id === svg.id);
                if (idx === -1) {
                    sysDistinct.push(svg);
                }
            }
            systems.push(sys as ISystem);
        }
        exportLayout();
    }

    let svgDisplay: SVGSVGElement;
    let dragSelected: SVGUseElement;
    let offset: IPoint;
    let maxx: number;
    let maxy: number;

    const startDrag = (e: MouseEvent) => {
        if ((e.target as SVGUseElement).classList.contains("draggable")) {
            dragSelected = e.target as SVGUseElement;
            offset = getMousePosition(e);
            offset.x -= parseFloat(dragSelected.getAttribute("x"));
            offset.y -= parseFloat(dragSelected.getAttribute("y"));
            if (dragSelected.classList.contains("confined")) {
                let bbox = dragSelected.getBBox();
                maxx = block.width - bbox.width;
                maxy = block.height - bbox.height;
            }
        }
    }

    const drag = (e: MouseEvent) => {
        if (dragSelected !== undefined) {
            e.preventDefault();
            const coord = getMousePosition(e);
            let newx = coord.x - offset.x;
            let newy = coord.y - offset.y;
            if (maxx !== undefined) {
                if (newx < 0) { newx = 0; }
                else if (newx > maxx) { newx = maxx; }
                if (newy < 0) { newy = 0; }
                else if (newy > maxy) { newy = maxy; }
            }
            dragSelected.setAttribute("x", newx.toString());
            dragSelected.setAttribute("y", newy.toString());
        }
    }

    const endDrag = (e: MouseEvent) => {
        if (dragSelected !== undefined) {
            const draggedId = dragSelected.getAttribute("id");
            let sys: ISystem;
            for (const prop of ["systems", "weapons", "ordnance"]) {
                sys = ($ship[prop] as ISystem[]).find(s => s.id === draggedId);
                if (sys !== undefined) {
                    break;
                }
            }
            if (sys !== undefined) {
                const width = Math.floor(block.width / layout.cellsize);
                const height = Math.floor(block.height / layout.cellsize);
                let newx = Math.floor(parseFloat(dragSelected.getAttribute("x")) / layout.cellsize);
                let newy = Math.floor(parseFloat(dragSelected.getAttribute("y")) / layout.cellsize);
                if (newx < 0) { newx = 0; }
                if (newx >= width) { newx = width - 1; }
                if (newy < 0) { newy = 0;}
                if (newy >= height) { newy = height - 1;}
                sys.x = newx;
                sys.y = newy;
                $ship = $ship;
            }
            dragSelected = undefined;
            maxx = maxy = undefined;
            exportLayout();
        }
    }

    const getMousePosition = (e: MouseEvent): IPoint => {
        var CTM = svgDisplay.getScreenCTM();
        return {
            x: (e.clientX - CTM.e) / CTM.a,
            y: (e.clientY - CTM.f) / CTM.d
        };
    }

    const exportLayout = () => {
        let s = `<symbol id="_ssdSystems" viewBox="-1 -1 ${block.width + 2} ${block.height + 2}">`;
        s += `<defs>`;
        for (const distinct of sysDistinct) {
            s += distinct.svg;
        }
        s += `</defs>`;
        for (const sys of systems) {
            s += `<use id="${sys.id}" href="#svg_${sys.glyph.id}" x="${sys.x * layout.cellsize}" y="${sys.y * layout.cellsize}" width="${sys.glyph.width * layout.cellsize}" height="${sys.glyph.height * layout.cellsize}" />`;
        }
        s += `</symbol>`;
        $ssdComponents.systems = s;
    };
</script>

{#if layout !== undefined}
<div class="ssd">
    <svg viewBox="-1 -1 {block.width + 2} {block.height + 2}" width="100%" height="100%" on:mousedown="{startDrag}" on:mouseup="{endDrag}" on:mousemove="{drag}" on:mouseleave="{endDrag}" bind:this="{svgDisplay}">
        <defs>
        {#each sysDistinct as g}
            {@html g.svg}
        {/each}
        </defs>
        <rect x="0" y="0" width="{block.width}" height="{block.height}" fill="none" stroke="black"/>
        <g id="grid">
    {#each xs as x}
        <line x1="{x}" y1="0" x2="{x}" y2="{block.height}" stroke="#c0c0c0"/>
    {/each}
    {#each ys as y}
        <line x1="0" y1="{y}" x2="{block.width}" y2="{y}" stroke="#c0c0c0"/>
    {/each}
        </g>
    {#each systems as sys}
        <use id="{sys.id}" href="#svg_{sys.glyph.id}" x="{sys.x * layout.cellsize}" y="{sys.y * layout.cellsize}" width="{sys.glyph.width * layout.cellsize}" height="{sys.glyph.height * layout.cellsize}" class="draggable confined" />
    {/each}
    </svg>
</div>
{/if}

<style>
    .ssd {
        width: 100%;
        height: 15rem;
    }
    .draggable {
        cursor: move;
    }
</style>