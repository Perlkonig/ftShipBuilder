import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc, ArcNum } from "./_base";
import { genArcs } from "../genArcs";

export class TorpedoPulse extends System {
    public leftArc: Arc = "F";
    public numArcs: ArcNum = 1;
    public modifier: "none" | "short" | "long" = "none";

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("leftArc")) {
            this.leftArc = data.leftArc as Arc;
        }
        if (data.hasOwnProperty("numArcs")) {
            this.numArcs = data.numArcs as ArcNum;
        }
        if (data.hasOwnProperty("modifier")) {
            this.modifier = data.modifier as "none" | "short" | "long";
        }

        if (this.numArcs > 3) {
            this.numArcs = 3;
            data.numArcs = 3;
        }

    }

    fullName() {
        return `${this.modifier === "short" ? "Short-Range " : ""}${this.modifier === "long" ? "Long-Range " : ""}Pulse Torpedos`;
    }

    mass() {
        if (this.modifier === "short") {
            return 2 + Math.ceil((this.numArcs - 1) / 2)
        } else if (this.modifier === "long") {
            return 8 + (2 * (this.numArcs - 1));
        } else {
            return 4 + (this.numArcs - 1);
        }
    }

    points() {
        return this.mass() * 3;
    }

    glyph() {
        let mod = "";
        let defs = `<symbol id="_internalTorpedo" viewBox="420 87 120 390"><rect x="430" y="96.4" fill="none" stroke="#000000" stroke-width="15.6192" stroke-miterlimit="10" width="100.1" height="371.1"/><rect x="426.7" y="92.6" width="106.7" height="189.3"/></symbol>`;
        if (this.modifier === "long") {
            mod = "L";
            defs = `<symbol id="_internalTorpedoL" viewBox="420 87 120 390"><rect x="430" y="96.4" fill="none" stroke="#000000" stroke-width="15.6192" stroke-miterlimit="10" width="100.1" height="371.1"/><path d="M427,93v189h106V93H427z M523,246h-75V113h18v119h57V246z"/></symbol>`;
        } else if (this.modifier === "short") {
            mod = "S";
            defs = `<symbol id="_internalTorpedoS" viewBox="420 87 120 390"><rect x="430" y="96.4" fill="none" stroke="#000000" stroke-width="15.6192" stroke-miterlimit="10" width="100.1" height="371.1"/><path d="M427,93v189h106V93H427z M475.6,257.3c-12.9,0-27-3.8-34.1-8.5l4.4-14.5c7.7,4.8,19.1,8.7,31,8.7c17.7,0,28-9.3,28-22.8c0-12.5-7.1-19.7-25.2-26.6c-21.8-7.7-35.3-19.1-35.3-37.9c0-20.8,17.3-36.3,43.3-36.3c13.7,0,23.6,3.2,29.6,6.5l-4.8,14.1c-4.4-2.4-13.3-6.4-25.4-6.4c-18.3,0-25.2,10.9-25.2,20c0,12.5,8.1,18.7,26.6,25.8c22.6,8.7,34.1,19.6,34.1,39.3C522.5,239.4,507.2,257.3,475.6,257.3z"/></symbol>`
        }
        const id = `torpedo${mod}${this.leftArc}${this.numArcs}`;
        const insert = `<use href="#_internalTorpedo${mod}" x="125" y="125" width="350" height="350" />`;
        let svg = genArcs(id, this.numArcs, this.leftArc, defs, insert);
        return {
            id,
            svg,
            height: 2,
            width: 2
        }
    }
}