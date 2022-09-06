import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Screen extends System {
    public advanced = false;
    public area = false;

    constructor(data: ISystem, ship: FullThrustShip) {
        super("screen", ship);
        if (data.hasOwnProperty("advanced")) {
            this.advanced = data.advanced as boolean;
        }
        if (data.hasOwnProperty("area")) {
            this.area = data.area as boolean;
        }
    }

    fullName() {
        return (this.advanced ? "Advanced " : "") + (this.area ? "Area " : "") + "Defensive Screen";
    }

    mass() {
        if (this.advanced && this.area) {
            return Math.round(this.ship.mass * 0.3);
        } else if (this.advanced) {
            return Math.round(this.ship.mass * 0.075);
        } else if (this.area) {
            return Math.round(this.ship.mass * 0.2);
        } else {
            return Math.round(this.ship.mass * 0.05);
        }
    }

    points() {
        const mass = this.mass();
        if (this.advanced && this.area) {
            return Math.round(mass * 3.5);
        } else if (this.advanced) {
            return mass * 4;
        } else if (this.area) {
            return Math.round(mass * 3.5);
        } else {
            return mass * 3;
        }
    }

    glyph() {
        if (this.advanced && this.area) {
            return {
                id: "screenAA",
                svg: `<symbol id="svg_screenAA" viewBox="280 80 400 400"><g><rect x="413" y="213" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -57.4011 421.4214)" width="134" height="134"/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="398.8,214 332.8,280 398.8,346 "/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="378.2,193.5 291.7,280 378.2,366.5"/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="561.2,214 627.2,280 561.2,346"/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="581.8,193.5 668.3,280 581.8,366.5"/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="414,200.3 480,134.3 546,200.3"/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="393.5,179.7 480,93.2 566.5,179.7"/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="414,359.7 480,425.7 546,359.7"/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="393.5,380.3 480,466.8 566.5,380.3"/></g></symbol>`,
                height: 1,
                width: 1
            };
        } else if (this.advanced) {
            return {
                id: "screenAdv",
                svg: `<symbol id="svg_screenAdv" viewBox="250 45 460 460"><g><rect x="387.3" y="280.8" transform="matrix(0.7071 0.7071 -0.7071 0.7071 404.6839 -230.0195)" width="185.5" height="185.5"/><polyline fill="none" stroke="#000000" stroke-width="13" stroke-miterlimit="10" points="654.3,330.5 480,156.2 305.7,330.5 "/><polyline fill="none" stroke="#000000" stroke-width="13" stroke-miterlimit="10" points="704.1,279.5 480,55.4 255.9,279.5"/></g></symbol>`,
                height: 1,
                width: 1
            };
        } else if (this.area) {
            return {
                id: "screenArea",
                svg: `<symbol id="svg_screenArea" viewBox="302.5 102.5 355 355"><g><circle cx="480" cy="280" r="63"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M417,197c0,0,62.1-32.4,126.1,0"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M409.5,163c0,0,69.4-32.4,140.9,0"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M398.4,129c0,0,80.4-32.4,163.2,0"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M417,363c0,0,62.1,32.4,126.1,0"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M409.5,397c0,0,69.4,32.4,140.9,0"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M398.4,431c0,0,80.4,32.4,163.2,0"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M391.3,217c0,0-32.4,62.1,0,126.1"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M357.3,209.5c0,0-32.4,69.4,0,140.9"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M323.4,198.4c0,0-32.4,80.4,0,163.2"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M568.7,217c0,0,32.4,62.1,0,126.1"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M602.7,209.5c0,0,32.4,69.4,0,140.9"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M636.6,198.4c0,0,32.4,80.4,0,163.2"/></g></symbol>`,
                width: 1,
                height: 1
            };
        } else {
            return {
                id: "screen",
                svg: `<symbol id="svg_screen" viewBox="250 40 460 460"><g><circle cx="480" cy="366.8" r="131.8"/><path fill="none" stroke="#000000" stroke-width="39.3368" stroke-miterlimit="10" d="M348.2,193.3c0,0,130-67.9,263.6,0"/><path fill="none" stroke="#000000" stroke-width="39.3368" stroke-miterlimit="10" d="M290.8,104.7c0,0,186.6-97.4,378.5,0"/></g></symbol>`,
                height: 1,
                width: 1
            };
        }
    }
}