import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc } from "./_base";
import { genArcs } from "../genArcs";

export class Mkp extends System {
    public arc: Arc = "F";

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("arc")) {
            this.arc = data.arc as Arc;
        }
    }

    fullName() {
        return "Multiple Kinetic Penetrator";
    }

    mass() {
        return 1;
    }

    points() {
        return 4;
    }

    glyph() {
        const id = `mkp${this.arc}`;
        const insert = `<use href="#_internalMkp" x="150" y="150" width="300" height="300"/>`;
        const defs = `<symbol id="_internalMkp" viewBox="290 92 380 380"><g><polygon fill="white" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="401.7,467.5 323.5,331.5 401.7,195.5  558.3,195.5 636.5,331.5 558.3,467.5"/><polygon stroke="#000000" stroke-miterlimit="10" points="480,329.3 556.9,94.5 403.1,94.5 480,329.3 556.9,94.5 403.1,94.5"/></g></symbol>`;
        let svg = genArcs(id, 1, this.arc, defs, insert);
        return {
            id,
            svg,
            height: 2,
            width: 2
        }
    }
}