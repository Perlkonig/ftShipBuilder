import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class FireControl extends System {
    public advanced = false;

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("advanced")) {
            this.advanced = data.advanced as boolean;
        }
    }

    fullName() {
        if (this.advanced) {
            return "Advanced Fire Control";
        }
        return "Fire Control";
    }

    mass() {
        return 1;
    }

    points() {
        if (this.advanced) {
            return 5;
        } else {
            return 4;
        }
    }

    glyph() {
        if (this.advanced) {
            return {
                id: "afcs",
                svg: `<symbol id="svg_afcs" viewBox="271 -31.25 415 622.5"><rect x="287" y="32" fill="white" stroke="#000000" stroke-width="28" stroke-miterlimit="10" width="384" height="497"/><circle stroke="#000000" stroke-width="13.7436" stroke-miterlimit="10" cx="480" cy="353" r="75.1"/><circle stroke="#000000" stroke-width="13.7436" stroke-miterlimit="10" cx="480" cy="196" r="75.1"/></symbol>`,
                height: 1.5,
                width: 1
            };
        } else {
            return {
                id: "fireControl",
                svg: `<symbol id="svg_fireControl" viewBox="274 75 411 411"><rect x="287.5" y="88.5" fill="white" stroke="#000000" stroke-width="25" stroke-miterlimit="10" width="384" height="384"/><circle stroke="#000000" stroke-width="22.2545" stroke-miterlimit="10" cx="480" cy="280" r="121.6"/></symbol>`,
                height: 1,
                width: 1
            };
        }
    }
}