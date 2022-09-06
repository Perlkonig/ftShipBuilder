import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Grapeshot extends System {
    constructor(_data: ISystem, ship: FullThrustShip) {
        super("grapeshot", ship);
    }

    fullName() {
        return "Grapeshot Launcher";
    }

    mass() {
        return 1;
    }

    points() {
        return 4;
    }

    glyph() {
        return {
            id: "grapeshot",
            svg: `<symbol id="svg_grapeshot" viewBox="220 20 520 520"><circle fill="white" stroke="#000000" stroke-width="24" stroke-miterlimit="10" cx="480" cy="280" r="149.2"/><polygon points="480,280 609.1,56.4 350.9,56.4 480,280 609.1,56.4 350.9,56.4"/><polygon points="350.9,503.6 480,280 221.8,280 350.9,503.6 480,280 221.8,280"/><polygon points="609.1,503.6 738.2,280 480,280 609.1,503.6 738.2,280 480,280"/></symbol>`,
            width: 1,
            height: 1
        }
    }
}