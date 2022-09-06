import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Missile extends System {
    public modifier: "none" | "er" | "twostage" = "none";

    constructor(data: ISystem, ship: FullThrustShip) {
        super("missile", ship);
        if (data.hasOwnProperty("modifier")) {
            this.modifier = data.modifier as "er" | "twostage";
        }
    }

    fullName() {
        const name = "Heavy Missile";
        if (this.modifier === "er") {
            return name + " - Long Range";
        } else if (this.modifier === "twostage") {
            return name + " - Multistage";
        }
        return name;
    }

    mass() {
        if (this.modifier === "er") {
            return 3;
        } else if (this.modifier === "twostage") {
            return 4;
        } else {
            return 2;
        }
    }

    points() {
        if (this.modifier === "er") {
            return 9;
        } else if (this.modifier === "twostage") {
            return 12;
        } else {
            return 6;
        }
    }

    glyph() {
        switch (this.modifier) {
            case "er":
                return {
                    id: "missileER",
                    svg: `<symbol id="svg_missileER" viewBox="286.5 85 386 386"><polygon fill="black" stroke="#000000" stroke-width="12.7306" stroke-miterlimit="10" points="514.6,306.2 514.6,134.7 480,96.3  445.4,134.7 445.4,306.2 347.6,413.6 434.3,413.6 450.1,432.1 450.1,463.7 509.9,463.7 509.9,432.1 525.7,413.6 612.4,413.6"/></symbol>`,
                    width: 1,
                    height: 1
                };
            case "twostage":
                return {
                    id: "missileTwoStage",
                    svg: `<symbol id="svg_missileTwoStage" viewBox="286.5 85 386 386"><defs><symbol id="_internalTwoStage" viewBox="265 134 150 150"><polygon fill="white" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="386.2,230.5 339.9,140.5 293.6,230.5 324.5,216.7 293.6,275.5 339.9,245.3 386.2,275.5 355.9,216.7"/></symbol></defs><polygon fill="white" stroke="#000000" stroke-width="12.7306" stroke-miterlimit="10" points="514.6,306.2 514.6,134.7 480,96.3  445.4,134.7 445.4,306.2 347.6,413.6 434.3,413.6 450.1,432.1 450.1,463.7 509.9,463.7 509.9,432.1 525.7,413.6 612.4,413.6"/><use href="#_internalTwoStage" x="429" y="310" height="100" width="100" /></symbol>`,
                    height: 1,
                    width: 1
                };
            default:
                return {
                    id: "missile",
                    svg: `<symbol id="svg_missile" viewBox="286.5 85 386 386"><polygon fill="white" stroke="#000000" stroke-width="12.7306" stroke-miterlimit="10" points="514.6,306.2 514.6,134.7 480,96.3  445.4,134.7 445.4,306.2 347.6,413.6 434.3,413.6 450.1,432.1 450.1,463.7 509.9,463.7 509.9,432.1 525.7,413.6 612.4,413.6"/></symbol>`,
                    width: 1,
                    height: 1
                };
        }
   }
}