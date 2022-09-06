import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class SalvoLauncher extends System {
    public leftArc: "F"|"FP"|"AP" = "FP";
    public numArcs = 3;
    public magazine: string;

    constructor(data: ISystem, ship: FullThrustShip) {
        super("salvoLauncher", ship);
        if (data.hasOwnProperty("leftArc")) {
            this.leftArc = data.leftArc as "F"|"FP"|"AP";
        }
        if (data.hasOwnProperty("magazine")) {
            this.magazine = data.magazine as string;
        }
    }

    fullName() {
        return "Salvo Missile Launcher";
    }

    mass() {
        return 3;
    }

    points() {
        return 9;
    }

    glyph() {
        switch (this.leftArc) {
            case "AP":
                return {
                    id: "smlAP",
                    svg: `<symbol id="svg_smlAP" viewBox="-1 -1 602 602"><defs><symbol id="_internalBlackChevron" viewBox="102 88.5 88.5 88.5"><polygon stroke="#000000" stroke-width="4.1006" stroke-miterlimit="10" points="146.2,96.4 167.5,172.2 146.2,158.9 124.9,172.2"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><use href="#_internalBlackChevron" width="350" height="350" x="125" y="115" /></symbol>`,
                    width: 2,
                    height: 2
                };
            case "FP":
                return {
                    id: "smlFP",
                    svg: `<symbol id="svg_smlFP" viewBox="-1 -1 602 602"><defs><symbol id="_internalBlackChevron" viewBox="102 88.5 88.5 88.5"><polygon stroke="#000000" stroke-width="4.1006" stroke-miterlimit="10" points="146.2,96.4 167.5,172.2 146.2,158.9 124.9,172.2"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><use href="#_internalBlackChevron" width="350" height="350" x="125" y="115" /></symbol>`,
                    width: 2,
                    height: 2
                };
            case "F":
                return {
                    id: "smlF",
                    svg: `<symbol id="svg_smlF" viewBox="-1 -1 602 602"><defs><symbol id="_internalBlackChevron" viewBox="102 88.5 88.5 88.5"><polygon stroke="#000000" stroke-width="4.1006" stroke-miterlimit="10" points="146.2,96.4 167.5,172.2 146.2,158.9 124.9,172.2"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><use href="#_internalBlackChevron" width="350" height="350" x="125" y="115" /></symbol>`,
                    width: 2,
                    height: 2
                };
        }
    }
}