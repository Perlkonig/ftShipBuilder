import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Suicide extends System {
    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
    }

    fullName() {
        return "Antimatter Suicide Charge";
    }

    mass() {
        return 1;
    }

    points() {
        return 5;
    }

    glyph() {
        return {
            id: "suicide",
            svg: `<symbol id="svg_suicide" viewBox="195 -5 569 569"><polygon fill="white" stroke="#000000" stroke-width="21" stroke-miterlimit="10" points="299.5,515.5 207.5,424.2 207.5,116.8 298.6,44.5 676.9,44.5 751.5,118.8 751.5,422.5 677.8,515.5 "/><path d="M480,112.9c-92.3,0-167.1,74.8-167.1,167.1S387.7,447.1,480,447.1S647.1,372.3,647.1,280S572.3,112.9,480,112.9z M480,152 h78.4l-39.2,64l-39.2,64l-39.2-64l-39.2-64H480z M597.2,344.1L558,408.2l-39.2-64.1L480,280.6L441.2,344l-39.2,64l-39.2-64l-39.2-64 H402h77.6h0.7H558h78.4L597.2,344.1z"/></symbol>`,
            height: 2,
            width: 2
        }
    }
}