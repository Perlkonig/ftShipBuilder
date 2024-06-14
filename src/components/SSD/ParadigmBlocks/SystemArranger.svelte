<script lang="ts">
    import { ship } from "@/stores/writeShip";
    import { snapToGrid } from "@/stores/writeSnap";
    import { ssdComponents } from "@/stores/writeSsd";
    import type { ILayout as ILayoutSystem, IElement } from "@/stores/writeShip";
    import type { IBox } from "@/lib/layouts";
    import type { ISystemSVG } from "ftlibship";
    import { systems } from "ftlibship";
    import { afterUpdate } from "svelte";

    interface ISystem {
        name: string;
        id: string;
        [k: string]: unknown;
    }

    interface IPoint {
        x: number;
        y: number;
    }

    let layout = ($ship.layout as ILayoutSystem).blocks;
    let block: IBox;
    let xs: number[] = [];
    let ys: number[] = [];
    let cellsize = 0;
    let outOfBounds: boolean;
    let defs: ISystemSVG[] = [];
    let lines: IPoint[][] = [];
    $: if (layout !== undefined) {
        xs = [];
        ys = [];
        lines = [];
        block = layout.blocks.blockSystems;
        let currx = cellsize;
        while (currx < block.width) {
            xs.push(currx)
            currx += layout.blocks.cellsize;
        }
        let curry = cellsize;
        while (curry < block.height) {
            ys.push(curry)
            curry += layout.blocks.cellsize;
        }

        // Get full list of all system instances and add to layout
        // Also add distinct glyphs to the `sysDistinct` array.
        const seenIds: Set<string> = new Set();
        for (const set of ["systems", "ordnance", "weapons"]) {
            const ignore = ["drive", "ftl"];
            const sysSet = $ship[set] as ISystem[];
            for (const sys of sysSet) {
                if (ignore.includes(sys.name)) {
                    continue;
                }
                const obj = systems.getSystem(sys, $ship);
                seenIds.add(obj.uid);
                const svg = obj.glyph();
                if (svg !== undefined) {
                    const idx = defs.findIndex(x => x.id === svg.id);
                    if (idx === -1) {
                        defs.push(svg);
                    }
                }
                if (! layout.elements.hasOwnProperty(obj.uid)) {
                    layout.elements[obj.uid] = {
                        id: obj.uid,
                        glyphid: `svg_${svg.id}`,
                        width: svg.width * layout.blocks.cellsize,
                        height: svg.height * layout.blocks.cellsize,
                        x: layout.blocks.cellsize,
                        y: layout.blocks.cellsize
                    };
                } else {
                    layout.elements[obj.uid].glyphid = `svg_${svg.id}`;
                    layout.elements[obj.uid].width = svg.width * layout.blocks.cellsize;
                    layout.elements[obj.uid].height = svg.height * layout.blocks.cellsize;
                }
            }
        }

        // add Flawed glyph
        if ($ship.flawed !== undefined && $ship.flawed) {
            const obj = new systems.Flawed({name: "flawed", id: "_____flawed_____"}, $ship);
            seenIds.add(obj.uid);
            const svg = obj.glyph();
            if (svg !== undefined) {
                const idx = defs.findIndex(x => x.id === svg.id);
                if (idx === -1) {
                    defs.push(svg);
                }
            }
            if (! layout.elements.hasOwnProperty(obj.uid)) {
                layout.elements[obj.uid] = {
                    id: obj.uid,
                    glyphid: `svg_${svg.id}`,
                    width: svg.width * layout.blocks.cellsize,
                    height: svg.height * layout.blocks.cellsize,
                    x: layout.blocks.cellsize,
                    y: layout.blocks.cellsize
                };
            } else {
                layout.elements[obj.uid].glyphid = `svg_${svg.id}`;
                layout.elements[obj.uid].width = svg.width * layout.blocks.cellsize;
                layout.elements[obj.uid].height = svg.height * layout.blocks.cellsize;
            }
        }

        // prune unused glyphs
        const unused: string[] = [];
        for (const key in layout.elements) {
            if ( (! seenIds.has(key)) && (! key.startsWith("#")) ) {
                unused.push(key);
            }
        }
        for (const id of unused) {
            delete layout.elements[id];
        }

        // Look for glyphs that are now out of bounds
        outOfBounds = false;
        for (const key in layout.elements) {
            if ( (layout.elements[key].x < 0) || (layout.elements[key].x > block.width) ) {
                outOfBounds = true;
                break;
            }
            if ( (layout.elements[key].y < 0) || (layout.elements[key].y > block.height) ) {
                outOfBounds = true;
                break;
            }
        }

        // Find launcher/magazine combos and draw lines between them
        for (const sys of $ship.ordnance){
            if (sys.name === "salvoLauncher") {
                if ( (sys.hasOwnProperty("magazine")) && (sys.magazine !== undefined) ) {
                    const launchObj = systems.getSystem(sys, $ship);
                    const mag = $ship.systems.find(x => x.id === sys.magazine);
                    if (mag !== undefined) {
                        const magObj = systems.getSystem(mag, $ship);
                        const xLaunch = layout.elements[launchObj.uid].x;
                        const yLaunch = layout.elements[launchObj.uid].y;
                        const wLaunch = launchObj.glyph().width * layout.blocks.cellsize;
                        const hLaunch = launchObj.glyph().height * layout.blocks.cellsize;
                        const x1 = xLaunch + (wLaunch / 2);
                        const y1 = yLaunch + (hLaunch / 2);

                        const xMag = layout.elements[magObj.uid].x;
                        const yMag = layout.elements[magObj.uid].y;
                        const wMag = magObj.glyph().width * layout.blocks.cellsize;
                        const hMag = magObj.glyph().height * layout.blocks.cellsize;
                        const x2 = xMag + (wMag / 2);
                        const y2 = yMag + (hMag / 2);

                        lines.push([{x: x1, y: y1}, {x: x2, y: y2}]);
                    }
                }
            }
        }

        // Find turret/weapon combos and draw lines between them if they are not layered.
        for (const s of $ship.systems) {
            if (s.name === "turret") {
                const tObj = systems.getSystem(s, $ship);
                for (const id of s.weapons) {
                    let obj: any;
                    let idx = $ship.ordnance.findIndex(x => x.id === id);
                    if (idx !== -1) {
                        obj = $ship.ordnance[idx];
                    } else {
                        idx = $ship.weapons.findIndex(x => x.id === id);
                        if (idx !== -1) {
                            obj = $ship.weapons[idx];
                        }
                    }
                    if (obj !== undefined) {
                        const wObj = systems.getSystem(obj, $ship);
                        const xTurret = layout.elements[tObj.uid].x;
                        const yTurret = layout.elements[tObj.uid].y;
                        const wTurret = tObj.glyph().width * layout.blocks.cellsize;
                        const hTurret = tObj.glyph().height * layout.blocks.cellsize;
                        const x1 = xTurret + (wTurret / 2);
                        const y1 = yTurret + (hTurret / 2);

                        const xWeapon = layout.elements[wObj.uid].x;
                        const yWeapon = layout.elements[wObj.uid].y;
                        const wWeapon = wObj.glyph().width * layout.blocks.cellsize;
                        const hWeapon = wObj.glyph().height * layout.blocks.cellsize;
                        const x2 = xWeapon + (wWeapon / 2);
                        const y2 = yWeapon + (hWeapon / 2);

                        // Test for overlap
                        if ( (xWeapon < xTurret) || (xWeapon > xTurret + wTurret) || (yWeapon < yTurret) || (yWeapon > yTurret + hTurret) ) {
                            lines.push([{x: x1, y: y1}, {x: x2, y: y2}]);
                        }
                    }
                }
            }
        }

        exportLayout();
    }

    const correctOutOfBounds = () => {
        for (const key in layout.elements) {
            if ( (layout.elements[key].x < 0) || (layout.elements[key].x > block.width) ) {
                layout.elements[key].x = layout.blocks.cellsize;
            }
            if ( (layout.elements[key].y < 0) || (layout.elements[key].y > block.height) ) {
                layout.elements[key].y = layout.blocks.cellsize;
            }
        }
        layout = layout;
    }

    let svgDisplay: SVGSVGElement;
    let dragSelected: SVGUseElement; // | SVGGElement;
    let offset: IPoint;
    let maxx: number;
    let maxy: number;

    const startDrag = (e: MouseEvent | TouchEvent) => {
        if ((e.target as SVGUseElement).classList.contains("draggable")) {
            dragSelected = e.target as SVGUseElement;
            offset = getMousePosition(e);
            offset.x -= parseFloat(dragSelected.getAttribute("x"));
            offset.y -= parseFloat(dragSelected.getAttribute("y"));
            if (dragSelected.classList.contains("confined")) {
                let bbox = dragSelected.getBBox();
                maxx = layout.blocks.width - bbox.width;
                maxy = layout.blocks.height - bbox.height;
            }
        }
    }

    const drag = (e: MouseEvent | TouchEvent) => {
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

    const endDrag = (e: MouseEvent | TouchEvent) => {
        if (dragSelected !== undefined) {
            const draggedId = dragSelected.getAttribute("id");
            let element = layout.elements[draggedId];
            if (element !== undefined) {
                let newx: number;
                let newy: number;
                if ($snapToGrid) {
                    newx = Math.round(parseFloat(dragSelected.getAttribute("x")) / layout.blocks.cellsize) * layout.blocks.cellsize;
                    newy = Math.round(parseFloat(dragSelected.getAttribute("y")) / layout.blocks.cellsize) * layout.blocks.cellsize;
                } else {
                    newx = parseFloat(dragSelected.getAttribute("x"));
                    newy = parseFloat(dragSelected.getAttribute("y"));
                }
                if (newx < 0) { newx = 0; }
                if (newx >= block.width) { newx = block.width - layout.blocks.cellsize; }
                if (newy < 0) { newy = 0;}
                if (newy >= block.height) { newy = block.height - layout.blocks.cellsize;}
                element.x = newx;
                element.y = newy;
                layout = layout;
            }
            dragSelected = undefined;
            maxx = maxy = undefined;
            exportLayout();
        }
    }

    const genRect = (ele: IElement): DOMRect => {
        return new DOMRect(ele.x, ele.y, ele.width, ele.height);
    }

    let allOverlaps: Set<string> = new Set();
    const findOverlapWith = (dropped: IElement) => {
        const droppedRect = genRect(dropped);
        for (const used of Object.values(layout.elements)) {
            if (used.id === dropped.id) { continue; }
            const otherRect = genRect(used);
            if (overlapping(droppedRect, otherRect)) {
                allOverlaps.add(dropped.id);
                allOverlaps.add(used.id);
            }
        }
    };

    const findAllOverlaps = () => {
        allOverlaps = new Set();
        for (const used of Object.values(layout.elements)) {
            findOverlapWith(used);
        }
    };

    afterUpdate(() => {
        findAllOverlaps();
    });

    const overlapping = (r1: DOMRect, r2: DOMRect): boolean => {
        return !((r2.left >= r1.right) ||
           (r2.right <= r1.left) ||
           (r2.top >= r1.bottom) ||
           (r2.bottom <= r1.top));
    };

    const getMousePosition = (e: MouseEvent | TouchEvent): IPoint => {
        var CTM = svgDisplay.getScreenCTM();
        let realE: MouseEvent | Touch;
        if ("touches" in e) {
            realE = (e as TouchEvent).touches[0];
        } else {
            realE = e as MouseEvent;
        }
        return {
            x: (realE.clientX - CTM.e) / CTM.a,
            y: (realE.clientY - CTM.f) / CTM.d
        };
    }

    const exportLayout = () => {
        let s = `<symbol id="_ssdSystems" viewBox="-1 -1 ${block.width + 2} ${block.height + 2}">`;
        s += `<defs>`;
        for (const def of defs) {
            s += def.svg;
        }
        s += `</defs>`;
        for (const line of lines) {
            s += `<line x1="${line[0].x}" y1="${line[0].y}" x2="${line[1].x}" y2="${line[1].y}" stroke="black" stroke-width="5" />`;
        }
        for (const sys of Object.values(layout.elements)) {
            s += `<use id="${sys.id}" href="#${sys.glyphid}" x="${sys.x}" y="${sys.y}" width="${sys.width}" height="${sys.height}" />`;
        }
        s += `</symbol>`;
        $ssdComponents.systems = s;
    };
</script>

{#if layout !== undefined}
<div class="field">
    <div class="control">
        <label class="checkbox">
            <input type="checkbox" bind:checked="{$snapToGrid}">
            Snap to grid
        </label>
    </div>
</div>

{#key layout}
<div class="ssd">
    <svg viewBox="-1 -1 {block.width + 2} {block.height + 2}" width="100%" height="100%" on:mousedown="{startDrag}" on:mouseup="{endDrag}" on:mousemove="{drag}" on:mouseleave="{endDrag}" on:touchstart="{startDrag}" on:touchmove="{drag}" on:touchend="{endDrag}" on:touchcancel="{endDrag}" bind:this="{svgDisplay}">
        <defs>
        {#each defs as g}
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

    {#each lines as line}
        <line x1="{line[0].x}" y1="{line[0].y}" x2="{line[1].x}" y2="{line[1].y}" stroke="black" stroke-width="5"/>
    {/each}

    {#each Object.values(layout.elements) as sys, i}
        <use id="{sys.id}" href="#{sys.glyphid}" x="{sys.x}" y="{sys.y}" width="{sys.width}" height="{sys.height}" class="draggable confined" class:svgHighlight="{allOverlaps.has(sys.id)}" />
    {/each}
    </svg>
</div>
{/key}
{/if}

{#if outOfBounds}
<div class="field">
    <div class="control">
        <button class="button is-danger" on:click="{correctOutOfBounds}">Correct Overflow</button>
    </div>
    <p class="help">There are elements outside of the SSD boundaries. Clicking the button will pull them onto the canvas.</p>
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
    :global(.svgHighlight) {
        fill-opacity: 0.5;
        fill: red;
    }
</style>