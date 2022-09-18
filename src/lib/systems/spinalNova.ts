import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class SpinalNova extends System {
    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
    }

    fullName() {
        return "Spinal Mount - Nova Cannon (deprecated)";
    }

    mass() {
        return 20;
    }

    points() {
        return 60;
    }

    glyph() {
        return {
            id: "spinalNova",
            svg: `<symbol id="svg_spinalNova" viewBox="340 75 280 410"><path fill="white" stroke="#000000" stroke-width="18.7292" stroke-miterlimit="10" d="M422,384c-3.2,7.5-4.9,15.8-4.9,24.5c0,34.8,28.2,63,63,63s63-28.2,63-63c0-8.5-1.7-16.6-4.7-24"/><path fill="white" stroke="#000000" stroke-width="18.7292" stroke-miterlimit="10" d="M399.1,308.5c-1.2,5.6-1.8,11.3-1.8,17.3c0,45.7,37,82.7,82.7,82.7s82.7-37,82.7-82.7c0-5.7-0.6-11.3-1.7-16.7"/><circle fill="white" stroke="#000000" stroke-width="18.7292" stroke-miterlimit="10" cx="480" cy="213.4" r="124.9"/></symbol>`,
            width: 2,
            height: 3
        }
   }
}