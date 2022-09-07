import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc, ArcNum } from "./_base";

type Class = 1|2|3|4;

export class Emp extends System {
    public class: Class = 1;
    public leftArc: Arc = "F";
    public numArcs: ArcNum = 6;

    constructor(data: ISystem, ship: FullThrustShip) {
        super("emp", ship);
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

        if (this.class === 1) {
            this.numArcs = 6;
            // Mutating the original data so the interface works
            data.numArcs = 6;
        } else if (this.class === 2) {
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
        return `Class ${this.class} EMP Projector`;
    }

    mass() {
        switch (this.class) {
            case 1:
                return 1;
            case 2:
                if (this.numArcs === 3) {
                    return 2;
                } else {
                    return 3;
                }
            case 3:
                return 4 + (this.numArcs - 1);
            case 4:
                return 8 + (2 * (this.numArcs - 1));
        }
    }

    points() {
        return this.mass() * 3;
    }

    glyph() {
        if (this.class === 1) {
            return {
                id: "emp1",
                svg: `<symbol id="svg_emp1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="283"/><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">I</text></symbol>`,
                width: 2,
                height: 2
            }
        } else if (this.class === 2) {
            if (this.numArcs === 6) {
                return {
                    id: "emp2All",
                    svg: `<symbol id="svg_emp2All" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="283"/><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">II</text></symbol>`,
                    width: 2,
                    height: 2
                }
            } else if (this.numArcs === 3) {
                switch (this.leftArc) {
                    case "A":
                        return {
                            id: "emp2A3",
                            svg: `<symbol id="svg_emp2A3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">II</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "AP":
                        return {
                            id: "emp2AP3",
                            svg: `<symbol id="svg_emp2AP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">II</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "FP":
                        return {
                            id: "emp2FP3",
                            svg: `<symbol id="svg_emp2FP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">II</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "F":
                        return {
                            id: "emp2F3",
                            svg: `<symbol id="svg_emp2F3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">II</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "FS":
                        return {
                            id: "emp2FS3",
                            svg: `<symbol id="svg_emp2FS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 158.50000000000023 545.0851892709962"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">II</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                    case "AS":
                        return {
                            id: "emp2AS3",
                            svg: `<symbol id="svg_emp2AS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">II</text></symbol>`,
                            width: 2,
                            height: 2
                        };
                }
            }
        } else if (this.class === 3) {
            if (this.numArcs === 6) {
                return {
                    id: "emp3All",
                    svg: `<symbol id="svg_emp3All" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="283"/><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                    height: 2,
                    width: 2
                }
            } else {
                if (this.leftArc === "F") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "emp3F1",
                                svg: `<symbol id="svg_emp3F1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "emp3F2",
                                svg: `<symbol id="svg_emp3F2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "emp3F3",
                                svg: `<symbol id="svg_emp3F3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "emp3F4",
                                svg: `<symbol id="svg_emp3F4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 1 1 158.50000000000023 545.0851892709962"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "emp3F5",
                                svg: `<symbol id="svg_emp3F5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 1 1 17 300.0000000000001"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "FS") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "emp3FS1",
                                svg: `<symbol id="svg_emp3FS1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "emp3FS2",
                                svg: `<symbol id="svg_emp3FS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "emp3FS3",
                                svg: `<symbol id="svg_emp3FS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 158.50000000000023 545.0851892709962"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "emp3FS4",
                                svg: `<symbol id="svg_emp3FS4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 1 1 17 300.0000000000001"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "emp3FS5",
                                svg: `<symbol id="svg_emp3FS5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 1 1 158.50000000000006 54.91481072900385"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "AS") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "emp3AS1",
                                svg: `<symbol id="svg_emp3AS1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 441.5 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "emp3AS2",
                                svg: `<symbol id="svg_emp3AS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "emp3AS3",
                                svg: `<symbol id="svg_emp3AS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "emp3AS4",
                                svg: `<symbol id="svg_emp3AS4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 1 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "emp3AS5",
                                svg: `<symbol id="svg_emp3AS5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 1 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "A") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "emp3A1",
                                svg: `<symbol id="svg_emp3A1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "emp3A2",
                                svg: `<symbol id="svg_emp3A2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "emp3A3",
                                svg: `<symbol id="svg_emp3A3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "emp3A4",
                                svg: `<symbol id="svg_emp3A4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 1 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "emp3A5",
                                svg: `<symbol id="svg_emp3A5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 1 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "AP") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "emp3AP1",
                                svg: `<symbol id="svg_emp3AP1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "emp3AP2",
                                svg: `<symbol id="svg_emp3AP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "emp3AP3",
                                svg: `<symbol id="svg_emp3AP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "emp3AP4",
                                svg: `<symbol id="svg_emp3AP4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 1 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "emp3AP5",
                                svg: `<symbol id="svg_emp3AP5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 1 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "FP") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "emp3FP1",
                                svg: `<symbol id="svg_emp3FP1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "emp3FP2",
                                svg: `<symbol id="svg_emp3FP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "emp3FP3",
                                svg: `<symbol id="svg_emp3FP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "emp3FP4",
                                svg: `<symbol id="svg_emp3FP4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 1 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "emp3FP5",
                                svg: `<symbol id="svg_emp3FP5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 1 1 158.50000000000023 545.0851892709962"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">III</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                }
            }
        } else if (this.class === 4) {
            if (this.numArcs === 6) {
                return {
                    id: "emp4All",
                    svg: `<symbol id="svg_emp4All" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="283"/><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                    height: 2,
                    width: 2
                }
            } else {
                if (this.leftArc === "F") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "emp4F1",
                                svg: `<symbol id="svg_emp4F1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "emp4F2",
                                svg: `<symbol id="svg_emp4F2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "emp4F3",
                                svg: `<symbol id="svg_emp4F3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "emp4F4",
                                svg: `<symbol id="svg_emp4F4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 1 1 158.50000000000023 545.0851892709962"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "emp4F5",
                                svg: `<symbol id="svg_emp4F5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 1 1 17 300.0000000000001"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "FS") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "emp4FS1",
                                svg: `<symbol id="svg_emp4FS1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "emp4FS2",
                                svg: `<symbol id="svg_emp4FS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "emp4FS3",
                                svg: `<symbol id="svg_emp4FS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 0 1 158.50000000000023 545.0851892709962"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "emp4FS4",
                                svg: `<symbol id="svg_emp4FS4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 1 1 17 300.0000000000001"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "emp4FS5",
                                svg: `<symbol id="svg_emp4FS5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 54.914810729003875 A 283 283 0 1 1 158.50000000000006 54.91481072900385"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "AS") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "emp4AS1",
                                svg: `<symbol id="svg_emp4AS1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 441.5 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "emp4AS2",
                                svg: `<symbol id="svg_emp4AS2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "emp4AS3",
                                svg: `<symbol id="svg_emp4AS3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "emp4AS4",
                                svg: `<symbol id="svg_emp4AS4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 1 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "emp4AS5",
                                svg: `<symbol id="svg_emp4AS5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 583 300 A 283 283 0 1 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "A") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "emp4A1",
                                svg: `<symbol id="svg_emp4A1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.50000000000006 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "emp4A2",
                                svg: `<symbol id="svg_emp4A2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "emp4A3",
                                svg: `<symbol id="svg_emp4A3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "emp4A4",
                                svg: `<symbol id="svg_emp4A4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 1 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "emp4A5",
                                svg: `<symbol id="svg_emp4A5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 441.5 545.0851892709961 A 283 283 0 1 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "AP") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "emp4AP1",
                                svg: `<symbol id="svg_emp4AP1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 17 300.00000000000006"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "emp4AP2",
                                svg: `<symbol id="svg_emp4AP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "emp4AP3",
                                svg: `<symbol id="svg_emp4AP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "emp4AP4",
                                svg: `<symbol id="svg_emp4AP4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 1 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "emp4AP5",
                                svg: `<symbol id="svg_emp4AP5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 1 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                } else if (this.leftArc === "FP") {
                    switch (this.numArcs) {
                        case 1:
                            return {
                                id: "emp4FP1",
                                svg: `<symbol id="svg_emp4FP1" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 158.4999999999999 54.914810729003904"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 2:
                            return {
                                id: "emp4FP2",
                                svg: `<symbol id="svg_emp4FP2" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 441.5 54.914810729003875"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 3:
                            return {
                                id: "emp4FP3",
                                svg: `<symbol id="svg_emp4FP3" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 4:
                            return {
                                id: "emp4FP4",
                                svg: `<symbol id="svg_emp4FP4" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 1 1 441.4999999999999 545.0851892709961"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                        case 5:
                            return {
                                id: "emp4FP5",
                                svg: `<symbol id="svg_emp4FP5" viewBox="-1 -1 602 602"><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 1 1 158.50000000000023 545.0851892709962"/><text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="200">IV</text></symbol>`,
                                height: 2,
                                width: 2
                            };
                    }
                }
            }
        }
    }
}