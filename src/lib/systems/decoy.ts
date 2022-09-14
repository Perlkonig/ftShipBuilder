import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Decoy extends System {
    public type: "cruiser" | "capital" = "cruiser";

    constructor(data: ISystem, ship: FullThrustShip) {
        super("decoy", ship);
        if (data.hasOwnProperty("type")) {
            this.type = data.type as "cruiser" | "capital";
        }
    }

    fullName() {
        if (this.type === "cruiser") {
            return "Cruiser Decoy";
        } else if (this.type === "capital") {
            return "Capital Decoy";
        }
    }

    mass() {
        if (this.type === "cruiser") {
            return 2;
        } else {
            return 4;
        }
    }

    points() {
        return this.mass() * 4;
    }

    glyph() {
        switch (this.type) {
            case "cruiser":
                return {
                    id: "decoyCruiser",
                    svg: `<symbol id="svg_decoyCruiser" viewBox="190 -9 580 580"><path fill="white" stroke="#000000" stroke-width="18.4819" stroke-miterlimit="10" d="M208.8,200.6C278.2,131.2,374.1,88.3,480,88.3c105.9,0,201.8,42.9,271.2,112.3L480,471.8L208.8,200.6z"/><circle fill="white" stroke="#000000" stroke-width="17" stroke-miterlimit="10" cx="480" cy="252.3" r="57.4"/></symbol>`,
                    height: 1,
                    width: 1
                };
            case "capital":
                return {
                    id: "decoyCapital",
                    svg: `<symbol id="svg_decoyCapital" viewBox="190 -9 580 580"><path fill="none" stroke="#000000" stroke-width="18.4819" stroke-miterlimit="10" d="M208.8,200.6C278.2,131.2,374.1,88.3,480,88.3c105.9,0,201.8,42.9,271.2,112.3L480,471.8L208.8,200.6z"/><circle cx="480" cy="252.3" r="88.9" fill="black"/></symbol>`,
                    height: 1,
                    width: 1
                };
        }
    }
}