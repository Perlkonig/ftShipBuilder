import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Pds extends System {
    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
    }

    fullName() {
        return "Point Defense System";
    }

    mass() {
        return 1;
    }

    points() {
        return 3;
    }

    glyph() {
        return {
            id: "pds",
            svg: `<symbol id="svg_pds" viewBox="378 178 204 204"><circle fill="white" stroke="#000000" stroke-width="15" stroke-miterlimit="10" cx="480" cy="280" r="93.3"/><g><path d="M480,193.3c-27.8,0-52.6,13.1-68.4,33.5L480,280l68.4-53.3C532.6,206.4,507.8,193.3,480,193.3z"/><path d="M480,280l-68.4,53.3c15.9,20.4,40.6,33.5,68.4,33.5s52.6-13.1,68.4-33.5L480,280z"/></g></symbol>`,
            width: 1,
            height: 1
        }
    }
}