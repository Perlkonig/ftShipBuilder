import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class CloakDevice extends System {
    constructor(_data: ISystem, ship: FullThrustShip) {
        super("cloakDevice", ship);
    }

    fullName() {
        return "Cloaking Device";
    }

    mass() {
        return 1;
    }

    points() {
        return Math.round(this.ship.mass / 2);
    }

    glyph() {
        return {
            id: "cloakDevice",
            svg: `<symbol id="svg_cloakDevice" viewBox="267 67 425 425"><circle fill="white" stroke="#000000" stroke-width="7" stroke-miterlimit="10" cx="480" cy="280" r="205.5"/><path d="M480,485.5c113.5,0,205.5-92,205.5-205.5S593.5,74.5,480,74.5"/></symbol>`,
            height: 2,
            width: 2
        }
    }
}