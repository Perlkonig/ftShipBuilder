import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc } from "./_base";

export class Mkp extends System {
    public arc: Arc = "F";

    constructor(data: ISystem, ship: FullThrustShip) {
        super("mkp", ship);
        if (data.hasOwnProperty("arc")) {
            this.arc = data.arc as Arc;
        }
    }

    fullName() {
        return "Multiple Kinetic Penetrator";
    }

    mass() {
        return 1;
    }

    points() {
        return 4;
    }

    glyph() {
        switch (this.arc) {
            case "FP":
                return {
                    id: "mkpFP",
                    svg: `<symbol id="svg_mkpFP" viewBox="275 78 410 410"><g transform="rotate(300, 480, 282)"><polygon fill="white" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="401.7,467.5 323.5,331.5 401.7,195.5  558.3,195.5 636.5,331.5 558.3,467.5"/><polygon stroke="#000000" stroke-miterlimit="10" points="480,329.3 556.9,94.5 403.1,94.5 480,329.3 556.9,94.5 403.1,94.5"/></g></symbol>`,
                    width: 1,
                    height: 1
                };
            case "F":
                return {
                    id: "mkpF",
                    svg: `<symbol id="svg_mkpF" viewBox="290 92 380 380"><g><polygon fill="white" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="401.7,467.5 323.5,331.5 401.7,195.5  558.3,195.5 636.5,331.5 558.3,467.5"/><polygon stroke="#000000" stroke-miterlimit="10" points="480,329.3 556.9,94.5 403.1,94.5 480,329.3 556.9,94.5 403.1,94.5"/></g></symbol>`,
                    width: 1,
                    height: 1
                };
            case "FS":
                return {
                    id: "mkpFS",
                    svg: `<symbol id="svg_mkpFS" viewBox="275 78 410 410"><g transform="rotate(60, 480, 282)"><polygon fill="white" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="401.7,467.5 323.5,331.5 401.7,195.5  558.3,195.5 636.5,331.5 558.3,467.5"/><polygon stroke="#000000" stroke-miterlimit="10" points="480,329.3 556.9,94.5 403.1,94.5 480,329.3 556.9,94.5 403.1,94.5"/></g></symbol>`,
                    width: 1,
                    height: 1
                };
            case "AS":
                return {
                    id: "mkpAS",
                    svg: `<symbol id="svg_mkpAS" viewBox="275 78 410 410"><g transform="rotate(120, 480, 282)"><polygon fill="white" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="401.7,467.5 323.5,331.5 401.7,195.5  558.3,195.5 636.5,331.5 558.3,467.5"/><polygon stroke="#000000" stroke-miterlimit="10" points="480,329.3 556.9,94.5 403.1,94.5 480,329.3 556.9,94.5 403.1,94.5"/></g></symbol>`,
                    height: 1,
                    width: 1
                };
            case "A":
                return {
                    id: "mkpA",
                    svg: `<symbol id="svg_mkpA" viewBox="290 92 380 380"><g transform="rotate(180, 480, 282)"><polygon fill="white" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="401.7,467.5 323.5,331.5 401.7,195.5  558.3,195.5 636.5,331.5 558.3,467.5"/><polygon stroke="#000000" stroke-miterlimit="10" points="480,329.3 556.9,94.5 403.1,94.5 480,329.3 556.9,94.5 403.1,94.5"/></g></symbol>`,
                    height: 1,
                    width: 1
                };
            case "AP":
                return {
                    id: "mkpAP",
                    svg: `<symbol id="svg_mkpAP" viewBox="275 78 410 410"><g transform="rotate(240, 480, 282)"><polygon fill="white" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="401.7,467.5 323.5,331.5 401.7,195.5  558.3,195.5 636.5,331.5 558.3,467.5"/><polygon stroke="#000000" stroke-miterlimit="10" points="480,329.3 556.9,94.5 403.1,94.5 480,329.3 556.9,94.5 403.1,94.5"/></g></symbol>`,
                    width: 1,
                    height: 1
                };
        }
    }
}