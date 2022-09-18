import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

type Ranges = "short" | "medium" | "long";

export class SpinalBeam extends System {
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
        return this.mass() * 4;
    }

    glyph() {
        if (this.range === "short") {
            return {
                id: "spinalBeamS",
                svg: `<symbol id="svg_spinalBeamS" viewBox="290 5 380 570"><polygon fill="white" stroke="#000000" stroke-width="18.714" stroke-miterlimit="10" points="480,529 392,279.9 304.1,31 480,31 655.9,31 568,279.9 "/><path fill="white" stroke="#000000" stroke-width="11.6523" stroke-miterlimit="10" d="M448.4,300.4c-5.4,6.9-8.7,15.5-8.7,25 c0,22.3,18,40.3,40.3,40.3c22.3,0,40.3-18,40.3-40.3c0-9.5-3.3-18.2-8.7-25"/><path fill="white" stroke="#000000" stroke-width="11.6523" stroke-miterlimit="10" d="M438.2,208.4c-10.8,10.7-17.4,25.5-17.4,41.9 c0,32.7,26.5,59.2,59.2,59.2s59.2-26.5,59.2-59.2c0-16.3-6.6-31.1-17.3-41.8"/><circle fill="white" stroke="#000000" stroke-width="11.6523" stroke-miterlimit="10" cx="480" cy="145.2" r="75.7"/><path d="M450.9,183c6.2,3.8,15.4,7,25,7c14.2,0,22.6-7.5,22.6-18.4c0-10.1-5.8-15.8-20.3-21.5c-17.6-6.2-28.5-15.4-28.5-30.6 c0-16.8,13.9-29.3,34.9-29.3c11,0,19.1,2.6,23.9,5.3l-3.8,11.4c-3.5-1.9-10.7-5.1-20.5-5.1c-14.7,0-20.3,8.8-20.3,16.2 c0,10.1,6.6,15,21.5,20.8c18.3,7,27.5,15.8,27.5,31.7c0,16.6-12.3,31.1-37.8,31.1c-10.4,0-21.8-3-27.5-6.9L450.9,183z"/></symbol>`,
                width: 2,
                height: 3
            }
        } else if (this.range === "medium") {
            return {
                id: "spinalBeamM",
                svg: `<symbol id="svg_spinalBeamM" viewBox="290 5 380 570"><polygon fill="white" stroke="#000000" stroke-width="18.714" stroke-miterlimit="10" points="480,529 392,279.9 304.1,31 480,31 655.9,31 568,279.9 "/><path fill="white" stroke="#000000" stroke-width="11.6523" stroke-miterlimit="10" d="M448.4,300.4c-5.4,6.9-8.7,15.5-8.7,25 c0,22.3,18,40.3,40.3,40.3c22.3,0,40.3-18,40.3-40.3c0-9.5-3.3-18.2-8.7-25"/><path fill="white" stroke="#000000" stroke-width="11.6523" stroke-miterlimit="10" d="M438.2,208.4c-10.8,10.7-17.4,25.5-17.4,41.9 c0,32.7,26.5,59.2,59.2,59.2s59.2-26.5,59.2-59.2c0-16.3-6.6-31.1-17.3-41.8"/><circle fill="white" stroke="#000000" stroke-width="11.6523" stroke-miterlimit="10" cx="480" cy="145.2" r="75.7"/><path d="M510.7,148.1c-0.6-11.9-1.4-26.2-1.3-36.9H509c-2.9,10-6.5,20.6-10.8,32.4l-15.1,41.4h-8.4L461,144.4 c-4.1-12-7.5-23.1-9.9-33.2h-0.3c-0.3,10.6-0.9,25-1.6,37.8l-2.3,36.6h-10.5l6-85.4h14.1l14.6,41.3c3.5,10.5,6.5,19.9,8.6,28.8h0.4 c2.2-8.6,5.2-18,9-28.8l15.2-41.3h14.1l5.3,85.4h-10.8L510.7,148.1z"/></symbol>`,
                width: 2,
                height: 3
            }

        } else {
            return {
                id: "spinalBeamL",
                svg: `<symbol id="svg_spinalBeamL" viewBox="290 5 380 570"><polygon fill="white" stroke="#000000" stroke-width="18.714" stroke-miterlimit="10" points="480,529 392,279.9 304.1,31 480,31 655.9,31 568,279.9 "/><path fill="white" stroke="#000000" stroke-width="11.6523" stroke-miterlimit="10" d="M448.4,300.4c-5.4,6.9-8.7,15.5-8.7,25 c0,22.3,18,40.3,40.3,40.3c22.3,0,40.3-18,40.3-40.3c0-9.5-3.3-18.2-8.7-25"/><path fill="white" stroke="#000000" stroke-width="11.6523" stroke-miterlimit="10" d="M438.2,208.4c-10.8,10.7-17.4,25.5-17.4,41.9 c0,32.7,26.5,59.2,59.2,59.2s59.2-26.5,59.2-59.2c0-16.3-6.6-31.1-17.3-41.8"/><circle fill="white" stroke="#000000" stroke-width="11.6523" stroke-miterlimit="10" cx="480" cy="145.2" r="75.7"/><path d="M453.1,97.2h12.5v86.1h41.3v10.5h-53.7V97.2z"/></symbol>`,
                width: 2,
                height: 3
            }
        }
    }
}