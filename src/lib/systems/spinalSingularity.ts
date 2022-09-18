import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

type Ranges = "short" | "medium" | "long";

export class SpinalSingularity extends System {
    public range: Ranges = "short";
    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("range")) {
            this.range = data.range as Ranges;
        }
    }

    fullName() {
        if (this.range === "short") {
            return "Spinal Mount - Beam - Short Range";
        } else if (this.range === "medium") {
            return "Spinal Mount - Beam - Medium Range";
        } else {
            return "Spinal Mount - Beam - Long Range";
        }
    }

    mass() {
        if (this.range === "short") {
            return 8;
        } else if (this.range === "medium") {
            return 16;
        } else {
            return 32;
        }
    }

    points() {
        return this.mass() * 5;
    }

    glyph() {
        if (this.range === "short") {
            return {
                id: "spinalSingularityS",
                svg: `<symbol id="svg_spinalSingularityS" viewBox="313.5 30 333 500"><path fill="white" stroke="#000000" stroke-width="6.5931" stroke-miterlimit="10" d="M427.9,416.5c-9,11.3-14.3,25.6-14.3,41.2 c0,36.7,29.7,66.4,66.4,66.4s66.4-29.7,66.4-66.4c0-15.6-5.4-29.9-14.4-41.3"/><path fill="white" stroke="#000000" stroke-width="6.5931" stroke-miterlimit="10" d="M411.2,264.9c-17.7,17.7-28.7,42.1-28.7,69.1 c0,53.9,43.7,97.5,97.5,97.5s97.5-43.7,97.5-97.5c0-26.9-10.9-51.3-28.6-69"/><circle fill="white" stroke="#000000" stroke-width="6.5931" stroke-miterlimit="10" cx="480" cy="160.8" r="124.8"/><path d="M454.6,375.7c4.8,3.2,13.4,6.5,21.6,6.5c11.9,0,17.5-6,17.5-13.4c0-7.8-4.7-12.1-16.8-16.6c-16.2-5.8-23.9-14.7-23.9-25.5 c0-14.5,11.7-26.5,31.1-26.5c9.1,0,17.1,2.6,22.2,5.6l-4.1,11.9c-3.5-2.2-10.1-5.2-18.4-5.2c-9.7,0-15.1,5.6-15.1,12.3 c0,7.5,5.4,10.8,17.1,15.3c15.7,6,23.7,13.8,23.7,27.2c0,15.8-12.3,27-33.7,27c-9.9,0-19-2.4-25.3-6.1L454.6,375.7z"/></symbol>`,
                width: 2,
                height: 3
            }
        } else if (this.range === "medium") {
            return {
                id: "spinalSingularityM",
                svg: `<symbol id="svg_spinalSingularityM" viewBox="313.5 30 333 500"><path fill="white" stroke="#000000" stroke-width="6.5931" stroke-miterlimit="10" d="M427.9,416.5c-9,11.3-14.3,25.6-14.3,41.2 c0,36.7,29.7,66.4,66.4,66.4s66.4-29.7,66.4-66.4c0-15.6-5.4-29.9-14.4-41.3"/><path fill="white" stroke="#000000" stroke-width="6.5931" stroke-miterlimit="10" d="M411.2,264.9c-17.7,17.7-28.7,42.1-28.7,69.1 c0,53.9,43.7,97.5,97.5,97.5s97.5-43.7,97.5-97.5c0-26.9-10.9-51.3-28.6-69"/><circle fill="white" stroke="#000000" stroke-width="6.5931" stroke-miterlimit="10" cx="480" cy="160.8" r="124.8"/><path d="M509.3,349c-0.6-11.4-1.3-25-1.2-35.2h-0.4c-2.8,9.6-6.2,19.7-10.3,31L483,384.3h-8l-13.2-38.8c-3.9-11.5-7.1-22-9.4-31.7 h-0.2c-0.2,10.2-0.8,23.8-1.6,36.1l-2.2,35h-10l5.7-81.6h13.4l13.9,39.4c3.4,10,6.2,19,8.2,27.5h0.4c2.1-8.2,5-17.2,8.6-27.5 l14.5-39.4h13.4l5.1,81.6h-10.3L509.3,349z"/></symbol>`,
                width: 2,
                height: 3
            }

        } else {
            return {
                id: "spinalSingularityL",
                svg: `<symbol id="svg_spinalSingularityL" viewBox="313.5 30 333 500"><path fill="white" stroke="#000000" stroke-width="6.5931" stroke-miterlimit="10" d="M427.9,416.5c-9,11.3-14.3,25.6-14.3,41.2 c0,36.7,29.7,66.4,66.4,66.4s66.4-29.7,66.4-66.4c0-15.6-5.4-29.9-14.4-41.3"/><path fill="white" stroke="#000000" stroke-width="6.5931" stroke-miterlimit="10" d="M411.2,264.9c-17.7,17.7-28.7,42.1-28.7,69.1 c0,53.9,43.7,97.5,97.5,97.5s97.5-43.7,97.5-97.5c0-26.9-10.9-51.3-28.6-69"/><circle fill="white" stroke="#000000" stroke-width="6.5931" stroke-miterlimit="10" cx="480" cy="160.8" r="124.8"/><path d="M453.6,297.3h13.6v94.1h45.1v11.4h-58.7V297.3z"/></symbol>`,
                width: 2,
                height: 3
            }
        }
    }
}