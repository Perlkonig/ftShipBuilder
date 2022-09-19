<script lang="ts">
    import { ship } from "@/stores/writeShip";
    import { snapToGrid } from "@/stores/writeSnap";
    import { svgLib } from "@/lib/svgLib";
    import type { ISystemSVG } from "@/lib/svgLib";
    import { getSystem } from "@/lib/systems";
    import { afterUpdate, onMount } from "svelte";
    import { formRows, genSvg } from "@/lib/hull";

    interface IDim {
        width: number;
        height: number;
        x: number;
        y: number;
        factor: number | undefined;
    }
    interface IElement {
        id: string;
        glyphid: string; // ID for the <use> tag
        width: number;
        height: number;
        x: number;
        y: number;
    }
    interface IElements {
        [k: string]: IElement;
    }
    interface IFreeform {
        width: number;
        height: number;
        cellsize: number;
        nameplate: IDim;
        stats: IDim;
        background: string | undefined;
        elements: IElements;
    }

    let layout: IFreeform;
    onMount(() => {
        if ( ($ship.layout !== undefined) && (typeof $ship.layout !== "string") ) {
            layout = $ship.layout as IFreeform;
        } else {
            layout = {
                width: 3000,
                height: 2000,
                cellsize: 200,
                nameplate: {width: 2000, height: 200, x: 200, y: 200, factor: 1},
                stats: {width: 1000, height: 100, x: 200, y: 200, factor: 1},
                background: undefined,
                elements: {}
            }
            $ship.layout = layout;
        }
        findAllOverlaps();
    });

    interface ISystem {
        name: string;
        id: string;
        [k: string]: unknown;
    }

    interface IPoint {
        x: number;
        y: number;
    }

    const generateTextSymbol = (text: string, symbolid: string): ISystemSVG => {
        const SVG_NS = "http://www.w3.org/2000/svg";
        const tempText = document.createElementNS(SVG_NS, "text");
        tempText.setAttributeNS(null, "id", "__superSecretText__");
        tempText.setAttributeNS(null, "x", "0");
        tempText.setAttributeNS(null, "y", "0");
        tempText.setAttributeNS(null, "font-size", "17");
        tempText.textContent = text;
        secretSvg.append(tempText);
        const bbox = tempText.getBBox();
        tempText.remove();
        // <rect x="${bbox.x}" y="${bbox.y}" width="${bbox.width}" height="${bbox.height}" fill="none" stroke="black" />
        return {
            id: symbolid,
            svg: `<symbol id="${symbolid}" viewBox="${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}"><text x="0" y="0" font-size="17">${text}</text></symbol>`,
            width: bbox.width,
            height: bbox.height
        };
    }

    let xs: number[] = [];
    let ys: number[] = [];
    let defs: ISystemSVG[] = [];
    let lines: IPoint[][] = [];
    let outOfBounds = false;
    $: if (layout !== undefined) {
        defs = [];
        lines = [];
        xs = [];
        let currx = layout.cellsize;
        while (currx < layout.width) {
            xs.push(currx)
            currx += layout.cellsize;
        }
        ys = [];
        let curry = layout.cellsize;
        while (curry < layout.height) {
            ys.push(curry)
            curry += layout.cellsize;
        }

        // Generate text symbols
        const nameplateGlyph = generateTextSymbol(`${$ship.class} "${$ship.name}"`, "_ssdNameplate");
        defs.push(nameplateGlyph);
        layout.nameplate.factor = nameplateGlyph.width / nameplateGlyph.height;
        layout.nameplate.height = layout.nameplate.width / layout.nameplate.factor;
        if (layout.elements.hasOwnProperty("#nameplate")) {
            layout.elements["#nameplate"].height = layout.nameplate.height;
            layout.elements["#nameplate"].width = layout.nameplate.width;
        } else {
            layout.elements["#nameplate"] = {
                id: "#nameplate",
                height: layout.nameplate.height,
                width: layout.nameplate.width,
                glyphid: "_ssdNameplate",
                x: layout.cellsize,
                y: layout.cellsize
            };
        }

        const statsGlyph = generateTextSymbol(`Mass: ${$ship.mass}, NPV: ${$ship.points}, CPV: ${$ship.cpv}`, "_ssdStats");
        defs.push(statsGlyph);
        layout.stats.factor = statsGlyph.width / statsGlyph.height;
        layout.stats.height = layout.stats.width / layout.stats.factor;
        if (layout.elements.hasOwnProperty("#stats")) {
            layout.elements["#stats"].height = layout.stats.height;
            layout.elements["#stats"].width = layout.stats.width;
        } else {
            layout.elements["#stats"] = {
                id: "#stats",
                height: layout.stats.height,
                width: layout.stats.width,
                glyphid: "_ssdStats",
                x: layout.cellsize,
                y: layout.cellsize
            };
        }

        // Generate fixed system pieces: hull, drive, ftl, core
        const hullArray = formRows($ship);
        let hullCols = hullArray[0].length;
        if ($ship.hull.stealth === "2") {
            hullCols++;
        } else if ( ($ship.hull.stealth === "1") && (hullArray[1].length === hullArray[0].length) ) {
            hullCols++;
        }
        const hullSvg = genSvg($ship, layout.cellsize);
        defs.push({
            id: "_ssdHull",
            svg: hullSvg,
            width: hullCols,
            height: hullArray.length
        });
        if (layout.elements.hasOwnProperty("#hull")) {
            layout.elements["#hull"].height = hullArray.length * layout.cellsize;
            layout.elements["#hull"].width = hullCols * layout.cellsize;
        } else {
            layout.elements["#hull"] = {
                id: "#hull",
                height: hullArray.length * layout.cellsize,
                width: hullCols * layout.cellsize,
                glyphid: "_ssdHull",
                x: layout.cellsize,
                y: layout.cellsize
            };
        }

        const driveRaw = $ship.systems.find(x => x.name === "drive");
        const driveObj = getSystem(driveRaw, $ship);
        defs.push(driveObj.glyph());
        if (! layout.elements.hasOwnProperty("#drive")) {
            layout.elements["#drive"] = {
                id: "#drive",
                glyphid: `svg_${driveObj.glyph().id}`,
                height: layout.cellsize * 2,
                width: layout.cellsize * 2,
                x: layout.cellsize,
                y: layout.cellsize
            };
        } else {
            layout.elements["#drive"].glyphid = `svg_${driveObj.glyph().id}`;
            layout.elements["#drive"].height = layout.cellsize * 2;
            layout.elements["#drive"].width = layout.cellsize * 2;
        }

        const ftlRaw = $ship.systems.find(x => x.name === "ftl");
        if (ftlRaw !== undefined) {
            const ftlObj = getSystem(ftlRaw, $ship);
            defs.push(ftlObj.glyph());
            if (! layout.elements.hasOwnProperty("#ftl")) {
                layout.elements["#ftl"] = {
                    id: "#ftl",
                    glyphid: `svg_${ftlObj.glyph().id}`,
                    height: layout.cellsize * 2,
                    width: layout.cellsize * 2,
                    x: layout.cellsize,
                    y: layout.cellsize
                };
            } else {
                layout.elements["#ftl"].glyphid = `svg_${ftlObj.glyph().id}`;
                layout.elements["#ftl"].height = layout.cellsize * 2;
                layout.elements["#ftl"].width = layout.cellsize * 2;
            }
        } else {
            delete layout.elements["#ftl"];
        }

        const coreGlyph = svgLib.find(x => x.id === "coreSys");
        defs.push(coreGlyph);
        if (! layout.elements.hasOwnProperty("#core")) {
            layout.elements["#core"] = {
                id: "#core",
                glyphid: `svg_${coreGlyph.id}`,
                height: layout.cellsize * 3,
                width: layout.cellsize * 6,
                x: layout.cellsize,
                y: layout.cellsize
            };
        } else {
            layout.elements["#core"].glyphid = `svg_${coreGlyph.id}`;
            layout.elements["#core"].height = layout.cellsize * 3;
            layout.elements["#core"].width = layout.cellsize * 6;
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
                const obj = getSystem(sys, $ship);
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
                        width: svg.width * layout.cellsize,
                        height: svg.height * layout.cellsize,
                        x: layout.cellsize,
                        y: layout.cellsize
                    };
                } else {
                    layout.elements[obj.uid].glyphid = `svg_${svg.id}`;
                    layout.elements[obj.uid].width = svg.width * layout.cellsize;
                    layout.elements[obj.uid].height = svg.height * layout.cellsize;
                }
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
            if ( (layout.elements[key].x < 0) || (layout.elements[key].x > layout.width) ) {
                outOfBounds = true;
                break;
            }
            if ( (layout.elements[key].y < 0) || (layout.elements[key].y > layout.height) ) {
                outOfBounds = true;
                break;
            }
        }

        // Find launcher/magazine combos and draw lines between them
        for (const sys of $ship.ordnance){
            if (sys.name === "salvoLauncher") {
                if ( (sys.hasOwnProperty("magazine")) && (sys.magazine !== undefined) ) {
                    const launchObj = getSystem(sys, $ship);
                    const mag = $ship.systems.find(x => x.id === sys.magazine);
                    if (mag !== undefined) {
                        const magObj = getSystem(mag, $ship);
                        const xLaunch = layout.elements[launchObj.uid].x;
                        const yLaunch = layout.elements[launchObj.uid].y;
                        const wLaunch = launchObj.glyph().width * layout.cellsize;
                        const hLaunch = launchObj.glyph().height * layout.cellsize;
                        const x1 = xLaunch + (wLaunch / 2);
                        const y1 = yLaunch + (hLaunch / 2);

                        const xMag = layout.elements[magObj.uid].x;
                        const yMag = layout.elements[magObj.uid].y;
                        const wMag = magObj.glyph().width * layout.cellsize;
                        const hMag = magObj.glyph().height * layout.cellsize;
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
                const tObj = getSystem(s, $ship);
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
                        const wObj = getSystem(obj, $ship);
                        const xTurret = layout.elements[tObj.uid].x;
                        const yTurret = layout.elements[tObj.uid].y;
                        const wTurret = tObj.glyph().width * layout.cellsize;
                        const hTurret = tObj.glyph().height * layout.cellsize;
                        const x1 = xTurret + (wTurret / 2);
                        const y1 = yTurret + (hTurret / 2);

                        const xWeapon = layout.elements[wObj.uid].x;
                        const yWeapon = layout.elements[wObj.uid].y;
                        const wWeapon = wObj.glyph().width * layout.cellsize;
                        const hWeapon = wObj.glyph().height * layout.cellsize;
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
            if ( (layout.elements[key].x < 0) || (layout.elements[key].x > layout.width) ) {
                layout.elements[key].x = layout.cellsize;
            }
            if ( (layout.elements[key].y < 0) || (layout.elements[key].y > layout.height) ) {
                layout.elements[key].y = layout.cellsize;
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
                maxx = layout.width - bbox.width;
                maxy = layout.height - bbox.height;
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
                    newx = Math.round(parseFloat(dragSelected.getAttribute("x")) / layout.cellsize) * layout.cellsize;
                    newy = Math.round(parseFloat(dragSelected.getAttribute("y")) / layout.cellsize) * layout.cellsize;
                } else {
                    newx = parseFloat(dragSelected.getAttribute("x"));
                    newy = parseFloat(dragSelected.getAttribute("y"));
                }
                if (newx < 0) { newx = 0; }
                if (newx >= layout.width) { newx = layout.width - layout.cellsize; }
                if (newy < 0) { newy = 0;}
                if (newy >= layout.height) { newy = layout.height - layout.cellsize;}
                element.x = newx;
                element.y = newy;
                $ship.layout = layout;
                $ship = $ship;
            }
            findOverlapWith(dragSelected);
            dragSelected = undefined;
            maxx = maxy = undefined;
            exportLayout();
        }
    }

    let usedElements: SVGUseElement[] = [];
    const findOverlapWith = (dropped: SVGUseElement) => {
        const droppedRect = dropped.getBoundingClientRect();
        for (const used of usedElements) {
            if (used.id === dropped.id) { continue; }
            if (used !== undefined) {
                const otherRect = used.getBoundingClientRect();
                if (overlapping(droppedRect, otherRect)) {
                    dropped.classList.add("svgHighlight");
                    used.classList.add("svgHighlight");
                }
            }
        }
    };

    const findAllOverlaps = () => {
        for (const used of usedElements) {
            findOverlapWith(used);
        }
    };

    let pngCanvas: HTMLCanvasElement;
    let secretSvg: SVGSVGElement;
    let nameElement: SVGTextElement;
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
        // let s = `<symbol id="_ssdSystems" viewBox="-1 -1 ${layout.width + 2} ${layout.height + 2}">`;
        // s += `<defs>`;
        // for (const distinct of sysDistinct) {
        //     s += distinct.svg;
        // }
        // s += `</defs>`;
        // for (const line of lines) {
        //     s += `<line x1="${line[0].x}" y1="${line[0].y}" x2="${line[1].x}" y2="${line[1].y}" stroke="black" stroke-width="5" />`;
        // }
        // for (const sys of systems) {
        //     s += `<use id="${sys.id}" href="#svg_${sys.glyph.id}" x="${sys.x * layout.cellsize}" y="${sys.y * layout.cellsize}" width="${sys.glyph.width * layout.cellsize}" height="${sys.glyph.height * layout.cellsize}" />`;
        // }
        // s += `</symbol>`;
        // $ssdComponents.systems = s;
    };
</script>

{#if (layout !== undefined)}
<div class="columns">
    <div class="column">
        <div class="field">
            <label class="label" for="totalWidth">Total width</label>
            <div class="control">
                <input id="totalWidth" class="input" type="number" min="{layout.cellsize}" step="{layout.cellsize}" bind:value="{layout.width}" on:blur="{() => layout = layout}">
            </div>
        </div>
        <div class="field">
            <label class="label" for="totalHeight">Total height</label>
            <div class="control">
                <input id="totalHeight" class="input" type="number" min="{layout.cellsize}" step="{layout.cellsize}" bind:value="{layout.height}" on:blur="{() => layout = layout}">
            </div>
        </div>
        <div class="field">
            <label class="label" for="cellsize">Cell size</label>
            <div class="control">
                <input id="cellsize" class="input" type="number" min="1" bind:value="{layout.cellsize}" on:change="{() => layout = layout}">
            </div>
            <p class="help">Biggest determiner of how much can fit in the SSD. This is the size of the smallest elements (e.g., a single hull box).</p>
        </div>
        <div class="field">
            <label class="label" for="nameWidth">Nameplate width</label>
            <div class="control">
                <input id="nameWidth" class="input" type="number" step="{Math.round(layout.cellsize / 4)}" bind:value="{layout.nameplate.width}" on:change="{() => {layout.nameplate.height = layout.nameplate.width / layout.nameplate.factor; layout = layout}}">
            </div>
            <p class="help">Set to 0 to disable the nameplate.</p>
        </div>
        <div class="field">
            <label class="label" for="statsWidth">Stats block width</label>
            <div class="control">
                <input id="statsWidth" class="input" type="number" step="{Math.round(layout.cellsize / 8)}" bind:value="{layout.stats.width}" on:change="{() => {layout.stats.height = layout.stats.width / layout.stats.factor; layout = layout}}">
            </div>
            <p class="help">Set to 0 to disable the stats block.</p>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" bind:checked="{$snapToGrid}">
                    Snap to grid
                </label>
            </div>
        </div>
    {#if outOfBounds}
        <div class="field">
            <div class="control">
                <button class="button is-danger" on:click="{correctOutOfBounds}">Correct Overflow</button>
            </div>
            <p class="help">There are elements outside of the SSD boundaries. Clicking the button will pull them onto the canvas.</p>
        </div>
    {/if}
        {#key layout}
        <div class="ssd">
            <svg viewBox="-1 -1 {layout.width + 2} {layout.height + 2}" width="100%" height="100%" on:mousedown="{startDrag}" on:mouseup="{endDrag}" on:mousemove="{drag}" on:mouseleave="{endDrag}" on:touchstart="{startDrag}" on:touchmove="{drag}" on:touchend="{endDrag}" on:touchcancel="{endDrag}" bind:this="{svgDisplay}">
                <defs>
                {#each defs as g}
                    {@html g.svg}
                {/each}
                </defs>
                <rect x="0" y="0" width="{layout.width}" height="{layout.height}" fill="none" stroke="black"/>
                <g id="grid">
            {#each xs as x}
                <line x1="{x}" y1="0" x2="{x}" y2="{layout.height}" stroke="#c0c0c0"/>
            {/each}
            {#each ys as y}
                <line x1="0" y1="{y}" x2="{layout.width}" y2="{y}" stroke="#c0c0c0"/>
            {/each}
                </g>

            {#each lines as line}
                <line x1="{line[0].x}" y1="{line[0].y}" x2="{line[1].x}" y2="{line[1].y}" stroke="black" stroke-width="5"/>
            {/each}

            {#each Object.values(layout.elements) as sys, i}
                <use id="{sys.id}" href="#{sys.glyphid}" x="{sys.x}" y="{sys.y}" width="{sys.width}" height="{sys.height}" class="draggable" bind:this="{usedElements[i]}"/>
            {/each}
            </svg>
        </div>
        {/key}
    </div>
</div>

<div class="hidden">
    <canvas width="{layout.width + 2}" height="{layout.height + 2}" bind:this="{pngCanvas}"></canvas>
</div>
{/if}

<div>
    <svg width="1" height="1" bind:this="{secretSvg}"></svg>
</div>

<style>
    .ssd {
        width: 100%;
        height: 30rem;
    }
    .draggable {
        cursor: move;
    }
    .hidden {
        display: none;
    }
    :global(.svgHighlight) {
        fill-opacity: 0.5;
        fill: red;
    }
</style>