import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";
import type { ISystemSVG } from "../svgLib";

export class MineLayer extends System {
    public capacity = 2;
    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("capacity")) {
            this.capacity = data.capacity as number;
        }
    }

    fullName() {
        return "Mine Layer";
    }

    mass() {
        return 2 + this.capacity;
    }

    points() {
        return 6 + (2 * this.capacity);
    }

    individualMine(): ISystemSVG {
        return {
            id: "mineIndividual",
            svg: `<symbol id="svg_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol>`,
            width: 1,
            height: 1
        }
    }

    glyph() {
        let capacity = this.capacity;
        if (capacity > 9) {
            capacity = 9;
        }
        switch (capacity) {
            case 2:
                return {
                    id: "mineLayer2",
                    svg: `<symbol id="svg_mineLayer2" viewBox="-7 -12 179 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="165" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/></symbol>`,
                    height: 3,
                    width: 1
                }
            case 3:
                return {
                    id: "mineLayer3",
                    svg: `<symbol id="svg_mineLayer3" viewBox="-7 -12 179 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="165" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/></symbol>`,
                    height: 3,
                    width: 1
                }
            case 4:
                return {
                    id: "mineLayer4",
                    svg: `<symbol id="svg_mineLayer4" viewBox="-19 -12 358 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="320" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/></symbol>`,
                    height: 3,
                    width: 2
                }
            case 5:
                return {
                    id: "mineLayer5",
                    svg: `<symbol id="svg_mineLayer5" viewBox="-19 -12 358 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="320" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/></symbol>`,
                    height: 3,
                    width: 2
                }
            case 6:
                return {
                    id: "mineLayer6",
                    svg: `<symbol id="svg_mineLayer6" viewBox="-19 -12 358 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="320" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="358.25" width="130" height="130"/></symbol>`,
                    height: 3,
                    width: 2
                }
            case 7:
                return {
                    id: "mineLayer7",
                    svg: `<symbol id="svg_mineLayer7" viewBox="-33 -12 537 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="470" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="24.75" width="130" height="130"/></symbol>`,
                    height: 3,
                    width: 3
                }
            case 8:
                return {
                    id: "mineLayer8",
                    svg: `<symbol id="svg_mineLayer8" viewBox="-33 -12 537 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="470" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="191.5" width="130" height="130"/></symbol>`,
                    height: 3,
                    width: 3
                }
            case 9:
                return {
                    id: "mineLayer9",
                    svg: `<symbol id="svg_mineLayer9" viewBox="-33 -12 537 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="470" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="358.25" width="130" height="130"/></symbol>`,
                    height: 3,
                    width: 3
                }
        }
    }
}
