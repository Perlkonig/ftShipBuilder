import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class RocketPod extends System {
    public leftArc: "F"|"FP"|"AP" = "FP";
    public numArcs = 3;

    constructor(data: ISystem, ship: FullThrustShip) {
        super("rocketPod", ship);
        if (data.hasOwnProperty("leftArc")) {
            this.leftArc = data.leftArc as "F"|"FP"|"AP";
        }
    }

    fullName() {
        return "Rocket Pod";
    }

    mass() {
        return 1;
    }

    points() {
        return 3;
    }

    glyph() {
        switch (this.leftArc) {
            case "AP":
                return {
                    id: "rocketPodAP",
                    svg: `<symbol id="svg_rocketPodAP" viewBox="-1 -1 602 602"><defs><symbol id="_internalRocket" viewBox="260 39.5 440 440"><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="398,364.9 348.9,311 348.9,224.9 331.6,205.6  314.2,224.9 314.2,311 265.1,364.9 320.2,364.9 320.2,397.5 342.9,397.5 342.9,364.9"/><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="562,364.9 611.1,311 611.1,224.9 628.4,205.6  645.8,224.9 645.8,311 694.9,364.9 639.8,364.9 639.8,397.5 617.1,397.5 617.1,364.9"/><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="546.4,282.2 497.4,228.3 497.4,142.3 480,123 462.6,142.3 462.6,228.3 413.6,282.2 468.6,282.2 468.6,314.8 491.4,314.8 491.4,282.2"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><use href="#_internalRocket" width="350" height="350" x="125" y="115" /></symbol>`,
                    width: 2,
                    height: 2
                };
            case "FP":
                return {
                    id: "rocketPodFP",
                    svg: `<symbol id="svg_rocketPodFP" viewBox="-1 -1 602 602"><defs><symbol id="_internalRocket" viewBox="260 39.5 440 440"><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="398,364.9 348.9,311 348.9,224.9 331.6,205.6  314.2,224.9 314.2,311 265.1,364.9 320.2,364.9 320.2,397.5 342.9,397.5 342.9,364.9"/><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="562,364.9 611.1,311 611.1,224.9 628.4,205.6  645.8,224.9 645.8,311 694.9,364.9 639.8,364.9 639.8,397.5 617.1,397.5 617.1,364.9"/><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="546.4,282.2 497.4,228.3 497.4,142.3 480,123 462.6,142.3 462.6,228.3 413.6,282.2 468.6,282.2 468.6,314.8 491.4,314.8 491.4,282.2"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><use href="#_internalRocket" width="350" height="350" x="125" y="115" /></symbol>`,
                    height: 2,
                    width: 2
                };
            case "F":
                return {
                    id: "rocketPodF",
                    svg: `<symbol id="svg_rocketPodF" viewBox="-1 -1 602 602"><defs><symbol id="_internalRocket" viewBox="260 39.5 440 440"><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="398,364.9 348.9,311 348.9,224.9 331.6,205.6  314.2,224.9 314.2,311 265.1,364.9 320.2,364.9 320.2,397.5 342.9,397.5 342.9,364.9"/><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="562,364.9 611.1,311 611.1,224.9 628.4,205.6  645.8,224.9 645.8,311 694.9,364.9 639.8,364.9 639.8,397.5 617.1,397.5 617.1,364.9"/><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="546.4,282.2 497.4,228.3 497.4,142.3 480,123 462.6,142.3 462.6,228.3 413.6,282.2 468.6,282.2 468.6,314.8 491.4,314.8 491.4,282.2"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><use href="#_internalRocket" width="350" height="350" x="125" y="115" /></symbol>`,
                    width: 2,
                    height: 2
                };
        }
    }
}