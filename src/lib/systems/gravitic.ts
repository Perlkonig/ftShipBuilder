import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc, ArcNum } from "./_base";
import { genArcs } from "../genArcs";

type Class = 1|2|3;

export class Gravitic extends System {
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
            data.class = 1;
        } else if (this.class > 3) {
            this.class = 3;
            data.class = 3;
        }
        if (data.hasOwnProperty("leftArc")) {
            this.leftArc = data.leftArc as Arc;
        }
        if (data.hasOwnProperty("numArcs")) {
            this.numArcs = data.numArcs as ArcNum;
        }

        if (this.numArcs > 6) {
            this.numArcs = 6;
            data.numArcs = 6;
        }
        if (this.class === 1) {
            this.numArcs = 6;
            // Mutating the original data so the interface works
            data.numArcs = 6;
        } else if (this.class === 2) {
            if (this.numArcs < 3) {
                this.numArcs = 3;
                data.numArcs = 3;
            } else if ( (this.numArcs > 3) && (this.numArcs < 6) ) {
                this.numArcs = 3;
            }
        }
    }

    fullName() {
        return `Class ${this.class} Gravitic Gun`;
    }

    mass() {
        switch (this.class) {
            case 1:
                return 1;
            case 2:
                if (this.numArcs === 3) {
                    return 2;
                } else {
                    return 3;
                }
            case 3:
                return 4 + (this.numArcs - 1);
        }
    }

    points() {
        return this.mass() * 3;
    }

    glyph() {
        let id = `gravitic${this.class}${this.leftArc}${this.numArcs}`;
        let insert = `<circle cx="300" cy="300" r="167.65" fill="black" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="250" stroke="white" fill="white">${this.class}</text>`;
        let svg = genArcs(id, this.numArcs, this.leftArc, undefined, insert);
        return {
            id,
            svg,
            height: 2,
            width: 2
        }
    }
}