import type { FullThrustShip } from "@/schemas/ship";
import { svgLib } from "./svgLib";

export const formRows = (ship: FullThrustShip): number[][] => {
    const cf = Math.ceil(ship.mass / 20);
    const interval = Math.ceil(ship.hull.points / cf);
    const boxes: number[] = [];
    for (let i = 0; i < ship.hull.points; i++) {
        if ( ((i + 1) % interval === 0) || (i === ship.hull.points - 1) ) {
            boxes.push(1);
        } else {
            boxes.push(0);
        }
    }
    const hullRows: number[][] = [];
    let baselen = Math.floor(ship.hull.points / ship.hull.rows);
    let delta = ship.hull.points % ship.hull.rows;
    for (let i = 0; i < ship.hull.rows; i++) {
        if (baselen > boxes.length) { baselen = boxes.length; }
        const node = boxes.splice(0, baselen);
        if (delta > 0) {
            node.push(...boxes.splice(0, 1));
            delta--;
        }
        hullRows.push(node);
    }
    return hullRows;
};

export const genSvg = (ship: FullThrustShip, cellsize: number, dim: {height: number; width: number} | undefined = undefined): string => {
    const hullRows = formRows(ship);
    let totalHeight: number;
    let totalWidth: number;
    if (dim !== undefined) {
        totalHeight = dim.height;
        totalWidth = dim.width;
    } else {
        let rows = hullRows.length;
        if ( (ship.hasOwnProperty("armour")) && (ship.armour !== undefined) ) {
            rows += ship.armour.length;
        }
        totalHeight = cellsize * rows;

        let cols = hullRows[0].length;
        if (ship.hull.stealth === "2") {
            cols++;
        } else if ( (ship.hull.stealth === "1") && (hullRows[1].length === hullRows[0].length) ) {
            cols++;
        }
        totalWidth = cellsize * cols;
    }

    const blocksHigh = Math.floor(totalHeight / cellsize);
    const svgHull = svgLib.find(x => x.id === "hull")!;
    const svgHullCrew = svgLib.find(x => x.id === "hullCrew")!;
    const svgArmour = svgLib.find(x => x.id === "armour")!;
    const svgStealth = svgLib.find(x => x.id === "stealthHull");
    let s = `<symbol id="_ssdHull" viewBox="-1 -1 ${totalWidth + 2} ${totalHeight + 2}">`;
    s += `<defs>`;
    if (ship.hull.stealth !== "0") {
        s += svgStealth.svg;
    }
    s += svgHull.svg;
    s += svgHullCrew.svg;
    if ( (ship.hasOwnProperty("armour")) && (ship.armour.length > 0) ) {
        s += svgArmour.svg;
    }
    s += `</defs>`;

    // Hull boxes
    hullRows.reverse();
    for (let row = 0; row < hullRows.length; row++) {
        const boxes = hullRows[row];
        const y = (blocksHigh - (row + 1)) * cellsize;
        for (let col = 0; col < boxes.length; col++) {
            const x = col * cellsize;
            let id = "hull";
            let width = svgHull.width * cellsize;
            let height = svgHull.height * cellsize
            if (boxes[col] === 1 ) {
                id = "hullCrew";
                width = svgHullCrew.width * cellsize;
                height = svgHullCrew.height * cellsize
            }
            s += `<use href="#svg_${id}" x="${x}" y="${y}" width="${width}" height="${height}" />`;

        }
        if (
                ( (ship.hull.stealth === "2") &&
                    ( (hullRows.length - (row + 1) === 2) ||
                    (hullRows.length - (row + 1) === 0) ) ) ||
                ( (ship.hull.stealth === "1") &&
                    ( (hullRows.length - (row + 1) === 1)) ) ) {
                s += `<use href="#svg_stealthHull" x="${boxes.length * cellsize}" y="${y}" width="${svgStealth.width * cellsize}" height="${svgStealth.height * cellsize}" />`;
        }
    }

    // Armour circles
    for (let row = 0; row < ship.armour.length; row++) {
        const y = (blocksHigh - (ship.hull.rows + 1) - row) * cellsize;
        for (let col = 0; col < ship.armour[row]; col++) {
            const x = col * cellsize;
            const width = svgArmour.width * cellsize;
            const height = svgArmour.height * cellsize;
            s += `<use href="#svg_armour" x="${x}" y="${y}" width="${width}" height="${height}" />`;
        }
    }
    s += `</symbol>`;
    return s;
}
