import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc, ArcNum } from "./_base";
import { genArcs } from "../genArcs";

export class Particle extends System {
    public leftArc: Arc = "F";
    public numArcs: ArcNum = 6;

    constructor(data: ISystem, ship: FullThrustShip) {
        super("particle", ship);
        if (data.hasOwnProperty("leftArc")) {
            this.leftArc = data.leftArc as Arc;
        }
        if (data.hasOwnProperty("numArcs")) {
            this.numArcs = data.numArcs as ArcNum;
        }

        if ( (this.numArcs > 3) && (this.numArcs < 6) ) {
            this.numArcs = 3;
        } else if (this.numArcs > 6) {
            this.numArcs = 6;
            data.numArcs = 6;
        } else if (this.numArcs === 2) {
            if ( (this.leftArc !== "AP") && (this.leftArc !== "FS") ) {
                this.leftArc = "AP";
                data.leftArc = "AP";
            }
        }
    }

    fullName() {
        return `Twin Particle Array`;
    }

    mass() {
        switch (this.numArcs) {
            case 1:
                return 2;
            case 2:
                return 2.5;
            case 3:
                return 3;
            case 6:
                return 4;
        }
    }

    points() {
        return this.mass() * 4;
    }

    glyph() {
        const id = `particle${this.leftArc}${this.numArcs}`;
        const insert = `<use href="#_internalParticle" x="87.5" y="87.5" width="425" height="425"/>`;
        const defs = `<symbol id="_internalParticle" viewBox="369 230 225 102"><path d="M370.8,307h218.3c0,0-31.6,83.1-108.7,83.1S370.8,307,370.8,307z"/><polyline points="436,331 436,231 466,231 466,331"/><polyline points="483,300 421,300 421,285 483,285"/><polyline points="491,331 491,231 521,231 521,331"/><polyline points="538,300 476,300 476,285 538,285"/></symbol>`;
        let svg = genArcs(id, this.numArcs, this.leftArc, defs, insert);
        return {
            id,
            svg,
            height: 2,
            width: 2
        }
    }
}
