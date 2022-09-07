import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc, ArcNum } from "./_base";

type Class = 1|2|3|4;

export class Needle extends System {
    public class: Class = 1;
    public leftArc: Arc = "F";
    public numArcs: ArcNum = 6;

    constructor(data: ISystem, ship: FullThrustShip) {
        super("needle", ship);
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

        if (this.numArcs > 3) {
            this.numArcs = 3;
            data.numArcs = 3;
        }

        if (this.class === 1) {
            if (this.numArcs < 2) {
                this.numArcs = 2;
                data.numArcs = 2;
            }
        }
    }

    fullName() {
        return `Class ${this.class} Needle Beam`;
    }

    mass() {
        switch (this.class) {
            case 1:
                if (this.numArcs === 2) {
                    return 2;
                } else {
                    return 3;
                }
            case 2:
                return 4 + (2 * (this.numArcs - 1));
            case 3:
                return 8 + (4 * (this.numArcs - 1));
            case 4:
                return 16 + (8 * (this.numArcs - 1));
        }
    }

    points() {
        return this.mass() * 3;
    }

    glyph() {
        if (this.class === 1) {
            if (this.leftArc === "F") {
                switch (this.numArcs) {
                    case 2:
                        return {
                            id: "needle1F2",
                            svg: `<symbol id="svg_needle1F2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">I</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle1F3",
                            svg: `<symbol id="svg_needle1F3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">I</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "FS") {
                switch (this.numArcs) {
                    case 2:
                        return {
                            id: "needle1FS2",
                            svg: `<symbol id="svg_needle1FS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">I</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle1FS3",
                            svg: `<symbol id="svg_needle1FS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 158.50000000000023 545.0851892709962"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">I</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "AS") {
                switch (this.numArcs) {
                    case 2:
                        return {
                            id: "needle1AS2",
                            svg: `<symbol id="svg_needle1AS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">I</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle1AS3",
                            svg: `<symbol id="svg_needle1AS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">I</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "A") {
                switch (this.numArcs) {
                    case 2:
                        return {
                            id: "needle1A2",
                            svg: `<symbol id="svg_needle1A2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">I</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle1A3",
                            svg: `<symbol id="svg_needle1A3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">I</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "AP") {
                switch (this.numArcs) {
                    case 2:
                        return {
                            id: "needle1AP2",
                            svg: `<symbol id="svg_needle1AP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">I</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle1AP3",
                            svg: `<symbol id="svg_needle1AP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">I</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "FP") {
                switch (this.numArcs) {
                    case 2:
                        return {
                            id: "needle1FP2",
                            svg: `<symbol id="svg_needle1FP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">I</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle1FP3",
                            svg: `<symbol id="svg_needle1FP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">I</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            }
        } else if (this.class === 2) {
            if (this.leftArc === "F") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle2F1",
                            svg: `<symbol id="svg_needle2F1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle2F2",
                            svg: `<symbol id="svg_needle2F2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle2F3",
                            svg: `<symbol id="svg_needle2F3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "FS") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle2FS1",
                            svg: `<symbol id="svg_needle2FS1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle2FS2",
                            svg: `<symbol id="svg_needle2FS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle2FS3",
                            svg: `<symbol id="svg_needle2FS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 158.50000000000023 545.0851892709962"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "AS") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle2AS1",
                            svg: `<symbol id="svg_needle2AS1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 441.5 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle2AS2",
                            svg: `<symbol id="svg_needle2AS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle2AS3",
                            svg: `<symbol id="svg_needle2AS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "A") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle2A1",
                            svg: `<symbol id="svg_needle2A1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle2A2",
                            svg: `<symbol id="svg_needle2A2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle2A3",
                            svg: `<symbol id="svg_needle2A3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "AP") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle2AP1",
                            svg: `<symbol id="svg_needle2AP1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle2AP2",
                            svg: `<symbol id="svg_needle2AP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle2AP3",
                            svg: `<symbol id="svg_needle2AP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "FP") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle2FP1",
                            svg: `<symbol id="svg_needle2FP1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle2FP2",
                            svg: `<symbol id="svg_needle2FP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle2FP3",
                            svg: `<symbol id="svg_needle2FP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">II</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            }
        } else if (this.class === 3) {
            if (this.leftArc === "F") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle3F1",
                            svg: `<symbol id="svg_needle3F1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle3F2",
                            svg: `<symbol id="svg_needle3F2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle3F3",
                            svg: `<symbol id="svg_needle3F3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "FS") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle3FS1",
                            svg: `<symbol id="svg_needle3FS1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle3FS2",
                            svg: `<symbol id="svg_needle3FS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle3FS3",
                            svg: `<symbol id="svg_needle3FS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 158.50000000000023 545.0851892709962"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "AS") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle3AS1",
                            svg: `<symbol id="svg_needle3AS1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 441.5 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle3AS2",
                            svg: `<symbol id="svg_needle3AS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle3AS3",
                            svg: `<symbol id="svg_needle3AS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "A") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle3A1",
                            svg: `<symbol id="svg_needle3A1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle3A2",
                            svg: `<symbol id="svg_needle3A2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle3A3",
                            svg: `<symbol id="svg_needle3A3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "AP") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle3AP1",
                            svg: `<symbol id="svg_needle3AP1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle3AP2",
                            svg: `<symbol id="svg_needle3AP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle3AP3",
                            svg: `<symbol id="svg_needle3AP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "FP") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle3FP1",
                            svg: `<symbol id="svg_needle3FP1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle3FP2",
                            svg: `<symbol id="svg_needle3FP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle3FP3",
                            svg: `<symbol id="svg_needle3FP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">III</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            }
        } else if (this.class === 4) {
            if (this.leftArc === "F") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle4F1",
                            svg: `<symbol id="svg_needle4F1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle4F2",
                            svg: `<symbol id="svg_needle4F2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle4F3",
                            svg: `<symbol id="svg_needle4F3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "FS") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle4FS1",
                            svg: `<symbol id="svg_needle4FS1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle4FS2",
                            svg: `<symbol id="svg_needle4FS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle4FS3",
                            svg: `<symbol id="svg_needle4FS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 158.50000000000023 545.0851892709962"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "AS") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle4AS1",
                            svg: `<symbol id="svg_needle4AS1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 441.5 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle4AS2",
                            svg: `<symbol id="svg_needle4AS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle4AS3",
                            svg: `<symbol id="svg_needle4AS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "A") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle4A1",
                            svg: `<symbol id="svg_needle4A1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle4A2",
                            svg: `<symbol id="svg_needle4A2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle4A3",
                            svg: `<symbol id="svg_needle4A3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "AP") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle4AP1",
                            svg: `<symbol id="svg_needle4AP1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle4AP2",
                            svg: `<symbol id="svg_needle4AP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle4AP3",
                            svg: `<symbol id="svg_needle4AP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            } else if (this.leftArc === "FP") {
                switch (this.numArcs) {
                    case 1:
                        return {
                            id: "needle4FP1",
                            svg: `<symbol id="svg_needle4FP1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 2:
                        return {
                            id: "needle4FP2",
                            svg: `<symbol id="svg_needle4FP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                    case 3:
                        return {
                            id: "needle4FP3",
                            svg: `<symbol id="svg_needle4FP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="black" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" stroke="white" fill="white" font-size="200">IV</text></symbol>`,
                            height: 2,
                            width: 2
                        };
                }
            }
        }
    }
}