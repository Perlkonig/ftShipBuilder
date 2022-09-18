import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class LaunchTube extends System {
    public hasCatapult = false;

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("catapult")) {
            this.hasCatapult = data.catapult as boolean;
        }
    }

    fullName() {
        if (this.hasCatapult) {
            return "Launch Tube w/ Catapult";
        } else {
            return "Launch Tube";
        }
    }

    mass() {
        return 3;
    }

    points() {
        let pts = this.mass() * 3;
        if (this.hasCatapult) {
            pts++;
        }
        return pts;
    }

    glyph() {
        if (this.hasCatapult) {
            return {
                id: "catapult",
                svg: `<symbol id="svg_catapult" viewBox="-1 -1 602 602"><defs><symbol id="_internalLaunchTube" viewBox="220 20 520 520"><circle fill="white" stroke="#000000" stroke-width="10.9646" stroke-miterlimit="10" cx="480" cy="280" r="251.1"/><polygon fill="black" stroke="#000000" stroke-width="10.5236" stroke-miterlimit="10" points="480,93.6 543.2,280 606.4,466.4 480,466.4 353.6,466.4 416.8,280"/></symbol></defs><polygon points="441.5,545.0851892709961 158.50000000000006,545.0851892709961 17,300.00000000000006 158.4999999999999,54.914810729003904 441.5,54.914810729003875 583,299.99999999999994" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10"/><use href="#_internalLaunchTube" x="100" y="100" width="400" height="400" /></symbol>`,
                height: 2,
                width: 2
            };
        } else {
            return {
                id: "launchTube",
                svg: `<symbol id="svg_launchTube" viewBox="220 20 520 520"><circle fill="white" stroke="#000000" stroke-width="10.9646" stroke-miterlimit="10" cx="480" cy="280" r="251.1"/><polygon fill="black" stroke="#000000" stroke-width="10.5236" stroke-miterlimit="10" points="480,93.6 543.2,280 606.4,466.4 480,466.4 353.6,466.4 416.8,280"/></symbol>`,
                height: 2,
                width: 2
            };
        }
   }
}