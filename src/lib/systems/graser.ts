import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc, ArcNum, IGlyph } from "./_base";
import { genArcs } from "../genArcs";

type Class = 1|2|3|4;

export class Graser extends System {
    public class: Class = 1;
    public leftArc: Arc = "F";
    public numArcs: ArcNum = 6;
    public heavy = false;
    public highIntensity = false;

    constructor(data: ISystem, ship: FullThrustShip) {
        super("graser", ship);
        if (data.hasOwnProperty("heavy")) {
            this.heavy = data.heavy as boolean;
        }
        if (data.hasOwnProperty("highIntensity")) {
            this.highIntensity = data.highIntensity as boolean;
        }

        if (data.hasOwnProperty("class")) {
            this.class = data.class as Class;
        }
        if (this.class < 1) {
            this.class = 1;
        } else if (this.class > 4) {
            this.class = 4;
        }
        if ( (this.heavy) && (this.class > 3) ) {
            this.class = 3;
            data.class = 3;
        }

        if (data.hasOwnProperty("leftArc")) {
            this.leftArc = data.leftArc as Arc;
        }
        if (data.hasOwnProperty("numArcs")) {
            this.numArcs = data.numArcs as ArcNum;
        }

        // validate arcs
        if (this.class === 1) {
            if (this.heavy) {
                if (this.numArcs === 2) {
                    this.numArcs = 3;
                } else if ( (this.numArcs > 3) && (this.numArcs < 6) ) {
                    this.numArcs = 6;
                } else if (this.numArcs > 6) {
                    this.numArcs = 6;
                    data.numArcs = 6;
                }
            } else {
                if (this.numArcs < 3) {
                    this.numArcs = 3;
                    data.numArcs = 3;
                } else if ( (this.numArcs > 3) && (this.numArcs < 6) ) {
                    this.numArcs = 6;
                } else if (this.numArcs > 6) {
                    this.numArcs = 6;
                    data.numArcs = 6;
                }
            }
        } else if ( (this.class === 2) && (! this.heavy) ) {
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
        return `Class ${this.class} ${this.heavy ? "Heavy " : ""}${this.highIntensity ? "High-Intensity " : ""}Graser`;
    }

    mass() {
        if (this.heavy) {
            if (this.class === 1) {
                if (this.numArcs === 1) {
                    return 2;
                } else if (this.numArcs === 3) {
                    return 3;
                } else {
                    return 4;
                }
            } else if (this.class === 2) {
                return 9 + (3 * (this.numArcs - 1));
            } else {
                return 24 + (6 * (this.numArcs - 1));
            }
        } else {
            if (this.class === 1) {
                if (this.numArcs === 3) {
                    return 1;
                } else {
                    return 2;
                }
            } else if (this.class === 2) {
                if (this.numArcs === 3) {
                    return 4;
                } else {
                    return 6;
                }
            } else if (this.class === 3) {
                return 8 + (2 * (this.numArcs - 1));
            } else {
                return 16 + (4 * (this.numArcs - 1));
            }
        }
    }

    points() {
        if (this.highIntensity) {
            return this.mass() * 4;
        } else {
            return this.mass() * 3;
        }
    }

    glyph() {
        let id = `graser${this.class}${this.leftArc}${this.numArcs}`;
        let insert = `<text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300" stroke="white" fill="white">${this.class}</text>`;
        if ( (this.heavy) && (this.highIntensity) ) {
            id = `graser${this.class}HeavyHI${this.leftArc}${this.numArcs}`;
            insert = `<polygon points="300,506.1 478.48783571997280509800334549218,196.95 121.51216428002719490199665450782,196.95" stroke="black" fill="#808080" />` + insert;
        } else if (this.heavy) {
            id = `graser${this.class}Heavy${this.leftArc}${this.numArcs}`;
            insert = `<polygon points="300,506.1 478.48783571997280509800334549218,196.95 121.51216428002719490199665450782,196.95" stroke="black" fill="black" />` + insert;
        }
        let svg = genArcs(id, this.numArcs, this.leftArc, undefined, insert);
        if (! this.heavy) {
            // Fill the inner circle with black
            svg = svg.replace(`<circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/>`, `<circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/>`);
        }
        return {
            id,
            svg,
            height: 2,
            width: 2
        }
    }
}
