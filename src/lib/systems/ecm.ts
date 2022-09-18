import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Ecm extends System {
    public area = false;

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("area")) {
            this.area = data.area as boolean;
        }
    }

    fullName() {
        if (this.area) {
            return "Area ECM Device";
        }
        return "ECM Device";
    }

    mass() {
        if (this.area) {
            return 2;
        }
        return 1;

    }

    points() {
        if (this.area) {
            return 6;
        }
        return 3;
    }

    glyph() {
        if (this.area) {
            return {
                id: "ecmArea",
                svg: `<symbol id="svg_ecmArea" viewBox="206 6.5 547 547"><path d="M571.2,39.7l-77.6,150.2c-4.5-0.7-9-1.1-13.6-1.1c-4.6,0-9.2,0.5-13.6,1.1L388.8,39.7C291.8,76.5,222.9,170.2,222.9,280 s68.9,203.5,165.8,240.3l77.6-150.2c4.5,0.7,9,1.1,13.6,1.1c4.6,0,9.2-0.5,13.6-1.1l77.6,150.2c96.9-36.8,165.8-130.5,165.8-240.3 S668.2,76.5,571.2,39.7z M480,316.4c-20.1,0-36.4-16.3-36.4-36.4s16.3-36.4,36.4-36.4s36.4,16.3,36.4,36.4S500.1,316.4,480,316.4z"/></symbol>`,
                width: 1,
                height: 1
            };
        } else {
            return {
                id: "ecm",
                svg: `<symbol id="svg_ecm" viewBox="212 12.5 535 535"><g><path fill="none" stroke="#000000" stroke-width="11" stroke-miterlimit="10" d="M571.2,39.7l-77.6,150.2c-4.5-0.7-9-1.1-13.6-1.1 c-4.6,0-9.2,0.5-13.6,1.1L388.8,39.7C291.8,76.5,222.9,170.2,222.9,280s68.9,203.5,165.8,240.3l77.6-150.2c4.5,0.7,9,1.1,13.6,1.1 c4.6,0,9.2-0.5,13.6-1.1l77.6,150.2c96.9-36.8,165.8-130.5,165.8-240.3S668.2,76.5,571.2,39.7z M480,316.4 c-20.1,0-36.4-16.3-36.4-36.4s16.3-36.4,36.4-36.4s36.4,16.3,36.4,36.4S500.1,316.4,480,316.4z"/><path fill="none" stroke="#000000" stroke-width="11" stroke-miterlimit="10" d="M407.3,75.5C323.2,105.4,263,185.7,263,280 s60.2,174.6,144.3,204.5"/><path fill="none" stroke="#000000" stroke-width="11" stroke-miterlimit="10" d="M552.7,484.5C636.8,454.6,697,374.3,697,280 S636.8,105.4,552.7,75.5"/><path fill="none" stroke="#000000" stroke-width="11" stroke-miterlimit="10" d="M428.6,114.8C358.1,136.7,307,202.4,307,280 c0,77.3,50.7,142.8,120.7,165"/><path fill="none" stroke="#000000" stroke-width="11" stroke-miterlimit="10" d="M531.4,445.2C601.9,423.3,653,357.6,653,280 c0-77.3-50.7-142.8-120.7-165"/><path fill="none" stroke="#000000" stroke-width="11" stroke-miterlimit="10" d="M449.7,157.7c-55,13.6-95.7,63.2-95.7,122.3 c0,59.2,40.8,108.8,95.7,122.3"/><path fill="none" stroke="#000000" stroke-width="11" stroke-miterlimit="10" d="M510.3,402.3c55-13.6,95.7-63.2,95.7-122.3 c0-59.2-40.8-108.8-95.7-122.3"/><circle fill="none" stroke="#000000" stroke-width="10.8406" stroke-miterlimit="10" cx="480" cy="280" r="90.7"/></g></symbol>`,
                width: 1,
                height: 1
            };
        }
    }
}