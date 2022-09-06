import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc } from "./_base";

export class Ads extends System {
    public leftArc: Arc = "FP";
    public numArcs = 3;

    constructor(data: ISystem, ship: FullThrustShip) {
        super("ads", ship);
        if (data.hasOwnProperty("leftArc")) {
            this.leftArc = data.leftArc as Arc;
        }
        if (data.hasOwnProperty("numArcs")) {
            this.numArcs = data.numArcs as number;
        }
        if (this.numArcs < 3) {
            this.numArcs = 3;
        } else if (this.numArcs > 3) {
            this.numArcs = 6;
        }
    }

    fullName() {
        return "Area Defense System";
    }

    mass() {
        if (this.numArcs > 3) {
            return 3;
        }
        return 2;
    }

    points() {
        return this.mass() * 3;
    }

    glyph() {
        if (this.numArcs > 3) {
            return {
                id: "adsAll",
                svg: `<symbol id="svg_adsAll" viewBox="-1 -1 602 602"><defs><symbol id="_internalPDS" viewBox="378 178 204 204"><path d="M480,193.3c-27.8,0-52.6,13.1-68.4,33.5L480,280l68.4-53.3C532.6,206.4,507.8,193.3,480,193.3z"/><path d="M480,280l-68.4,53.3c15.9,20.4,40.6,33.5,68.4,33.5s52.6-13.1,68.4-33.5L480,280z"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="283"/><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><use href="#_internalPDS" x="50" y="50" width="500" height="500" /></symbol>`,
                width: 1,
                height: 1
            };
        } else {
            switch (this.leftArc) {
                case "FP":
                    return {
                        id: "adsFP3",
                        svg: `<symbol id="svg_adsFP3" viewBox="-1 -1 602 602"><defs><symbol id="_internalPDS" viewBox="378 178 204 204"><path d="M480,193.3c-27.8,0-52.6,13.1-68.4,33.5L480,280l68.4-53.3C532.6,206.4,507.8,193.3,480,193.3z"/><path d="M480,280l-68.4,53.3c15.9,20.4,40.6,33.5,68.4,33.5s52.6-13.1,68.4-33.5L480,280z"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><use href="#_internalPDS" x="50" y="50" width="500" height="500" /></symbol>`,
                        height: 1,
                        width: 1
                    };
                case "F":
                    return {
                        id: "adsF3",
                        svg: `<symbol id="svg_adsF3" viewBox="-1 -1 602 602"><defs><symbol id="_internalPDS" viewBox="378 178 204 204"><path d="M480,193.3c-27.8,0-52.6,13.1-68.4,33.5L480,280l68.4-53.3C532.6,206.4,507.8,193.3,480,193.3z"/><path d="M480,280l-68.4,53.3c15.9,20.4,40.6,33.5,68.4,33.5s52.6-13.1,68.4-33.5L480,280z"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><use href="#_internalPDS" x="50" y="50" width="500" height="500" /></symbol>`,
                        height: 1,
                        width: 1
                    };
                case "FS":
                    return {
                        id: "adsFS3",
                        svg: `<symbol id="svg_adsFS3" viewBox="-1 -1 602 602"><defs><symbol id="_internalPDS" viewBox="378 178 204 204"><path d="M480,193.3c-27.8,0-52.6,13.1-68.4,33.5L480,280l68.4-53.3C532.6,206.4,507.8,193.3,480,193.3z"/><path d="M480,280l-68.4,53.3c15.9,20.4,40.6,33.5,68.4,33.5s52.6-13.1,68.4-33.5L480,280z"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 158.50000000000023 545.0851892709962"/><use href="#_internalPDS" x="50" y="50" width="500" height="500" /></symbol>`,
                        height: 1,
                        width: 1
                    };
                case "AS":
                    return {
                        id: "adsAS3",
                        svg: `<symbol id="svg_adsAS3" viewBox="-1 -1 602 602"><defs><symbol id="_internalPDS" viewBox="378 178 204 204"><path d="M480,193.3c-27.8,0-52.6,13.1-68.4,33.5L480,280l68.4-53.3C532.6,206.4,507.8,193.3,480,193.3z"/><path d="M480,280l-68.4,53.3c15.9,20.4,40.6,33.5,68.4,33.5s52.6-13.1,68.4-33.5L480,280z"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 17 300.00000000000006"/><use href="#_internalPDS" x="50" y="50" width="500" height="500" /></symbol>`,
                        height: 1,
                        width: 1
                    };
                case "A":
                    return {
                        id: "adsA3",
                        svg: `<symbol id="svg_adsA3" viewBox="-1 -1 602 602"><defs><symbol id="_internalPDS" viewBox="378 178 204 204"><path d="M480,193.3c-27.8,0-52.6,13.1-68.4,33.5L480,280l68.4-53.3C532.6,206.4,507.8,193.3,480,193.3z"/><path d="M480,280l-68.4,53.3c15.9,20.4,40.6,33.5,68.4,33.5s52.6-13.1,68.4-33.5L480,280z"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><use href="#_internalPDS" x="50" y="50" width="500" height="500" /></symbol>`,
                        height: 1,
                        width: 1
                    };
                case "AP":
                    return {
                        id: "adsAP3",
                        svg: `<symbol id="svg_adsAP3" viewBox="-1 -1 602 602"><defs><symbol id="_internalPDS" viewBox="378 178 204 204"><path d="M480,193.3c-27.8,0-52.6,13.1-68.4,33.5L480,280l68.4-53.3C532.6,206.4,507.8,193.3,480,193.3z"/><path d="M480,280l-68.4,53.3c15.9,20.4,40.6,33.5,68.4,33.5s52.6-13.1,68.4-33.5L480,280z"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><use href="#_internalPDS" x="50" y="50" width="500" height="500" /></symbol>`,
                        height: 1,
                        width: 1
                    };
            }
        }
    }
}