import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Sensors extends System {
    public advanced = false;

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("advanced")) {
            this.advanced = data.advanced as boolean;
        }
    }

    fullName() {
        if (this.advanced) {
            return "Superior Sensors";
        }
        return "Advanced Sensors";
    }

    mass() {
        if (this.advanced) {
            return 4;
        } else {
            return 2;
        }
    }

    points() {
        return this.mass() * 4;
    }

    glyph() {
        if (this.advanced) {
            return {
                id: "sensorsAdv",
                svg: `<symbol id="svg_sensorsAdv" viewBox="240 34 480 480"><polygon fill="white" stroke="#000000" stroke-width="13" stroke-miterlimit="10" points="481.5,54.5 518.1,155 554.7,255.5 481.5,255.5 408.3,255.5 444.9,155"/><path stroke="#000000" stroke-width="13" stroke-miterlimit="10" d="M663.5,257.5c0,61-50.1,115.4-120.4,136.2L417.2,394c-70.5-20.7-120.8-75.5-120.8-136.5H663.5z"/><polyline fill="white" stroke="#000000" stroke-width="13" stroke-miterlimit="10" points="344.1,502.1 412.4,395.5 548.9,395.5 617.1,503.6"/><line stroke="#000000" stroke-width="13" stroke-miterlimit="10" x1="336" y1="505.5" x2="626" y2="505.5"/></symbol>`,
                height: 1,
                width: 1
            };
        } else {
            return {
                id: "sensors",
                svg: `<symbol id="svg_sensors" viewBox="240 34 480 480"><polygon fill="white" stroke="#000000" stroke-width="13" stroke-miterlimit="10" points="481.5,54.5 518.1,155 554.7,255.5 481.5,255.5 408.3,255.5 444.9,155"/><path fill="white" stroke="#000000" stroke-width="13" stroke-miterlimit="10" d="M663.5,257.5c0,61-50.1,115.4-120.4,136.2L417.2,394c-70.5-20.7-120.8-75.5-120.8-136.5H663.5z"/><polyline fill="white" stroke="#000000" stroke-width="13" stroke-miterlimit="10" points="344.1,502.1 412.4,395.5 548.9,395.5 617.1,503.6"/><line stroke="#000000" stroke-width="13" stroke-miterlimit="10" x1="336" y1="505.5" x2="626" y2="505.5"/></symbol>`,
                height: 1,
                width: 1
            };
        }
    }
}