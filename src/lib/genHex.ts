type Arc = "F" | "FS" | "AS" | "A" | "AP" | "FP";
interface IPoint { x: number; y: number }

const lefts = new Map<Arc, number>([
    ["F", 240],
    ["FS", 300],
    ["AS", 0],
    ["A", 60],
    ["AP", 120],
    ["FP", 180]
]);
const rights = new Map<Arc, number>([
    ["F", 300],
    ["FS", 0],
    ["AS", 60],
    ["A", 120],
    ["AP", 180],
    ["FP", 240]
]);

// These values are hard coded to produce 600x600 final glyphs
const rInner = 206.1;
const rOuter = 283;
const size = Math.round((rOuter * 2) / 100) * 100;

export const genHex = (id: string, numArcs: number = 1, leftArc: Arc, defs: string | undefined = undefined, terminal: string | undefined = undefined) => {
    if (numArcs === 6) {
        const allLines: IPoint[][] = [];
        for (const arc of lefts.keys()) {
            const line = genLine(arc);
            if (line !== undefined) {
                allLines.push(line);
            }
        }
        return genSvg(id, allLines, undefined, defs, terminal);
    } else {
        const arcs = arcList(leftArc, numArcs);
        const end = arcs[arcs.length - 1];
        const lines: IPoint[][] = [];
        for (const arc of arcs) {
            const line = genLine(arc);
            if (line !== undefined) {
                lines.push(line);
            } else {
                console.log(`Could not generate a line for ${arc}`);
            }
        }
        const lastLine = genLine(end, "R");
        if (lastLine !== undefined) {
            lines.push(lastLine);
        } else {
            console.log(`Could not generate a line for ${end}`);
        }
        return genSvg(id, lines, genPath(arcs), defs, terminal)
    }
};

const deg2rad = (deg: number) => { return deg * Math.PI / 180; }

const arcpt = (cx: number, cy: number, r: number, angle: number): IPoint => {
    const x = cx + (r * Math.cos(angle));
    const y = cy + (r * Math.sin(angle));
    return {x, y};
}

const genSvg = (id: string, lines: IPoint[][], path: string | undefined = undefined, defs: string | undefined = undefined, terminal: string | undefined = undefined): string => {
    let s = `<symbol id="svg_${id}" viewBox="-1 -1 ${size + 2} ${size + 2}">`;
    if (defs !== undefined) {
        s += `<defs>${defs}</defs>`;
    }
    s += `<rect x="0" y="0" width="${size}" height="${size}" fill="white" />`;
    if (path === undefined) {
        const pointsOuter: string[] = [];
        for (const deg of [60, 120, 180, 240, 300, 360]) {
            const pt = arcpt(size / 2, size / 2, rOuter, deg2rad(deg));
            pointsOuter.push(`${pt.x},${pt.y}`);
        }
        s += `<polygon points="${pointsOuter.join(" ")}" fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10"/>`
    }
    const pointsInner: string[] = [];
    for (const deg of [60, 120, 180, 240, 300, 360]) {
        const pt = arcpt(size / 2, size / 2, rInner, deg2rad(deg));
        pointsInner.push(`${pt.x},${pt.y}`);
    }
    s += `<polygon points="${pointsInner.join(" ")}" fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10"/>`
    for (const line of lines) {
        s += `<line x1="${line[0].x}" y1="${line[0].y}" x2="${line[1].x}" y2="${line[1].y}" stroke-width="20" stroke-miterlimit="10" stroke="black" />`;
    }
    if (path !== undefined) {
        s += path;
    }
    if (terminal !== undefined) {
        s += terminal;
    }
    s += `</symbol>`;
    return s;
}

const genLine = (arc: Arc, side: "L"|"R" = "L"): [IPoint, IPoint] | undefined => {
    let deg: number | undefined;
    if (side === "L") {
        deg = lefts.get(arc);
    } else {
        deg = rights.get(arc);
    }
    if (deg !== undefined) {
        const ptOuter = arcpt(size / 2, size / 2, rOuter, deg2rad(deg));
        const ptInner = arcpt(size / 2, size / 2, rInner, deg2rad(deg));
        return [ptOuter, ptInner];
    } else {
        console.log(`Could not get degrees for ${arc}${side}`);
    }
    return undefined;
}

const arcList = (start: Arc, dist: number): Arc[] => {
    const list = [start];
    for (let i = 1; i < dist; i++) {
        const next = nextArc(start, i);
        if (next !== undefined) {
            list.push(next);
        }
    }
    return list;
}

const nextArc = (start: Arc, dist: number): Arc | undefined => {
    let deg = lefts.get(start);
    if (deg !== undefined) {
        let newdeg = deg + (dist * 60);
        while (newdeg >= 360) {
            newdeg -= 360;
        }
        const next = [...lefts.entries()].find(kv => kv[1] === newdeg);
        if (next !== undefined) {
            return next[0];
        } else {
            console.log(`Could not find the next arc: ${start} + ${dist}, ${deg} -> ${newdeg}`);
        }
    } else {
        console.log(`Could not get degrees for starting arc ${start}`);
    }
    return undefined;
}

const genPath = (arcs: Arc[]): string | undefined => {
    const points: string[] = [];
    for (const arc of arcs) {
        const deg = lefts.get(arc)!;
        const pt = arcpt(size / 2, size / 2, rOuter, deg2rad(deg));
        points.push(`${pt.x},${pt.y}`);
    }
    const finalDeg = rights.get(arcs[arcs.length - 1])!;
    const finalPt = arcpt(size / 2, size / 2, rOuter, deg2rad(finalDeg));
    points.push(`${finalPt.x},${finalPt.y}`);
    return `<polyline points="${points.join(" ")}" stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" />`;
}
