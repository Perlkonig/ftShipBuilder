<script lang="ts">
    import { Canvg } from "canvg";
    import { afterUpdate, createEventDispatcher, onMount } from "svelte";
    import { hull, systems as sysLib, svgLib } from "ftlibship";
    import type { FullThrustShip, ISystemSVG } from "ftlibship";

    export let ship: FullThrustShip;

    const dispatch = createEventDispatcher();

    // Calculate the size of the hull display.
    // Below a certain threshold, the compact display will be used (drives to the side).
    // Otherwise we'll go with the fully flexible display with the drives in the bottom.
    let hullArray = hull.formRows(ship);

    let hullCols = hullArray[0].length;
    // If there's armour, look for situations where there's more armour than hull columns
    if ( (ship.hasOwnProperty("armour")) && (ship.armour !== undefined) ) {
        hullCols = Math.max(hullCols, ...ship.armour.map(x => x[0] + x[1]));
    }
    if (ship.hull.stealth === "2") {
        hullCols++;
    } else if ( (ship.hull.stealth === "1") && (hullArray.length > 1) && (hullArray[1].length === hullArray[0].length) ) {
        hullCols++;
    }

    let hullRows = hullArray.length;
    if ( (ship.hasOwnProperty("armour")) && (ship.armour !== undefined) ) {
        hullRows += ship.armour.length;
    }
    if (hullRows < 4) {
        hullRows = 4;
    }

    // Get a list of general systems, watching for turrets and magazines
    const systems: sysLib.System[] = [];
    const turrets: sysLib.Turret[] = [];
    const mines: sysLib.MineLayer[] = [];
    const magazines: sysLib.Magazine[] = [];
    for (const s of ship.systems) {
        if ( (s.name === "drive") || (s.name === "ftl") ) {
            continue;
        }
        const obj = sysLib.getSystem(s, ship);
        if (obj.name === "turret") {
            turrets.push(obj as sysLib.Turret);
        } else if (obj.name === "magazine") {
            magazines.push(obj as sysLib.Magazine);
        } else if (obj.name === "mineLayer") {
            mines.push(obj as sysLib.MineLayer);
        } else {
            systems.push(obj);
        }
    }

    // Get a list of ordnance
    const ordnance: sysLib.System[] = [];
    const launchers: sysLib.SalvoLauncher[] = [];
    for (const s of ship.ordnance) {
        const obj = sysLib.getSystem(s, ship);
        if (obj.name === "salvoLauncher") {
            launchers.push(obj as sysLib.SalvoLauncher)
        } else {
            ordnance.push(obj);
        }
    }

    // Get a list of weapons
    const weapons: sysLib.System[] = [];
    for (const s of ship.weapons) {
        const obj = sysLib.getSystem(s, ship);
        weapons.push(obj);
    }

    let compact = false;
    let totalCols = hullCols;
    if (totalCols <= 6) {
        totalCols = 10;
        compact = true;
    }
    if (totalCols % 2 !== 0) {
        totalCols++;
    }

    // We're allocating 2x2 cells for most systems
    // This tells us how many of those cells there are in each row given our width.
    const breakPoint = Math.floor(totalCols / 2);

    let totalRows = 0;
    // name plate
    totalRows += 1.5;
    // general systems
    if (systems.length > 0) {
        // heading
        totalRows++;
        // Allocate 2x2 squares for each system
        const sysRows = Math.ceil(systems.length / breakPoint);
        totalRows += sysRows * 2;
    }
    // mines
    if (mines.length > 0) {
        // heading
        totalRows++;
        let numMines = 0;
        for (const ml of mines) {
            numMines += ml.capacity;
        }
        // These are 1x1 glyphs so...
        const mineRows = Math.ceil(numMines / totalCols);
        totalRows += mineRows;
    }
    // ordnance
    if (ordnance.length > 0) {
        // heading
        totalRows++;
        const ordRows = Math.ceil(ordnance.length / breakPoint);
        totalRows += ordRows * 2;
    }
    // Magazines
    if (magazines.length > 0) {
        for (const m of magazines) {
            // heading
            totalRows++;
            // Find out how many launchers it feeds
            const feeding: sysLib.SalvoLauncher[] = [];
            for (const l of launchers) {
                if (l.magazine === m.id) {
                    feeding.push(l);
                }
            }
            // Add the number of launchers and the number of missiles to determine how many rows are needed
            const numEntries = feeding.length + m.capacity;
            const magRows = Math.ceil(numEntries / breakPoint);
            totalRows += magRows * 2;
        }
    }
    // Weapons
    const turretedIds: Set<string> = new Set();
    if (weapons.length > 0) {
        // heading
        totalRows++;
        // Ignore all turreted weapons, so get a list of those IDs
        for (const t of turrets) {
            for (const w of t.weapons) {
                turretedIds.add(w);
            }
        }
        const freeWeapons: sysLib.System[] = [];
        for (const w of weapons) {
            if (turretedIds.has(w.uid)) {
                continue;
            }
            freeWeapons.push(w);
        }
        const weaponRows = Math.ceil(freeWeapons.length / breakPoint);
        totalRows += weaponRows * 2;
    }
    // Turrets
    if (turrets.length > 0) {
        for (const t of turrets) {
            // heading
            totalRows++;
            const numEntries = t.weapons.length + 1;
            const tRows = Math.ceil(numEntries / breakPoint);
            totalRows += tRows * 2;
        }
    }

    // Hull
    totalRows += hullRows + 2; // 1 for heading, 1 for buffer

    // Stats
    totalRows++;

    // Core systems
    totalRows += 3;

    const svgCore = svgLib.find(x => x.id === "coreSys")!;
    const sysFtl: sysLib.ISystem = ship.systems.find(x => x.name === "ftl");
    let svgFtl: ISystemSVG;
    if (sysFtl !== undefined) {
        svgFtl = sysLib.getSystem(sysFtl, ship).glyph();
    }

    const sysDrive = ship.systems.find(x => x.name === "drive")!;
    const svgDrive = sysLib.getSystem(sysDrive, ship).glyph();

    const sysDistinct: ISystemSVG[] = [];
    for (const set of [systems, turrets, mines, magazines, ordnance, launchers, weapons]) {
        for (const sys of set) {
            const svg = sys.glyph();
            if (svg !== undefined) {
                const idx = sysDistinct.findIndex(x => x.id === svg.id);
                if (idx === -1) {
                    sysDistinct.push(svg);
                }
            }
            if (sys.name === "mineLayer") {
                const glyph = (sys as sysLib.MineLayer).individualMine();
                const idx = sysDistinct.findIndex(x => x.id === glyph.id);
                if (idx === -1) {
                    sysDistinct.push(glyph);
                }
            } else if (sys.name === "magazine") {
                const glyph = (sys as sysLib.Magazine).missileGlyph();
                const idx = sysDistinct.findIndex(x => x.id === glyph.id);
                if (idx === -1) {
                    sysDistinct.push(glyph);
                }
            }
        }
    }

    let nameElement: SVGTextElement;
    onMount(() => {
        if (nameElement !== undefined) {
            var bb = nameElement.getBBox();
            var widthTransform = pxWidth * 0.9 / bb.width;
            var heightTransform = ((cellsize * 1.5) * 0.9) / bb.height;
            var value = widthTransform < heightTransform ? widthTransform : heightTransform;
            if (value !== Infinity) {
                nameElement.setAttribute("transform", "matrix("+value+", 0, 0, "+value+", 0,0)");
                const currx = parseFloat(nameElement.getAttribute("x"));
                const curry = parseFloat(nameElement.getAttribute("y"));
                nameElement.setAttribute("x", (currx / value).toString());
                nameElement.setAttribute("y", (curry / value).toString());
            }
        }
    })

    let injectXlink: boolean;
    let svgDataStr: string;
    let pngDataStr: string;
    let pngCanvas: HTMLCanvasElement;
    afterUpdate(() => {
        if (svgDisplay !== undefined) {
            footerFill.setAttribute("fill", "white")
            const ctx = pngCanvas.getContext("2d");
            let text = svgDisplay.outerHTML;
            text = text.replace(`<svg `, `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" `);
            text = text.replace(`<defs>`, `<defs><st` + `yle type="text/css"><![CDATA[ @import url('https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap'); .futureFont { font-family: "Zen Dots" } .svgInvert { filter: invert(1); } ]]></style>`);
            const v = Canvg.fromString(ctx, text);
            v.render();
            pngDataStr = pngCanvas.toDataURL("image/png");
            footerFill.setAttribute("fill", "black");

            // let text: string;
            if (injectXlink) {
                footerFill.setAttribute("fill", "white")
                text = svgDisplay.outerHTML;
                text = text.replaceAll(`href=`, `xlink:href=`);
                footerFill.setAttribute("fill", "black")
            } else {
                text = svgDisplay.outerHTML;
                text = text.replace(`<svg `, `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" `);
                text = text.replace(`<defs>`, `<defs><st` + `yle type="text/css"><![CDATA[ @import url('https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap'); .futureFont { font-family: "Zen Dots" } .svgInvert { filter: invert(1); } ]]></style>`);
            }
            svgDataStr = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(text);
        }
    });

    interface IBuffer {
        xOffset: number;
        yOffset: number;
        width: number;
        height: number;
    }

    const buffInSquare = (glyph: ISystemSVG, size: number, graded: boolean = true): IBuffer => {
        if ( (graded) && (glyph.width === 1) && (glyph.height === 1) ) {
            return {
                xOffset: size / 4,
                yOffset: size / 4,
                width: size / 2,
                height: size / 2
            };
        } else {
            const factor = 0.9;
            return {
                xOffset: (size * (1 - factor)) / 2,
                yOffset: (size * (1 - factor)) / 2,
                width: size * factor,
                height: size * factor
            };
        }
    }

    const cellsize = 50;
    let svgDisplay: SVGSVGElement;
    const pxWidth = totalCols * cellsize;
    const pxHeight = totalRows * cellsize;

    let svgBody = "";
    // name plate is in the main body, so we start our calculations at row 2
    let currRow = 1.5;

    // systems
    if (systems.length > 0) {
        // name plate
        svgBody += `<rect x="0" y="${currRow * cellsize}" width="${pxWidth}" height="${cellsize}" stroke="none" fill="#c0c0c0"/><text x="${cellsize * 0.2}" y="${(currRow * cellsize) + (cellsize / 2)}" dominant-baseline="middle" font-size="${cellsize / 2}" class="futureFont">Systems</text>`;
        currRow++;
        const sorted = [...systems].sort((a, b) => {
            if (a.name === b.name) {
                return a.fullName().localeCompare(b.fullName());
            } else {
                return a.name.localeCompare(b.name);
            }
        });
        for (let i = 0; i < sorted.length; i++) {
            const realRow = Math.floor(i / breakPoint);
            const realCol = i % breakPoint;
            const sys = sorted[i];
            const buff = buffInSquare(sys.glyph(), cellsize * 2, true);
            svgBody += `<use id="${sys.uid}" href="#svg_${sys.glyph().id}" x="${((realCol * 2) * cellsize) + buff.xOffset}" y="${((currRow + (realRow * 2)) * cellsize) + buff.yOffset}" width="${buff.width}" height="${buff.height}" />`;
        }
        currRow += Math.ceil(sorted.length / breakPoint) * 2;
    }

    // Mines
    if (mines.length > 0) {
        // name plate
        svgBody += `<rect x="0" y="${currRow * cellsize}" width="${pxWidth}" height="${cellsize}" stroke="none" fill="#c0c0c0"/><text x="${cellsize * 0.2}" y="${(currRow * cellsize) + (cellsize / 2)}" dominant-baseline="middle" font-size="${cellsize / 2}" class="futureFont">Mines</text>`;
        currRow++;
        let numMines = 0;
        for (const s of mines) {
            numMines += s.capacity;
        }
        for (let i = 0; i < numMines; i++) {
            const realRow = Math.floor(i / totalCols);
            const realCol = i % totalCols;
            const buff = buffInSquare(mines[0].individualMine(), cellsize, false);
            svgBody += `<use href="#svg_mineIndividual" x="${(realCol * cellsize) + buff.xOffset}" y="${((currRow + realRow) * cellsize) + buff.yOffset}" width="${buff.width}" height="${buff.height}" />`;
        }
        currRow += Math.ceil(numMines / totalCols);
    }

    // Ordnance
    if (ordnance.length > 0) {
        // name plate
        svgBody += `<rect x="0" y="${currRow * cellsize}" width="${pxWidth}" height="${cellsize}" stroke="none" fill="#c0c0c0"/><text x="${cellsize * 0.2}" y="${(currRow * cellsize) + (cellsize / 2)}" dominant-baseline="middle" font-size="${cellsize / 2}" class="futureFont">Ordnance</text>`;
        currRow++;
        const sorted = [...ordnance].sort((a, b) => {
            if (a.name === b.name) {
                return a.fullName().localeCompare(b.fullName());
            } else {
                return a.name.localeCompare(b.name);
            }
        });
        for (let i = 0; i < sorted.length; i++) {
            const realRow = Math.floor(i / breakPoint);
            const realCol = i % breakPoint;
            const sys = sorted[i];
            const buff = buffInSquare(sys.glyph(), cellsize * 2, true);
            svgBody += `<use id="${sys.uid}" href="#svg_${sys.glyph().id}" x="${((realCol * 2) * cellsize) + buff.xOffset}" y="${((currRow + (realRow * 2)) * cellsize) + buff.yOffset}" width="${buff.width}" height="${buff.height}" />`;
        }

        currRow += Math.ceil(sorted.length / breakPoint) * 2;
    }

    // Magazines
    if (magazines.length > 0) {
        for (const mag of magazines) {
            // name plate
            svgBody += `<rect x="0" y="${currRow * cellsize}" width="${pxWidth}" height="${cellsize}" stroke="none" fill="#c0c0c0"/><text x="${cellsize * 0.2}" y="${(currRow * cellsize) + (cellsize / 2)}" dominant-baseline="middle" font-size="${cellsize / 2}" class="futureFont">Magazine</text>`;
            currRow++;
            const feeding: sysLib.SalvoLauncher[] = [];
            for (const l of launchers) {
                if (l.magazine === mag.id) {
                    feeding.push(l);
                }
            }
            for (let i = 0; i < feeding.length; i++) {
                const realRow = Math.floor(i / breakPoint);
                const realCol = i % breakPoint;
                const sys = feeding[i];
                const buff = buffInSquare(sys.glyph(), cellsize * 2, true);
                svgBody += `<use id="${sys.uid}" href="#svg_${sys.glyph().id}" x="${((realCol * 2) * cellsize) + buff.xOffset}" y="${((currRow + (realRow * 2)) * cellsize) + buff.yOffset}" width="${buff.width}" height="${buff.height}" />`;
            }
            for (let i = 0; i < mag.capacity; i++) {
                const realI = i + feeding.length;
                const realRow = Math.floor(realI / breakPoint);
                const realCol = realI % breakPoint;
                const glyph = mag.missileGlyph();
                const buff = buffInSquare(glyph, cellsize * 2, false);
                svgBody += `<use href="#svg_${glyph.id}" x="${((realCol * 2) * cellsize) + buff.xOffset}" y="${((currRow + (realRow * 2)) * cellsize) + buff.yOffset}" width="${buff.width}" height="${buff.height}" />`;
            }

            currRow += Math.ceil((feeding.length + mag.capacity) / breakPoint) * 2;
        }
    }

    // Weapons
    if (weapons.length > 0) {
        const freeWeapons: sysLib.System[] = [];
        for (const w of weapons) {
            if (! turretedIds.has(w.uid)) {
                freeWeapons.push(w);
            }
        }
        if (freeWeapons.length > 0) {
            // name plate
            svgBody += `<rect x="0" y="${currRow * cellsize}" width="${pxWidth}" height="${cellsize}" stroke="none" fill="#c0c0c0"/><text x="${cellsize * 0.2}" y="${(currRow * cellsize) + (cellsize / 2)}" dominant-baseline="middle" font-size="${cellsize / 2}" class="futureFont">Weapons</text>`;
            currRow++;

            const sorted = [...freeWeapons].sort((a, b) => {
                if (a.name === b.name) {
                    return a.fullName().localeCompare(b.fullName());
                } else {
                    return a.name.localeCompare(b.name);
                }
            });
            for (let i = 0; i < sorted.length; i++) {
                const realRow = Math.floor(i / breakPoint);
                const realCol = i % breakPoint;
                const sys = sorted[i];
                const buff = buffInSquare(sys.glyph(), cellsize * 2, true);
                svgBody += `<use id="${sys.uid}" href="#svg_${sys.glyph().id}" x="${((realCol * 2) * cellsize) + buff.xOffset}" y="${((currRow + (realRow * 2)) * cellsize) + buff.yOffset}" width="${buff.width}" height="${buff.height}" />`;
            }

            currRow += Math.ceil(sorted.length / breakPoint) * 2;
        }
    }

    // Turrets
    if (turrets.length > 0) {
        for (const turret of turrets) {
            // name plate
            svgBody += `<rect x="0" y="${currRow * cellsize}" width="${pxWidth}" height="${cellsize}" stroke="none" fill="#c0c0c0"/><text x="${cellsize * 0.2}" y="${(currRow * cellsize) + (cellsize / 2)}" dominant-baseline="middle" font-size="${cellsize / 2}" class="futureFont">Turret</text>`;
            currRow++;
            const hosting: sysLib.System[] = [];
            for (const w of weapons) {
                if (turret.weapons.includes(w.uid)) {
                    hosting.push(w);
                }
            }
            // First add the turret glyph
            const buff = buffInSquare(turret.glyph(), cellsize * 2, true);
            svgBody += `<use id="${turret.uid}" href="#svg_${turret.glyph().id}" x="${buff.xOffset}" y="${(currRow * cellsize) + buff.yOffset}" width="${buff.width}" height="${buff.height}" />`;

            for (let i = 0; i < turret.weapons.length; i++) {
                const realI = i + 1;
                const realRow = Math.floor(realI / breakPoint);
                const realCol = realI % breakPoint;
                const weapon = weapons.find(x => x.uid === turret.weapons[i]);
                const glyph = weapon.glyph();
                const buff = buffInSquare(glyph, cellsize * 2, false);
                svgBody += `<use id="${weapon.uid}" href="#svg_${glyph.id}" x="${((realCol * 2) * cellsize) + buff.xOffset}" y="${((currRow + (realRow * 2)) * cellsize) + buff.yOffset}" width="${buff.width}" height="${buff.height}" />`;
            }

            currRow += Math.ceil((turret.weapons.length + 1) / breakPoint) * 2;
        }
    }

    // Hull
    // name plate
    svgBody += `<rect x="0" y="${currRow * cellsize}" width="${pxWidth}" height="${cellsize}" stroke="none" fill="#c0c0c0"/><text x="${cellsize * 0.2}" y="${(currRow * cellsize) + (cellsize / 2)}" dominant-baseline="middle" font-size="${cellsize / 2}" class="futureFont">Hull</text>`;
    currRow++;

    const hullStart = currRow;
    svgBody += `<use id="_hull" href="#_ssdHull" x="0" y="${currRow * cellsize}" width="${hullCols * cellsize}" height="${hullRows * cellsize}" />`;
    currRow += hullRows + 1;

    // Stats
    svgBody += `<rect x="0" y="${currRow * cellsize}" width="${pxWidth}" height="${cellsize}" stroke="none" fill="#c0c0c0"/><text x="${cellsize * 0.2}" y="${(currRow * cellsize) + (cellsize / 2)}" dominant-baseline="middle" font-size="${cellsize / 2}" class="futureFont">Mass: ${ship.mass} NPV: ${ship.points} CPV: ${ship.cpv}</text>`;
    currRow++;

    // Drives & Core
    // Background fill now in the SVG itself so I can change it programmatically.
    let svgCombined: string;
    if (compact) {
        if (svgFtl !== undefined) {
            svgBody += `<use id="_ftl" href="#svg_${svgFtl.id}" x="${pxWidth - (cellsize * 3)}" y="${hullStart * cellsize}" width="${cellsize * 2}" height="${cellsize * 2}" />`;
        }
        svgBody += `<use id="_drive" href="#svg_${svgDrive.id}" x="${pxWidth - (cellsize * 3)}" y="${(hullStart + 2) * cellsize}" width="${cellsize * 2}" height="${cellsize * 2}" />`;
        svgBody += `<use id="_core" href="#svg_${svgCore.id}" x="${pxWidth * 0.05}" y="${(currRow * cellsize) + ((cellsize * 3) * 0.05)}" width="${pxWidth * 0.9}" height="${(cellsize * 3) * 0.9}" class="svgInvert" />`;
    } else {
        svgCombined = "";
        let startX = 0;
        let groupWidth = 9;
        if (svgFtl !== undefined) {
            svgCombined += `<use id="_ftl" href="#svg_${svgFtl.id}" x="0" y="0" width="${cellsize * 2}" height="${cellsize * 2}" />`;
            startX = cellsize * 2;
            groupWidth += 2;
        }
        svgCombined += `<use id="_drive" href="#svg_${svgDrive.id}" x="${startX}" y="0" width="${cellsize * 2}" height="${cellsize * 2}" />`;
        svgCombined += `<use id="_core" href="#svg_${svgCore.id}" x="${startX + (cellsize * 3)}" y="0" width="${cellsize * 6}" height="${cellsize * 2}" />`;
        svgCombined += `<symbol id="_internalLinearCombined" viewBox="-1 -1 ${(groupWidth * cellsize) + 2} ${(cellsize * 2) + 2}">` + svgCombined + `</symbol>`
        svgBody += `<use href="#_internalLinearCombined" x="0" y="${currRow * cellsize}" height="${cellsize * 3}" width="${pxWidth}" class="svgInvert" />`;
    }

    let ssdDiv: HTMLDivElement;
    let ssdHeight = 30;
    const enlarge = () => {
        ssdHeight+=2;
    }
    const shrink = () => {
        ssdHeight--;
    }
    $: if (ssdDiv !== undefined) {
        ssdDiv.style.height = `${ssdHeight}rem`;
    }

    let footerFill: SVGRectElement;
</script>

{#key ssdHeight}
<div class="ssd" bind:this="{ssdDiv}">
    <svg bind:this="{svgDisplay}" viewBox="-1 -1 {pxWidth + 2} {pxHeight + 2}" width="100%" height="100%">
        <!-- Add distinct symbol to <defs>-->
        <defs>
            {@html hull.genSvg(ship, cellsize)}
        {#if svgFtl !== undefined}
            {@html svgFtl.svg}
        {/if}
            {@html svgDrive.svg}
            {@html svgCore.svg}
        {#each sysDistinct as symbol}
            {@html symbol.svg}
        {/each}
        {#if svgCombined !== undefined}
            {@html svgCombined}
        {/if}
        </defs>

        <!-- SSD background so the PNG comes out correctly -->
        <rect x="0" y="0" height="{pxHeight}" width="{pxWidth}" stroke="none" fill="white"/>

        <!-- Name plate can go here so it can be autosized, but the rest is in the <script> tag -->
        <text bind:this="{nameElement}" x="{cellsize * 0.2}" y="{cellsize * 0.75}" dominant-baseline="middle" font-size="{cellsize}" class="futureFont">{ship.class} "{ship.name}"</text>

        <rect x="0" y="{(totalRows - 3) * cellsize}" width="{pxWidth}" height="{cellsize * 3}" stroke="none" fill="black" bind:this="{footerFill}"/>

        <!-- The body was generated in the <script> section for reasons. Insert it here wholesale.-->
        {@html svgBody}

        <!-- SSD outline, done last so it overlaps the heading backgrounds. -->
        <rect x="0" y="0" height="{pxHeight}" width="{pxWidth}" stroke="black" fill="none" stroke-width="2"/>
    </svg>
</div>
{/key}

<div class="level paddingTop">
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
        <button class="button" on:click="{enlarge}"><i class="fa-solid fa-plus"></i></button>
        &emsp;
        <button class="button" on:click="{shrink}"><i class="fa-solid fa-minus"></i></button>
    </div>
    <div class="level-item">
        <a href="{pngDataStr}" download="SSD.png">
            <button class="button">Download PNG</button>
        </a>
    </div>
</div>

<div class="content">
    <p>
        Layout inspired by <a href="https://zacgaming.wordpress.com/2021/05/02/ssd_templates/">Zac</a>. Font is <a href="https://fonts.google.com/specimen/Zen+Dots">Zen Dots</a>. The exported SVG will render properly in a browser, but the "adjusted" SVG and the PNG will not show the correct font or inverted footer. If desired, you can use the +/- buttons to make the image the largest possible size for a screen capture.
    </p>
</div>

<div class="hidden">
    <canvas width="{pxWidth + 2}" height="{pxHeight + 2}" bind:this="{pngCanvas}"></canvas>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Zen+Dots&display=swap');
    .ssd {
        height: 30rem;
        width: 100%;
    }
    :global(.futureFont) {
        font-family: "Zen Dots";
    }
    :global(.svgInvert) {
        filter: invert(1);
    }
    .hidden {
        display: none;
    }
    .paddingTop {
        padding-top: 1rem;
    }
</style>
