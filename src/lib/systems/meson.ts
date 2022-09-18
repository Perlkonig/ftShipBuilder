import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc, ArcNum } from "./_base";
import { genArcs } from "../genArcs";

export class Meson extends System {
    public leftArc: Arc = "F";
    public numArcs: ArcNum = 6;

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("leftArc")) {
            this.leftArc = data.leftArc as Arc;
        }
        if (data.hasOwnProperty("numArcs")) {
            this.numArcs = data.numArcs as ArcNum;
        }

        if (this.numArcs === 2) {
            this.numArcs = 1;
        } else if ( (this.numArcs > 3) && (this.numArcs < 6) ) {
            this.numArcs = 3;
        } else if (this.numArcs > 6) {
            this.numArcs = 6;
            data.numArcs = 6;
        }
    }

    fullName() {
        return `Meson Projector`;
    }

    mass() {
        switch (this.numArcs) {
            case 1:
                return 2;
            case 3:
                return 3;
            case 6:
                return 4;
        }
    }

    points() {
        return this.mass() * 4;
    }

    glyph() {
        const id = `meson${this.leftArc}${this.numArcs}`;
        const insert = `<use href="#_internalMeson" x="87.5" y="87.5" width="425" height="425"/>`;
        const defs = `<symbol id="_internalMeson" viewBox="369 230 225 102"><path d="M370.8,307h218.3c0,0-31.6,83.1-108.7,83.1S370.8,307,370.8,307z"/><rect x="464" y="231" width="30" height="100"/><rect x="449" y="285" width="62" height="15"/></symbol>`;
        let svg = genArcs(id, this.numArcs, this.leftArc, defs, insert);
        return {
            id,
            svg,
            height: 2,
            width: 2
        }
    }
}
