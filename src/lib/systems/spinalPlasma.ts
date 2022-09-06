import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

type Ranges = "short" | "medium" | "long";

export class SpinalPlasma extends System {
    public range: Ranges = "short";
    constructor(data: ISystem, ship: FullThrustShip) {
        super("spinalPlasma", ship);
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
        return this.mass() * 4;
    }

    glyph() {
        if (this.range === "short") {
            return {
                id: "spinalPlasmaS",
                svg: `<symbol id="svg_spinalPlasmaS" viewBox="360 100 240 360"><polyline fill="white" stroke="#000000" stroke-width="9" stroke-miterlimit="10" points="479.6,344.5 437.7,225.8 395.4,106.1 480,106.1 564.6,106.1 522.3,225.8 480.4,344.4"/><path d="M501.5,191c10.5-7,17.5-18.9,17.5-32.5c0-21.5-17.5-39-39-39s-39,17.5-39,39c0,13.6,6.9,25.5,17.5,32.5 c-5.5,5.5-9,13.2-9,21.6c0,10.9,5.7,20.4,14.2,25.8c-2.8,3.5-4.5,8-4.5,12.9c0,11.5,9.3,20.7,20.7,20.7s20.7-9.3,20.7-20.7 c0-4.9-1.7-9.3-4.5-12.9c8.5-5.4,14.2-14.9,14.2-25.8C510.5,204.2,507.1,196.6,501.5,191z"/><circle fill="none" stroke="#000000" stroke-width="9" stroke-miterlimit="10" cx="480" cy="397.9" r="56"/><path d="M462.7,418.9c3.7,2.3,9.1,4.2,14.8,4.2c8.5,0,13.4-4.5,13.4-10.9c0-6-3.4-9.4-12.1-12.7c-10.5-3.7-16.9-9.1-16.9-18.1 c0-10,8.3-17.4,20.7-17.4c6.6,0,11.3,1.5,14.2,3.1l-2.3,6.7c-2.1-1.1-6.4-3-12.2-3c-8.7,0-12.1,5.2-12.1,9.6 c0,6,3.9,8.9,12.7,12.4c10.8,4.2,16.3,9.4,16.3,18.8c0,9.9-7.3,18.4-22.4,18.4c-6.2,0-12.9-1.8-16.3-4.1L462.7,418.9z"/></symbol>`,
                width: 2,
                height: 3
            }
        } else if (this.range === "medium") {
            return {
                id: "spinalPlasmaM",
                svg: `<symbol id="svg_spinalPlasmaM" viewBox="360 100 240 360"><polyline fill="white" stroke="#000000" stroke-width="9" stroke-miterlimit="10" points="479.6,344.5 437.7,225.8 395.4,106.1 480,106.1 564.6,106.1 522.3,225.8 480.4,344.4"/><path d="M501.5,191c10.5-7,17.5-18.9,17.5-32.5c0-21.5-17.5-39-39-39s-39,17.5-39,39c0,13.6,6.9,25.5,17.5,32.5 c-5.5,5.5-9,13.2-9,21.6c0,10.9,5.7,20.4,14.2,25.8c-2.8,3.5-4.5,8-4.5,12.9c0,11.5,9.3,20.7,20.7,20.7s20.7-9.3,20.7-20.7 c0-4.9-1.7-9.3-4.5-12.9c8.5-5.4,14.2-14.9,14.2-25.8C510.5,204.2,507.1,196.6,501.5,191z"/><circle fill="none" stroke="#000000" stroke-width="9" stroke-miterlimit="10" cx="480" cy="397.9" r="56"/><path d="M503,399.6c-0.5-8.9-1-19.7-1-27.6h-0.3c-2.2,7.5-4.8,15.5-8.1,24.3l-11.3,31.1h-6.3l-10.4-30.5c-3-9-5.6-17.3-7.4-24.9 h-0.2c-0.2,8-0.7,18.7-1.2,28.3l-1.7,27.5h-7.9l4.5-64h10.5l10.9,31c2.7,7.9,4.8,14.9,6.5,21.6h0.3c1.6-6.5,3.9-13.5,6.7-21.6 l11.4-31h10.5l4,64h-8.1L503,399.6z"/></symbol>`,
                width: 2,
                height: 3
            }

        } else {
            return {
                id: "spinalPlasmaL",
                svg: `<symbol id="svg_spinalPlasmaL" viewBox="360 100 240 360"><polyline fill="white" stroke="#000000" stroke-width="9" stroke-miterlimit="10" points="479.6,344.5 437.7,225.8 395.4,106.1 480,106.1 564.6,106.1 522.3,225.8 480.4,344.4"/><path d="M501.5,191c10.5-7,17.5-18.9,17.5-32.5c0-21.5-17.5-39-39-39s-39,17.5-39,39c0,13.6,6.9,25.5,17.5,32.5 c-5.5,5.5-9,13.2-9,21.6c0,10.9,5.7,20.4,14.2,25.8c-2.8,3.5-4.5,8-4.5,12.9c0,11.5,9.3,20.7,20.7,20.7s20.7-9.3,20.7-20.7 c0-4.9-1.7-9.3-4.5-12.9c8.5-5.4,14.2-14.9,14.2-25.8C510.5,204.2,507.1,196.6,501.5,191z"/><circle fill="none" stroke="#000000" stroke-width="9" stroke-miterlimit="10" cx="480" cy="397.9" r="56"/><path d="M465.2,364.1h8.3v57.1h27.4v6.9h-35.6V364.1z"/></symbol>`,
                width: 2,
                height: 3
            }
        }
    }
}