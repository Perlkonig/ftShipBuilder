import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Amt extends System {
    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
    }

    fullName() {
        return "Antimatter Missile";
    }

    mass() {
        return 2;
    }

    points() {
        return 10;
    }

    glyph() {
        return {
            id: "amt",
            svg: `<symbol id="svg_amt" viewBox="61 130 298 298"><g><polygon fill="white" stroke="#000000" stroke-width="8" stroke-miterlimit="10" points="239,169.4 210,137.2 181,169.4 181,423 239,423"/><polygon stroke="#000000" stroke-width="8" stroke-miterlimit="10" points="181,218.4 181,267 138.3,267"/><polygon stroke="#000000" stroke-width="8" stroke-miterlimit="10" points="181,313 181,403 99.1,403"/><polygon stroke="#000000" stroke-width="8" stroke-miterlimit="10" points="239,218.4 239,267 281.7,267"/><polygon stroke="#000000" stroke-width="8" stroke-miterlimit="10" points="239,313 239,403 320.9,403"/></g></symbol>`,
            width: 1,
            height: 1
        }
    }
}