import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";
import type { ISystemSVG } from "../svgLib";

export class Magazine extends System {
    public modifier: "none" | "er" | "twostage" = "none";
    public capacity = 2;
    public id: string;

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("capacity")) {
            this.capacity = data.capacity as number;
        }
        if (data.hasOwnProperty("modifier")) {
            this.modifier = data.modifier as "er" | "twostage";
        }
        if (data.hasOwnProperty("id")) {
            this.id = data.id as string;
        }
    }

    fullName() {
        const name = "Salvo Missile Magazine";
        if (this.modifier === "er") {
            return name + " - Long Range";
        } else if (this.modifier === "twostage") {
            return name + " - Multistage";
        }
        return name;
    }

    mass() {
        if (this.modifier === "er") {
            return 3 * this.capacity;
        } else if (this.modifier === "twostage") {
            return 4 * this.capacity;
        } else {
            return 2 * this.capacity;
        }
    }

    points() {
        if (this.modifier === "er") {
            return 9 * this.capacity;
        } else if (this.modifier === "twostage") {
            return 12 * this.capacity;
        } else {
            return 6 * this.capacity;
        }
    }

    missileGlyph(): ISystemSVG {
        if (this.modifier === "er") {
            return {
                id: `individualSalvoER`,
                svg: `<symbol id="svg_individualSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol>`,
                width: 1,
                height: 1
            };
        } else if (this.modifier === "twostage") {
            return {
                id: `individualSalvoMS`,
                svg: `<symbol id="svg_individualSalvoMS" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol>`,
                width: 1,
                height: 1
            };
        } else {
            return {
                id: `individualSalvo`,
                svg: `<symbol id="svg_individualSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol>`,
                width: 1,
                height: 1
            };
        }
    }

    glyph() {
        let capacity = this.capacity;
        if (capacity > 9) {
            capacity = 9;
        }
        if (this.modifier === "er") {
            switch (capacity) {
                case 1:
                    return {
                        id: "magazineER1",
                        svg: `<symbol id="svg_magazineER2" viewBox="-1 -1 22 12"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="20" height="10" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /></symbol>`,
                        width: 2,
                        height: 1
                    };
                case 2:
                    return {
                        id: "magazineER2",
                        svg: `<symbol id="svg_magazineER2" viewBox="-1 -1 22 12"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="20" height="10" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /></symbol>`,
                        width: 2,
                        height: 1
                    };
                case 3:
                    return {
                        id: "magazineER3",
                        svg: `<symbol id="svg_magazineER3" viewBox="-1 -1 32 12"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="10" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="0" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 1
                    };
                case 4:
                    return {
                        id: "magazineER4",
                        svg: `<symbol id="svg_magazineER4" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="10" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 2
                    };
                case 5:
                    return {
                        id: "magazineER5",
                        svg: `<symbol id="svg_magazineER5" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="10" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 2
                    };
                case 6:
                    return {
                        id: "magazineER6",
                        svg: `<symbol id="svg_magazineER6" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="10" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 2
                    };
                case 7:
                    return {
                        id: "magazineER7",
                        svg: `<symbol id="svg_magazineER7" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="20" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 3
                    };
                case 8:
                    return {
                        id: "magazineER8",
                        svg: `<symbol id="svg_magazineER8" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="20" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="20" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 3
                    };
                case 9:
                    return {
                        id: "magazineER9",
                        svg: `<symbol id="svg_magazineER9" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="20" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="20" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="20" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 3
                    };
            }
        } else if (this.modifier === "twostage") {
            switch (capacity) {
                case 1:
                    return {
                        id: "magazineTwoStage2",
                        svg: `<symbol id="svg_magazineTwoStage2" viewBox="-1 -1 22 12"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="20" height="10" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /></symbol>`,
                        width: 2,
                        height: 1
                    };
                case 2:
                    return {
                        id: "magazineTwoStage2",
                        svg: `<symbol id="svg_magazineTwoStage2" viewBox="-1 -1 22 12"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="20" height="10" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /></symbol>`,
                        width: 2,
                        height: 1
                    };
                case 3:
                    return {
                        id: "magazineTwoStage3",
                        svg: `<symbol id="svg_magazineTwoStage3" viewBox="-1 -1 32 12"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="30" height="10" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="0" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 1
                    };
                case 4:
                    return {
                        id: "magazineTwoStage4",
                        svg: `<symbol id="svg_magazineTwoStage4" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="10" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 2
                    };
                case 5:
                    return {
                        id: "magazineTwoStage5",
                        svg: `<symbol id="svg_magazineTwoStage5" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="10" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 2
                    };
                case 6:
                    return {
                        id: "magazineTwoStage6",
                        svg: `<symbol id="svg_magazineTwoStage6" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="10" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 2
                    };
                case 7:
                    return {
                        id: "magazineTwoStage7",
                        svg: `<symbol id="svg_magazineTwoStage7" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="20" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 3
                    };
                case 8:
                    return {
                        id: "magazineTwoStage8",
                        svg: `<symbol id="svg_magazineTwoStage8" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="20" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="20" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 3
                    };
                case 9:
                    return {
                        id: "magazineTwoStage9",
                        svg: `<symbol id="svg_magazineTwoStage9" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="20" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="20" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="20" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 3
                    };
            }
        } else {
            switch (capacity) {
                case 1:
                    return {
                        id: "magazine1",
                        svg: `<symbol id="svg_magazine2" viewBox="-1 -1 22 12"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="20" height="10" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /></symbol>`,
                        width: 2,
                        height: 1
                    };
                case 2:
                    return {
                        id: "magazine2",
                        svg: `<symbol id="svg_magazine2" viewBox="-1 -1 22 12"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="20" height="10" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /></symbol>`,
                        width: 2,
                        height: 1
                    };
                case 3:
                    return {
                        id: "magazine3",
                        svg: `<symbol id="svg_magazine3" viewBox="-1 -1 32 12"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="10" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /><use href="#_internalSalvo" x="20" y="0" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 1
                    };
                case 4:
                    return {
                        id: "magazine4",
                        svg: `<symbol id="svg_magazine4" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /><use href="#_internalSalvo" x="20" y="0" width="10" height="10" /><use href="#_internalSalvo" x="0" y="10" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 2
                    };
                case 5:
                    return {
                        id: "magazine5",
                        svg: `<symbol id="svg_magazine5" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /><use href="#_internalSalvo" x="20" y="0" width="10" height="10" /><use href="#_internalSalvo" x="0" y="10" width="10" height="10" /><use href="#_internalSalvo" x="10" y="10" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 2
                    };
                case 6:
                    return {
                        id: "magazine6",
                        svg: `<symbol id="svg_magazine6" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /><use href="#_internalSalvo" x="20" y="0" width="10" height="10" /><use href="#_internalSalvo" x="0" y="10" width="10" height="10" /><use href="#_internalSalvo" x="10" y="10" width="10" height="10" /><use href="#_internalSalvo" x="20" y="10" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 2
                    };
                case 7:
                    return {
                        id: "magazine7",
                        svg: `<symbol id="svg_magazine7" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /><use href="#_internalSalvo" x="20" y="0" width="10" height="10" /><use href="#_internalSalvo" x="0" y="10" width="10" height="10" /><use href="#_internalSalvo" x="10" y="10" width="10" height="10" /><use href="#_internalSalvo" x="20" y="10" width="10" height="10" /><use href="#_internalSalvo" x="0" y="20" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 3
                    };
                case 8:
                    return {
                        id: "magazine8",
                        svg: `<symbol id="svg_magazine8" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /><use href="#_internalSalvo" x="20" y="0" width="10" height="10" /><use href="#_internalSalvo" x="0" y="10" width="10" height="10" /><use href="#_internalSalvo" x="10" y="10" width="10" height="10" /><use href="#_internalSalvo" x="20" y="10" width="10" height="10" /><use href="#_internalSalvo" x="0" y="20" width="10" height="10" /><use href="#_internalSalvo" x="10" y="20" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 3
                    };
                case 9:
                    return {
                        id: "magazine9",
                        svg: `<symbol id="svg_magazine9" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /><use href="#_internalSalvo" x="20" y="0" width="10" height="10" /><use href="#_internalSalvo" x="0" y="10" width="10" height="10" /><use href="#_internalSalvo" x="10" y="10" width="10" height="10" /><use href="#_internalSalvo" x="20" y="10" width="10" height="10" /><use href="#_internalSalvo" x="0" y="20" width="10" height="10" /><use href="#_internalSalvo" x="10" y="20" width="10" height="10" /><use href="#_internalSalvo" x="20" y="20" width="10" height="10" /></symbol>`,
                        width: 3,
                        height: 3
                    };
            }
        }
   }
}