<script lang="ts">
    import { ship } from "../../stores/writeShip";
    import { snapToGrid } from "../../stores/writeSnap";
    import { savedLayouts } from "../../stores/writeStoredLayouts";
    import { ssdComponents } from "../../stores/writeSsd";
    import { layouts } from "../../lib/layouts";
    import type { ILayout } from "../../lib/layouts";
    import type { IBox } from "../../lib/layouts";
    import type { ISystemSVG } from "../../lib/svgLib";
    import { nanoid } from "nanoid";
    import { getSystem } from "../../lib/systems";

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

    const allLayouts: ILayout[] = [...layouts, ...$savedLayouts];
    const layout = allLayouts.find(x => x.id === layoutID);
    let block: IBox;
    let blocksWide: number;
    let blocksHigh: number;
    const xs: number[] = [];
    const ys: number[] = [];
    let cellsize = 0;
    const systems: ISystem[] = [];
    const sysDistinct: ISystemSVG[] = [];
    const lines: IPoint[][] = [];
    $: if (layout !== undefined) {
        block = layout.blockSystems;
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
        for (const set of ["systems", "ordnance", "weapons"]) {
            const ignore = ["drive", "ftl"];
            const sysSet = $ship[set] as ISystem[];
            for (const sys of sysSet) {
                if (ignore.includes(sys.name)) {
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
                const svg = getSystem(sys, $ship).glyph();
                if (svg !== undefined) {
                    sys.glyph = svg;
                    const idx = sysDistinct.findIndex(x => x.id === svg.id);
                    if (idx === -1) {
                        sysDistinct.push(svg);
                    }
                }
                systems.push(sys as ISystem);
            }
        }

        // Find launcher/magazine combos and draw lines between them
        for (const sys of systems){
            if (sys.name === "salvoLauncher") {
                if ( (sys.hasOwnProperty("magazine")) && (sys.magazine !== undefined) ) {
                    const mag = systems.find(x => x.id === sys.magazine);
                    if (mag !== undefined) {
                        const xLaunch = sys.x * layout.cellsize;
                        const yLaunch = sys.y * layout.cellsize;
                        const wLaunch = sys.glyph.width * layout.cellsize;
                        const hLaunch = sys.glyph.height * layout.cellsize;
                        const x1 = xLaunch + (wLaunch / 2);
                        const y1 = yLaunch + (hLaunch / 2);

                        const xMag = mag.x * layout.cellsize;
                        const yMag = mag.y * layout.cellsize;
                        const wMag = mag.glyph.width * layout.cellsize;
                        const hMag = mag.glyph.height * layout.cellsize;
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
                        const xTurret = (s.x as number) * layout.cellsize;
                        const yTurret = (s.y as number) * layout.cellsize;
                        const wTurret = s.glyph.width * layout.cellsize;
                        const hTurret = s.glyph.height * layout.cellsize;
                        const x1 = xTurret + (wTurret / 2);
                        const y1 = yTurret + (hTurret / 2);

                        const xWeapon = obj.x * layout.cellsize;
                        const yWeapon = obj.y * layout.cellsize;
                        const wWeapon = obj.glyph.width * layout.cellsize;
                        const hWeapon = obj.glyph.height * layout.cellsize;
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

    let svgDisplay: SVGSVGElement;
    let dragSelected: SVGUseElement; // | SVGGElement;
    let offset: IPoint;
    // let transform: SVGTransform;
    let maxx: number;
    let maxy: number;

    // See view-source:https://raw.githubusercontent.com/petercollingridge/code-for-blog/master/svg-interaction/draggable/draggable_groups.svg
    // const initDrag = (e: MouseEvent | TouchEvent) => {
    //     offset = getMousePosition(e);

    //     // Make sure the first transform on the element is a translate transform
    //     const transforms = dragSelected.transform.baseVal;

    //     if ( (transforms.length === 0) || (transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) ) {
    //         // Create an transform that translates by (0, 0)
    //         const translate = svgDisplay.createSVGTransform();
    //         translate.setTranslate(0, 0);
    //         dragSelected.transform.baseVal.insertItemBefore(translate, 0);
    //     }

    //     // Get initial translation
    //     transform = transforms.getItem(0);
    //     offset.x -= transform.matrix.e;
    //     offset.y -= transform.matrix.f;
    // }

    const startDrag = (e: MouseEvent | TouchEvent) => {
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
                let newx: number;
                let newy: number;
                if ($snapToGrid) {
                    newx = Math.round(parseFloat(dragSelected.getAttribute("x")) / layout.cellsize);
                    newy = Math.round(parseFloat(dragSelected.getAttribute("y")) / layout.cellsize);
                } else {
                    newx = parseFloat(dragSelected.getAttribute("x")) / layout.cellsize;
                    newy = parseFloat(dragSelected.getAttribute("y")) / layout.cellsize;
                }
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

    const getMousePosition = (e: MouseEvent | TouchEvent): IPoint => {
        var CTM = svgDisplay.getScreenCTM();
        let realE: MouseEvent | Touch;
        if (e.hasOwnProperty("touches")) {
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
        for (const distinct of sysDistinct) {
            s += distinct.svg;
        }
        s += `</defs>`;
        for (const line of lines) {
            s += `<line x1="${line[0].x}" y1="${line[0].y}" x2="${line[1].x}" y2="${line[1].y}" stroke="black" stroke-width="5" />`;
        }
        for (const sys of systems) {
            s += `<use id="${sys.id}" href="#svg_${sys.glyph.id}" x="${sys.x * layout.cellsize}" y="${sys.y * layout.cellsize}" width="${sys.glyph.width * layout.cellsize}" height="${sys.glyph.height * layout.cellsize}" />`;
            if (sys.name === "bay") {
                s += `<text x="${(sys.x * layout.cellsize) + ((sys.glyph.width * layout.cellsize) / 2)}" y="${(sys.y * layout.cellsize) + ((sys.glyph.height * layout.cellsize) * 0.75)}" dominant-baseline="middle" text-anchor="middle" font-size="${(sys.glyph.height * layout.cellsize) * 0.25}">${sys.capacity}</text>`;
            }
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

<div class="ssd">
    <svg viewBox="-1 -1 {block.width + 2} {block.height + 2}" width="100%" height="100%" on:mousedown="{startDrag}" on:mouseup="{endDrag}" on:mousemove="{drag}" on:mouseleave="{endDrag}" on:touchstart="{startDrag}" on:touchmove="{drag}" on:touchend="{endDrag}" on:touchleave="{endDrag}" on:touchcancel="{endDrag}" bind:this="{svgDisplay}">
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

    {#each lines as line}
        <line x1="{line[0].x}" y1="{line[0].y}" x2="{line[1].x}" y2="{line[1].y}" stroke="black" stroke-width="5" />
    {/each}

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