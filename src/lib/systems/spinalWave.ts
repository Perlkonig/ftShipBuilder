import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class SpinalWave extends System {
    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
    }

    fullName() {
        return "Spinal Mount - Wave Gun (deprecated)";
    }

    mass() {
        return 12;
    }

    points() {
        return 36;
    }

    glyph() {
        return {
            id: "spinalWave",
            svg: `<symbol id="svg_spinalWave" viewBox="290 30 380 510"><polygon fill="white" stroke="#000000" stroke-width="13.8309" stroke-miterlimit="10" points="480,520 391.7,280 303.4,40 480,40 656.6,40 568.3,280"/><circle stroke="#000000" stroke-width="13.7162" stroke-miterlimit="10" cx="480" cy="170.2" r="91.4"/><path stroke="#000000" stroke-width="13.7162" stroke-miterlimit="10" d="M420.7,239.9c-0.9,4.1-1.3,8.3-1.3,12.6c0,33.5,27.1,60.6,60.6,60.6c33.5,0,60.6-27.1,60.6-60.6c0-4.2-0.4-8.3-1.2-12.2"/><path stroke="#000000" stroke-width="13.7162" stroke-miterlimit="10" d="M437.5,295.1c-2.3,5.5-3.6,11.6-3.6,17.9c0,25.5,20.6,46.1,46.1,46.1s46.1-20.6,46.1-46.1c0-6.2-1.2-12.1-3.5-17.6"/></symbol>`,
            width: 2,
            height: 3
        }
   }
}