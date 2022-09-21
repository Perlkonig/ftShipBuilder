import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Ftl extends System {
    public advanced = false;

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("advanced")) {
            this.advanced = data.advanced as boolean;
        }
    }

    fullName() {
        if (this.advanced) {
            return "Faster-Than-Light Drive - Advanced";
        }
        return "Faster-Than-Light Drive";
    }

    mass() {
        return Math.round(this.ship.mass * 0.1);
    }

    points() {
        const mass = this.mass();
        let points = mass * 2;
        if (this.advanced) {
            points = mass * 3;
        }
        return points;
    }

    glyph() {
        if (this.advanced) {
            return {
                id: "ftlAdv",
                svg: `<symbol id="svg_ftlAdv" viewBox="-51.5 -247.5 1058 1058"><g><rect x="264.5" y="65.5" fill="white" stroke="#000000" stroke-width="29" stroke-miterlimit="10" width="430" height="430"/><path fill="none" stroke="#000000" stroke-width="28.507" stroke-miterlimit="10" d="M265.4,260.8c0,0,43.9,136,104.2,136 c31.9,0,52.6-54.9,63.8-77.5c21.7-43.8,40.7-91,72.1-129c14.9-18,37.3-38.2,62.9-37.6c28.1,0.6,48.5,27.5,65,47.1 c23.1,27.5,43.5,57.6,61.9,88.5"/></g><rect x="221" y="25" fill="none" stroke="#000000" stroke-width="12" stroke-miterlimit="10" width="514" height="514"/></symbol>`,
                width: 1,
                height: 1
            }
        } else {
            return {
                id: "ftl",
                svg: `<symbol id="svg_ftl" viewBox="18.5 -180.5 922 922"><g><rect x="264.5" y="65.5" fill="white" stroke="#000000" stroke-width="29" stroke-miterlimit="10" width="430" height="430"/><path fill="none" stroke="#000000" stroke-width="28.507" stroke-miterlimit="10" d="M265.4,260.8c0,0,43.9,136,104.2,136 c31.9,0,52.6-54.9,63.8-77.5c21.7-43.8,40.7-91,72.1-129c14.9-18,37.3-38.2,62.9-37.6c28.1,0.6,48.5,27.5,65,47.1 c23.1,27.5,43.5,57.6,61.9,88.5"/></g></symbol>`,
                height: 1,
                width: 1
            }
        }
    }
}