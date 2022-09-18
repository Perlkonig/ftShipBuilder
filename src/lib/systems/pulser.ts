import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc, ArcNum } from "./_base";
import { arcList } from "../genArcs";

type Range = "undefined" | "long" | "medium" | "short";

export class Pulser extends System {
    public leftArc: Arc = "F";
    public numArcs: ArcNum = 6;
    public range: Range = "undefined";

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("leftArc")) {
            this.leftArc = data.leftArc as Arc;
        }
        if (data.hasOwnProperty("numArcs")) {
            this.numArcs = data.numArcs as ArcNum;
        }

        if (this.numArcs < 1) {
            this.numArcs = 1;
            data.numArcs = 1;
        } else if (this.numArcs === 2) {
            this.numArcs = 3;
        } else if ( (this.numArcs > 3) && (this.numArcs < 6) ) {
            this.numArcs = 6;
        } else if (this.numArcs > 6) {
            this.numArcs = 6;
            data.numArcs = 6;
        }
    }

    fullName() {
        let mod: string;
        switch (this.range) {
            case "long":
                mod = "Long Range";
                break;
            case "short":
                mod = "Short Range";
                break;
            case "medium":
                mod = "Medium Range";
                break;
            default:
                mod = "Undefined Range";
                break;
        }
        return `Pulser - ${mod}`;
    }

    mass() {
        if (this.numArcs === 1) {
            return 2;
        } else if (this.numArcs === 3) {
            return 3;
        } else {
            return 4;
        }
    }

    points() {
        return this.mass() * 5;
    }

    glyph() {
        const points: [Arc, string][] = [
            ["F", "300,17 218.3048,158.5 381.6952,158.5"],
            ["FS", "545.0852,158.5 381.6952,158.5 463.3902,300"],
            ["AS", "545.0852,441.5 463.3902,300 381.6952,441.5"],
            ["A", "300,583 381.6952,441.5 218.3048,441.5"],
            ["AP", "54.9148,441.5 218.3048,441.5 136.6098,300"],
            ["FP", "54.9148,158.5 136.6098,300 218.3048,158.5"],
        ];

        const id = `pulser${this.leftArc}${this.numArcs}`;
        let insert = "";
        const arcs = arcList(this.leftArc, this.numArcs);
        for (const pair of points) {
            if (! arcs.includes(pair[0])) {
                insert += `<polygon points="${pair[1]}" stroke="black" fill="black"/>`;
            }
        }
        let svg = `<symbol id="svg_${id}" viewBox="-1 -1 602 602"><polygon points="54.9148,158.5 545.0852,158.5 300,583" stroke-width="10" stroke="black" fill="white"/><polygon points="54.9148,441.5 545.0852,441.5 300,17" stroke-width="10" stroke="black" fill="none"/>${insert}</symbol>`;
        return {
            id,
            svg,
            height: 2,
            width: 2
        }
    }
}