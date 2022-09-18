import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Ortillery extends System {
    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
    }

    fullName() {
        return "Ortillery System";
    }

    mass() {
        return 3;
    }

    points() {
        return 9;
    }

    glyph() {
        return {
            id: "ortillery",
            svg: `<symbol id="svg_ortillery" viewBox="347.5 200 265 265"><polygon fill="white" stroke="#000000" stroke-width="9" stroke-miterlimit="10" points="480,449.8 437.7,330 395.4,210.3 480,210.3 564.6,210.3 522.3,330"/><polygon points="508,276 521.5,259.8 508,266 451,266 437.5,259.8 451,276 472,276 472,283 456,283 456,345 480,362 503,345 503,283 488,283 488,276"/></symbol>`,
            height: 2,
            width: 2
        }
    }
}