import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem, Arc, ArcNum } from "./_base";
import { genHex } from "../genHex";

type Class = 1|2|3|4|5|6;

export class Kgun extends System {
    public class: Class = 1;
    public leftArc: Arc = "F";
    public numArcs: ArcNum = 1;
    public modifier: "none" | "short" | "long" = "none";

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("modifier")) {
            this.modifier = data.modifier as "none" | "short" | "long";
        }

        if (data.hasOwnProperty("class")) {
            this.class = data.class as Class;
        }
        if (this.class < 1) {
            this.class = 1;
            data.class = 1;
        } else if (this.class > 6) {
            this.class = 6;
            data.class = 6;
        }

        if (data.hasOwnProperty("leftArc")) {
            this.leftArc = data.leftArc as Arc;
        }
        if (data.hasOwnProperty("numArcs")) {
            this.numArcs = data.numArcs as ArcNum;
        }

        // validate arcs
        switch (this.class) {
            case 1:
                this.numArcs = 6;
                data.numArcs = 6;
                break;
            case 2:
                if (this.numArcs > 2) {
                    this.numArcs = 2;
                    data.numArcs = 2;
                }
                break;
            case 3:
            case 4:
            case 5:
            case 6:
                this.numArcs = 1;
                data.numArcs = 1;
                break;
        }
    }

    fullName() {
        return `Class ${this.class} ${this.modifier === "short" ? "Short-Range " : ""}${this.modifier === "long" ? "Long-Range " : ""}K-Gun`;
    }

    mass() {
        if (this.modifier === "short") {
            switch (this.class) {
                case 1:
                    return 1.5;
                case 2:
                    return 2;
                case 3:
                    return 3;
                case 4:
                    return 4;
                case 5:
                    return 6;
                case 6:
                    return 7;
            }
        } else if (this.modifier === "long") {
            switch (this.class) {
                case 1:
                    return 4;
                case 2:
                    return 6 + (2 * (this.numArcs - 1));
                case 3:
                    return 10;
                case 4:
                    return 16;
                case 5:
                    return 22;
                case 6:
                    return 28;
            }
        } else {
            switch (this.class) {
                case 1:
                    return 2;
                case 2:
                    return 3 + (this.numArcs - 1);
                case 3:
                    return 5;
                case 4:
                    return 8;
                case 5:
                    return 11;
                case 6:
                    return 14;
            }
        }
    }

    points() {
        return this.mass() * 4;
    }

    glyph() {
        let mod = "";
        let insert = `<text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300" stroke="black" fill="black">${this.class}</text>`;
        if (this.modifier === "long") {
            mod = "L";
            insert = `<text x="300" y="325" dominant-baseline="middle" text-anchor="middle" font-size="300" stroke="white" fill="white">${this.class}</text>`;
        } else if (this.modifier === "short") {
            mod = "S";
            insert = `<line x1="300" y1="478.4878357199728" x2="300" y2="736.6825428220194" stroke-width="20" stroke-miterlimit="10" stroke="black" />` + insert;
        }
        const id = `kgun${this.class}${mod}${this.leftArc}${this.numArcs}`;
        let svg = genHex(id, this.numArcs, this.leftArc, undefined, insert);
        // If long range, fill the centre hex
        if (this.modifier === "long") {
            svg = svg.replace(`<polygon points="403.05,478.4878357199728 196.95000000000005,478.48783571997285 93.9,300 196.94999999999993,121.51216428002724 403.05,121.5121642800272 506.1,299.99999999999994" fill="white" fill-opacity="0" stroke="#000000" stroke-width="20" stroke-miterlimit="10"/>`, `<polygon points="403.05,478.4878357199728 196.95000000000005,478.48783571997285 93.9,300 196.94999999999993,121.51216428002724 403.05,121.5121642800272 506.1,299.99999999999994" fill="black" fill-opacity="1" stroke="#000000" stroke-width="20" stroke-miterlimit="10"/>`);
        // If short range, change the viewbox
        } else if (this.modifier === "short") {
            svg = svg.replace(`viewBox="-1 -1 602 602"`, `viewBox="-26 24 652 652"`);
        }

        return {
            id,
            svg,
            height: 2,
            width: 2
        }
    }
}