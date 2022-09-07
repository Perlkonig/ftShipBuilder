import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc, ArcNum } from "./_base";

type Class = 1|2|3|4;

export class PlasmaCannon extends System {
    public class: Class = 1;
    public leftArc: Arc = "F";
    public numArcs: ArcNum = 6;

    constructor(data: ISystem, ship: FullThrustShip) {
        super("plasmaCannon", ship);
        if (data.hasOwnProperty("class")) {
            this.class = data.class as Class;
        }
        if (this.class < 1) {
            this.class = 1;
        } else if (this.class > 4) {
            this.class = 4;
        }
        if (data.hasOwnProperty("leftArc")) {
            this.leftArc = data.leftArc as Arc;
        }
        if (data.hasOwnProperty("numArcs")) {
            this.numArcs = data.numArcs as ArcNum;
        }

        if (this.class <= 2) {
            if (this.numArcs < 3) {
                this.numArcs = 3;
                data.numArcs = 3;
            } else if ( (this.numArcs > 3) && (this.numArcs < 6) ) {
                this.numArcs = 3;
            } else if (this.numArcs > 6) {
                this.numArcs = 6;
                data.numArcs = 6;
            }
        }
    }

    fullName() {
        return `Class ${this.class} Plasma Cannon`;
    }

    mass() {
        switch (this.class) {
            case 1:
                if (this.numArcs === 3) {
                    return 1;
                } else {
                    return 2;
                }
            case 2:
                if (this.numArcs === 3) {
                    return 4;
                } else {
                    return 6;
                }
            case 3:
                return 8 + (2 * (this.numArcs - 1));
            case 4:
                return 16 + (4 * (this.numArcs - 1));
        }
    }

    points() {
        return this.mass() * 3;
    }

    glyph() {
        if (this.class === 1) {
            if (this.numArcs === 6) {
                return {
                    id: "plasmaCannon1All",
                    svg: `<symbol id="svg_plasmaCannon1All" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="283"/><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">1</text></symbol>`,
                    width: 2,
                    height: 2
                }
            } else if (this.numArcs === 3) {
                switch (this.leftArc) {
                    case "A":
                        return {
                            id: "plasmaCannon1A3",
                            svg: `<symbol id="svg_plasmaCannon1A3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">1</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "AP":
                        return {
                            id: "plasmaCannon1AP3",
                            svg: `<symbol id="svg_plasmaCannon1AP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">1</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "FP":
                        return {
                            id: "plasmaCannon1FP3",
                            svg: `<symbol id="svg_plasmaCannon1FP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">1</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "F":
                        return {
                            id: "plasmaCannon1F3",
                            svg: `<symbol id="svg_plasmaCannon1F3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">1</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "FS":
                        return {
                            id: "plasmaCannon1FS3",
                            svg: `<symbol id="svg_plasmaCannon1FS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 158.50000000000023 545.0851892709962"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">1</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "AS":
                        return {
                            id: "plasmaCannon1AS3",
                            svg: `<symbol id="svg_plasmaCannon1AS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 17 300.00000000000006"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">1</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                }
            }
        } else if (this.class === 2) {
            if (this.numArcs === 6) {
                return {
                    id: "plasmaCannon2All",
                    svg: `<symbol id="svg_plasmaCannon2All" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="283"/><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">2</text></symbol>`,
                    width: 2,
                    height: 2
                }
            } else if (this.numArcs === 3) {
                switch (this.leftArc) {
                    case "A":
                        return {
                            id: "plasmaCannon2A3",
                            svg: `<symbol id="svg_plasmaCannon2A3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">2</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "AP":
                        return {
                            id: "plasmaCannon2AP3",
                            svg: `<symbol id="svg_plasmaCannon2AP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">2</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "FP":
                        return {
                            id: "plasmaCannon2FP3",
                            svg: `<symbol id="svg_plasmaCannon2FP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">2</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "F":
                        return {
                            id: "plasmaCannon2F3",
                            svg: `<symbol id="svg_plasmaCannon2F3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">2</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "FS":
                        return {
                            id: "plasmaCannon2FS3",
                            svg: `<symbol id="svg_plasmaCannon2FS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 158.50000000000023 545.0851892709962"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">2</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "AS":
                        return {
                            id: "plasmaCannon2AS3",
                            svg: `<symbol id="svg_plasmaCannon2AS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 17 300.00000000000006"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">2</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                }
            }
        } else if (this.class === 3) {
            if (this.numArcs === 6) {
                return {
                    id: "plasmaCannon3All",
                    svg: `<symbol id="svg_plasmaCannon3All" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="283"/><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                    height: 2,
                    width: 2
                }
            } else {
                if (this.leftArc === "F") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "plasmaCannon3F1",
                                svg: `<symbol id="svg_plasmaCannon3F1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.5 54.914810729003875"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "plasmaCannon3F2",
                                svg: `<symbol id="svg_plasmaCannon3F2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 583 299.99999999999994"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "plasmaCannon3F3",
                                svg: `<symbol id="svg_plasmaCannon3F3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "plasmaCannon3F4",
                                svg: `<symbol id="svg_plasmaCannon3F4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 1 1 158.50000000000023 545.0851892709962"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "plasmaCannon3F5",
                                svg: `<symbol id="svg_plasmaCannon3F5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 1 1 17 300.0000000000001"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "FS") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "plasmaCannon3FS1",
                                svg: `<symbol id="svg_plasmaCannon3FS1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 583 299.99999999999994"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "plasmaCannon3FS2",
                                svg: `<symbol id="svg_plasmaCannon3FS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "plasmaCannon3FS3",
                                svg: `<symbol id="svg_plasmaCannon3FS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 158.50000000000023 545.0851892709962"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "plasmaCannon3FS4",
                                svg: `<symbol id="svg_plasmaCannon3FS4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 1 1 17 300.0000000000001"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "plasmaCannon3FS5",
                                svg: `<symbol id="svg_plasmaCannon3FS5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 1 1 158.50000000000006 54.91481072900385"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "AS") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "plasmaCannon3AS1",
                                svg: `<symbol id="svg_plasmaCannon3AS1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 441.5 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "plasmaCannon3AS2",
                                svg: `<symbol id="svg_plasmaCannon3AS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "plasmaCannon3AS3",
                                svg: `<symbol id="svg_plasmaCannon3AS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 17 300.00000000000006"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "plasmaCannon3AS4",
                                svg: `<symbol id="svg_plasmaCannon3AS4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 1 1 158.4999999999999 54.914810729003904"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "plasmaCannon3AS5",
                                svg: `<symbol id="svg_plasmaCannon3AS5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 1 1 441.5 54.914810729003875"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "A") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "plasmaCannon3A1",
                                svg: `<symbol id="svg_plasmaCannon3A1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "plasmaCannon3A2",
                                svg: `<symbol id="svg_plasmaCannon3A2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "plasmaCannon3A3",
                                svg: `<symbol id="svg_plasmaCannon3A3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "plasmaCannon3A4",
                                svg: `<symbol id="svg_plasmaCannon3A4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 1 1 441.5 54.914810729003875"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "plasmaCannon3A5",
                                svg: `<symbol id="svg_plasmaCannon3A5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 1 1 583 299.99999999999994"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "AP") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "plasmaCannon3AP1",
                                svg: `<symbol id="svg_plasmaCannon3AP1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "plasmaCannon3AP2",
                                svg: `<symbol id="svg_plasmaCannon3AP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "plasmaCannon3AP3",
                                svg: `<symbol id="svg_plasmaCannon3AP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "plasmaCannon3AP4",
                                svg: `<symbol id="svg_plasmaCannon3AP4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 1 1 583 299.99999999999994"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "plasmaCannon3AP5",
                                svg: `<symbol id="svg_plasmaCannon3AP5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 1 1 441.4999999999999 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "FP") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "plasmaCannon3FP1",
                                svg: `<symbol id="svg_plasmaCannon3FP1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "plasmaCannon3FP2",
                                svg: `<symbol id="svg_plasmaCannon3FP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 441.5 54.914810729003875"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "plasmaCannon3FP3",
                                svg: `<symbol id="svg_plasmaCannon3FP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "plasmaCannon3FP4",
                                svg: `<symbol id="svg_plasmaCannon3FP4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 1 1 441.4999999999999 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "plasmaCannon3FP5",
                                svg: `<symbol id="svg_plasmaCannon3FP5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 1 1 158.50000000000023 545.0851892709962"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">3</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                }
            }
        } else if (this.class === 4) {
            if (this.numArcs === 6) {
                return {
                    id: "plasmaCannon3All",
                    svg: `<symbol id="svg_plasmaCannon3All" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="283"/><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                    height: 2,
                    width: 2
                }
            } else {
                if (this.leftArc === "F") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "plasmaCannon3F1",
                                svg: `<symbol id="svg_plasmaCannon3F1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.5 54.914810729003875"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "plasmaCannon3F2",
                                svg: `<symbol id="svg_plasmaCannon3F2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 583 299.99999999999994"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "plasmaCannon3F3",
                                svg: `<symbol id="svg_plasmaCannon3F3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "plasmaCannon3F4",
                                svg: `<symbol id="svg_plasmaCannon3F4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 1 1 158.50000000000023 545.0851892709962"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "plasmaCannon3F5",
                                svg: `<symbol id="svg_plasmaCannon3F5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 1 1 17 300.0000000000001"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "FS") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "plasmaCannon3FS1",
                                svg: `<symbol id="svg_plasmaCannon3FS1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 583 299.99999999999994"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "plasmaCannon3FS2",
                                svg: `<symbol id="svg_plasmaCannon3FS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "plasmaCannon3FS3",
                                svg: `<symbol id="svg_plasmaCannon3FS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 158.50000000000023 545.0851892709962"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "plasmaCannon3FS4",
                                svg: `<symbol id="svg_plasmaCannon3FS4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 1 1 17 300.0000000000001"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "plasmaCannon3FS5",
                                svg: `<symbol id="svg_plasmaCannon3FS5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 1 1 158.50000000000006 54.91481072900385"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "AS") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "plasmaCannon3AS1",
                                svg: `<symbol id="svg_plasmaCannon3AS1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 441.5 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "plasmaCannon3AS2",
                                svg: `<symbol id="svg_plasmaCannon3AS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "plasmaCannon3AS3",
                                svg: `<symbol id="svg_plasmaCannon3AS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 17 300.00000000000006"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "plasmaCannon3AS4",
                                svg: `<symbol id="svg_plasmaCannon3AS4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 1 1 158.4999999999999 54.914810729003904"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "plasmaCannon3AS5",
                                svg: `<symbol id="svg_plasmaCannon3AS5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 1 1 441.5 54.914810729003875"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "A") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "plasmaCannon3A1",
                                svg: `<symbol id="svg_plasmaCannon3A1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "plasmaCannon3A2",
                                svg: `<symbol id="svg_plasmaCannon3A2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "plasmaCannon3A3",
                                svg: `<symbol id="svg_plasmaCannon3A3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "plasmaCannon3A4",
                                svg: `<symbol id="svg_plasmaCannon3A4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 1 1 441.5 54.914810729003875"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "plasmaCannon3A5",
                                svg: `<symbol id="svg_plasmaCannon3A5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 1 1 583 299.99999999999994"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "AP") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "plasmaCannon3AP1",
                                svg: `<symbol id="svg_plasmaCannon3AP1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "plasmaCannon3AP2",
                                svg: `<symbol id="svg_plasmaCannon3AP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "plasmaCannon3AP3",
                                svg: `<symbol id="svg_plasmaCannon3AP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "plasmaCannon3AP4",
                                svg: `<symbol id="svg_plasmaCannon3AP4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 1 1 583 299.99999999999994"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "plasmaCannon3AP5",
                                svg: `<symbol id="svg_plasmaCannon3AP5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 1 1 441.4999999999999 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "FP") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "plasmaCannon3FP1",
                                svg: `<symbol id="svg_plasmaCannon3FP1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "plasmaCannon3FP2",
                                svg: `<symbol id="svg_plasmaCannon3FP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 441.5 54.914810729003875"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "plasmaCannon3FP3",
                                svg: `<symbol id="svg_plasmaCannon3FP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "plasmaCannon3FP4",
                                svg: `<symbol id="svg_plasmaCannon3FP4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 1 1 441.4999999999999 545.0851892709961"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "plasmaCannon3FP5",
                                svg: `<symbol id="svg_plasmaCannon3FP5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 1 1 158.50000000000023 545.0851892709962"/><circle cx="300" cy="300" r="170" fill="none" stroke="black" stroke-width="20" stroke-miterlimit="10" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300">4</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                }
            }
        }
    }
}