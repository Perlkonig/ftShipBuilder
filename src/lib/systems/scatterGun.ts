import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class ScatterGun extends System {
    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
    }

    fullName() {
        return "Scatter Gun";
    }

    mass() {
        return 1;
    }

    points() {
        return 5;
    }

    glyph() {
        return {
            id: "scatterGun",
            svg: `<symbol id="svg_scatterGun" viewBox="270 70 420 420"><polygon fill="white" stroke="#000000" stroke-width="10.099" stroke-miterlimit="10" points="379.9,453.4 279.8,280 379.9,106.6  580.1,106.6 680.2,280 580.1,453.4"/><polygon stroke="#000000" stroke-width="9.6697" stroke-miterlimit="10" points="480,268.2 433.3,187.4 386.7,106.6 480,106.6 573.3,106.6 526.7,187.4"/><polygon stroke="#000000" stroke-width="9.7309" stroke-miterlimit="10" points="379.1,445.1 332.4,363.3 285.8,281.5 379.1,281.5 472.4,281.5 425.7,363.3"/><polygon stroke="#000000" stroke-width="9.7309" stroke-miterlimit="10" points="580.9,445.1 627.6,363.3 674.2,281.5 580.9,281.5 487.6,281.5 534.3,363.3"/></symbol>`,
            width: 1,
            height: 1
        }
    }
}