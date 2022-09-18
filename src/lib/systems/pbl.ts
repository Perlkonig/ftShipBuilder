import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc, ArcNum } from "./_base";
import { genArcs } from "../genArcs";

type Class = 1|2|3|4|5|6;

export class Pbl extends System {
    public class: Class = 1;
    public leftArc: Arc = "F";
    public numArcs: ArcNum = 1;
    public modifier: "none" | "short" | "long" = "none";

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("class")) {
            this.class = data.class as Class;
        }
        if (data.hasOwnProperty("leftArc")) {
            this.leftArc = data.leftArc as Arc;
        }
        if (data.hasOwnProperty("numArcs")) {
            this.numArcs = data.numArcs as ArcNum;
        }

        if (this.numArcs > 3) {
            this.numArcs = 3;
            data.numArcs = 3;
        }

        if (this.class < 1) {
            this.class = 1;
            data.class = 1;
        } else if (this.class > 6) {
            this.class = 6;
            data.class = 6;
        }

    }

    fullName() {
        return `Class ${this.class} Plasma Bolt Launcher`;
    }

    mass() {
        switch (this.class) {
            case 1:
                return 3 + (this.numArcs - 1);
            case 2:
                return 6 + (2 * (this.numArcs - 1));
            case 3:
                return 9 + (3 * (this.numArcs - 1));
            case 4:
                return 12 + (4 * (this.numArcs - 1));
            case 5:
                return 15 + (5 * (this.numArcs - 1));
            case 6:
                return 18 + (6 * (this.numArcs - 1));
        }
    }

    points() {
        return this.mass() * 3;
    }

    glyph() {
        const id = `pbl${this.class}${this.leftArc}${this.numArcs}`;
        const insert = `<use href="#_internalPbl" x="50" y="50" width="500" height="500" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="250" stroke="black" fill="black">${this.class}</text>`;
        const defs = `<symbol id="_internalPbl" viewBox="344 155 272 284"><polygon fill="white" stroke="#000000" stroke-width="12" stroke-miterlimit="10" points="480,165.5 511.3,201.1 557.5,190.7 561.9,237.8 605.4,256.6 581.3,297.4 605.4,338.1 561.9,356.9 557.5,404 511.3,393.7 480,429.2 448.7,393.7 402.5,404 398.1,356.9 354.6,338.1 378.7,297.4 354.6,256.6 398.1,237.8 402.5,190.7 448.7,201.1"/></symbol>`;
        let svg = genArcs(id, this.numArcs, this.leftArc, defs, insert);
        svg = svg.replace(`<circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/>`, "");
        return {
            id,
            svg,
            height: 2,
            width: 2
        }
    }
}