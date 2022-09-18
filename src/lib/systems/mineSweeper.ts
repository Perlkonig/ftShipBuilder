import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class MineSweeper extends System {
    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
    }

    fullName() {
        return "Mine Sweeper";
    }

    mass() {
        return 5;
    }

    points() {
        return 15;
    }

    glyph() {
        return {
            id: "mineSweeper",
            svg: `<symbol id="svg_mineSweeper" viewBox="255 55 450 450"><g><path d="M373.4,501.7V386.6H258.3v-71h115.1v-71H258.3v-71h115.1V58.3h71v115.2h71V58.3h71v115.2h115.2v71H586.5v71h115.2v71H586.5 v115.1h-71V386.6h-71v115.1H373.4z"/></g></symbol>`,
            height: 1,
            width: 1
        }
    }
}