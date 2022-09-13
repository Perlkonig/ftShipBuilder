import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc, ArcNum } from "./_base";
import { genArcs } from "../genArcs";

export class Fusion extends System {
    public leftArc: Arc = "F";
    public numArcs: ArcNum = 1;

    constructor(data: ISystem, ship: FullThrustShip) {
        super("fusion", ship);
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
    }

    fullName() {
        return `Fusion Array`;
    }

    mass() {
        return 3 + (this.numArcs - 1);
    }

    points() {
        return this.mass() * 3;
    }

    glyph() {
        const id = `fusion${this.leftArc}${this.numArcs}`;
        const insert = `<use href="#_internalFusion" x="162.5" y="162.5" width="275" height="275" />`;
        const defs = `<symbol id="_internalFusion" viewBox="372 191 221 179"><path fill="white" stroke="#000000" stroke-width="9" stroke-miterlimit="10" d="M587.5,210.3c0-7.6-6.2-13.8-13.8-13.8H391.3c-7.6,0-13.8,6.2-13.8,13.8v140.4c0,7.6,6.2,13.8,13.8,13.8h182.4c7.6,0,13.8-6.2,13.8-13.8V210.3z"/><path fill="white" stroke="#000000" stroke-width="9" stroke-miterlimit="10" d="M568.5,222.8c0-6.2-5-11.3-11.3-11.3H407.8c-6.2,0-11.3,5-11.3,11.3v115.5c0,6.2,5,11.3,11.3,11.3h149.5c6.2,0,11.3-5,11.3-11.3V222.8z"/></symbol>`;
        let svg = genArcs(id, this.numArcs, this.leftArc, defs, insert);
        return {
            id,
            svg,
            height: 2,
            width: 2
        }
    }
}