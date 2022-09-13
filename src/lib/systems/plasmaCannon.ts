import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc, ArcNum } from "./_base";
import { genArcs } from "../genArcs";

type Class = 1|2|3|4;

export class PlasmaCannon extends System {
    public class: Class = 1;
    public leftArc: Arc = "F";
    public numArcs: ArcNum = 6;

    constructor(data: ISystem, ship: FullThrustShip) {
        super("plasmaCannon", ship);
        if (data.hasOwnProperty("class")) {
            this.class = data.class as Class;
        }
        if (this.class < 1) {
            this.class = 1;
        } else if (this.class > 4) {
            this.class = 4;
        }
        if (data.hasOwnProperty("leftArc")) {
            this.leftArc = data.leftArc as Arc;
        }
        if (data.hasOwnProperty("numArcs")) {
            this.numArcs = data.numArcs as ArcNum;
        }

        if (this.class <= 2) {
            if (this.numArcs < 3) {
                this.numArcs = 3;
                data.numArcs = 3;
            } else if ( (this.numArcs > 3) && (this.numArcs < 6) ) {
                this.numArcs = 3;
            } else if (this.numArcs > 6) {
                this.numArcs = 6;
                data.numArcs = 6;
            }
        }
    }

    fullName() {
        return `Class ${this.class} Plasma Cannon`;
    }

    mass() {
        switch (this.class) {
            case 1:
                if (this.numArcs === 3) {
                    return 1;
                } else {
                    return 2;
                }
            case 2:
                if (this.numArcs === 3) {
                    return 4;
                } else {
                    return 6;
                }
            case 3:
                return 8 + (2 * (this.numArcs - 1));
            case 4:
                return 16 + (4 * (this.numArcs - 1));
        }
    }

    points() {
        return this.mass() * 3;
    }

    glyph() {
        let id = `plasmaCannon${this.class}${this.leftArc}${this.numArcs}`;
        let insert = `<circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="250">${this.class}</text>`;
        let svg = genArcs(id, this.numArcs, this.leftArc, undefined, insert);
        return {
            id,
            svg,
            height: 2,
            width: 2
        }
    }
}