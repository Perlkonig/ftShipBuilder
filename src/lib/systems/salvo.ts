import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Salvo extends System {
    public modifier: "none" | "er" | "twostage" = "none";

    constructor(data: ISystem, ship: FullThrustShip) {
        super("salvo", ship);
        if (data.hasOwnProperty("modifier")) {
            this.modifier = data.modifier as "er" | "twostage";
        }
    }

    fullName() {
        const name = "Salvo Missile Rack (single-use)";
        if (this.modifier === "er") {
            return name + " - Long Range";
        } else if (this.modifier === "twostage") {
            return name + " - Multistage";
        }
        return name;
    }

    mass() {
        if (this.modifier === "er") {
            return 5;
        } else if (this.modifier === "twostage") {
            return 6;
        } else {
            return 4;
        }
    }

    points() {
        if (this.modifier === "er") {
            return 15;
        } else if (this.modifier === "twostage") {
            return 18;
        } else {
            return 12;
        }
    }

    glyph() {
        switch (this.modifier) {
            case "er":
                return {
                    id: "salvoER",
                    svg: `<symbol id="svg_salvoER" viewBox="385 85.5 190 190"><g><path fill="none" stroke="#000000" stroke-width="3.5245" stroke-miterlimit="10" d="M480,107.4c-50.6,0-91.6,41-91.6,91.6h36.4 c0-30.5,24.7-55.2,55.2-55.2s55.2,24.7,55.2,55.2h36.4C571.7,148.5,530.7,107.4,480,107.4z"/><line fill="none" stroke="#000000" stroke-width="9.1569" stroke-miterlimit="10" x1="535.3" y1="194.7" x2="571.7" y2="194.7"/><line fill="none" stroke="#000000" stroke-width="9.1569" stroke-miterlimit="10" x1="424.8" y1="194.7" x2="388.3" y2="194.7"/><line fill="none" stroke="#000000" stroke-width="10.5735" stroke-miterlimit="10" x1="507.5" y1="151.3" x2="525.8" y2="119.7"/><line fill="none" stroke="#000000" stroke-width="10.5735" stroke-miterlimit="10" x1="452.3" y1="151.3" x2="434.1" y2="119.7"/></g><circle fill="white" stroke="#000000" stroke-width="3.4671" stroke-miterlimit="10" cx="480" cy="199.1" r="55.2"/><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol>`,
                    width: 2,
                    height: 2
                };
            case "twostage":
                return {
                    id: "salvoTwoStage",
                    svg: `<symbol id="svg_salvoTwoStage" viewBox="385 85.5 190 190"><defs><symbol id="_internalMultistage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><g><path fill="none" stroke="#000000" stroke-width="3.5245" stroke-miterlimit="10" d="M480,107.4c-50.6,0-91.6,41-91.6,91.6h36.4 c0-30.5,24.7-55.2,55.2-55.2s55.2,24.7,55.2,55.2h36.4C571.7,148.5,530.7,107.4,480,107.4z"/><line fill="none" stroke="#000000" stroke-width="9.1569" stroke-miterlimit="10" x1="535.3" y1="194.7" x2="571.7" y2="194.7"/><line fill="none" stroke="#000000" stroke-width="9.1569" stroke-miterlimit="10" x1="424.8" y1="194.7" x2="388.3" y2="194.7"/><line fill="none" stroke="#000000" stroke-width="10.5735" stroke-miterlimit="10" x1="507.5" y1="151.3" x2="525.8" y2="119.7"/><line fill="none" stroke="#000000" stroke-width="10.5735" stroke-miterlimit="10" x1="452.3" y1="151.3" x2="434.1" y2="119.7"/></g><circle fill="white" stroke="#000000" stroke-width="3.4671" stroke-miterlimit="10" cx="480" cy="199.1" r="55.2"/><use href="#_internalMultistage" x="435" y="150" width="90" height="90" /></symbol>`,
                    width: 2,
                    height: 2
                };
            default:
                return {
                    id: "salvo",
                    svg: `<symbol id="svg_salvo" viewBox="385 85.5 190 190"><g><path fill="none" stroke="#000000" stroke-width="3.5245" stroke-miterlimit="10" d="M480,107.4c-50.6,0-91.6,41-91.6,91.6h36.4 c0-30.5,24.7-55.2,55.2-55.2s55.2,24.7,55.2,55.2h36.4C571.7,148.5,530.7,107.4,480,107.4z"/><line fill="none" stroke="#000000" stroke-width="9.1569" stroke-miterlimit="10" x1="535.3" y1="194.7" x2="571.7" y2="194.7"/><line fill="none" stroke="#000000" stroke-width="9.1569" stroke-miterlimit="10" x1="424.8" y1="194.7" x2="388.3" y2="194.7"/><line fill="none" stroke="#000000" stroke-width="10.5735" stroke-miterlimit="10" x1="507.5" y1="151.3" x2="525.8" y2="119.7"/><line fill="none" stroke="#000000" stroke-width="10.5735" stroke-miterlimit="10" x1="452.3" y1="151.3" x2="434.1" y2="119.7"/></g><circle fill="white" stroke="#000000" stroke-width="3.4671" stroke-miterlimit="10" cx="480" cy="199.1" r="55.2"/><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol>`,
                    width: 2,
                    height: 2
                };
        }
   }
}