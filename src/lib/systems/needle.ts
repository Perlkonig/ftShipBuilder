import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc, ArcNum } from "./_base";
import { genArcs } from "../genArcs";

type Class = 1|2|3|4;

export class Needle extends System {
    public class: Class = 1;
    public leftArc: Arc = "F";
    public numArcs: ArcNum = 6;

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
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

        if (this.numArcs > 3) {
            this.numArcs = 3;
            data.numArcs = 3;
        }

        if (this.class === 1) {
            if (this.numArcs < 2) {
                this.numArcs = 2;
                data.numArcs = 2;
            }
        }
    }

    fullName() {
        return `Class ${this.class} Needle Beam`;
    }

    mass() {
        switch (this.class) {
            case 1:
                if (this.numArcs === 2) {
                    return 2;
                } else {
                    return 3;
                }
            case 2:
                return 4 + (2 * (this.numArcs - 1));
            case 3:
                return 8 + (4 * (this.numArcs - 1));
            case 4:
                return 16 + (8 * (this.numArcs - 1));
        }
    }

    points() {
        return this.mass() * 3;
    }

    glyph() {
        const roman = ["I", "II", "III", "IV"];
        const id = `needle${this.class}${this.leftArc}${this.numArcs}`;
        const insert = `<text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200" stroke="white" fill="white">${roman[this.class - 1]}</text>`;
        let svg = genArcs(id, this.numArcs, this.leftArc, undefined, insert);
        // Fill the inner circle with black
        svg = svg.replace(`<circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/>`, `<circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/>`);
        return {
            id,
            svg,
            height: 2,
            width: 2
        }
    }
}