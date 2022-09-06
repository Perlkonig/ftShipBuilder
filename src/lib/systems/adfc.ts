import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Adfc extends System {
    public advanced = false;

    constructor(data: ISystem, ship: FullThrustShip) {
        super("adfc", ship);
        if (data.hasOwnProperty("advanced")) {
            this.advanced = data.advanced as boolean;
        }
    }

    fullName() {
        if (this.advanced) {
            return "Advanced Area Defense Fire Control";
        }
        return "Area Defense Fire Control";
    }

    mass() {
        return 2;
    }

    points() {
        if (this.advanced) {
            return 10;
        } else {
            return 8;
        }
    }

    glyph() {
        if (this.advanced) {
            return {
                id: "aadfc",
                svg: `<symbol id="svg_aadfc" viewBox="349 19 261 522"><g><rect x="362" y="68" fill="white" stroke="#000000" stroke-width="22" stroke-miterlimit="10" width="236" height="424"/><rect x="414.7" y="314.7" fill="none" stroke="#000000" stroke-width="18.1941" stroke-miterlimit="10" width="130.7" height="130.7"/><rect x="414.7" y="114.6" fill="none" stroke="#000000" stroke-width="18.1941" stroke-miterlimit="10" width="130.7" height="130.7"/><polygon points="480,179.9 414.7,114.6 484.7,114.6 545.3,114.6"/><polygon points="480,179.9 414.7,245.3 484.7,245.3 545.3,245.3"/><polygon points="480,380.1 414.7,445.4 484.7,445.4 545.3,445.4"/><polygon points="480,380.1 414.7,314.7 484.7,314.7 545.3,314.7"/></g></symbol>`,
                height: 2,
                width: 1
            };
        } else {
            return {
                id: "adfc",
                svg: `<symbol id="svg_adfc" viewBox="248 48 464 464"><g><rect x="257" y="57" fill="white" stroke="#000000" stroke-width="15.0325" stroke-miterlimit="10" width="446" height="446"/><polygon points="480,280 257,57 480,58.8 703,57"/><polygon points="480,280 257,503 480,501.2 703,503"/></g></symbol>`,
                height: 1,
                width: 1
            };
        }
    }
}