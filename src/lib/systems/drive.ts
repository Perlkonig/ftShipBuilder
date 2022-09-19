import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Drive extends System {
    public advanced = false;
    public readonly thrust: number;

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
        if (data.hasOwnProperty("advanced")) {
            this.advanced = data.advanced as boolean;
        }
        if (data.hasOwnProperty("thrust")) {
            this.thrust = data.thrust as number;
        }
    }

    fullName() {
        if (this.advanced) {
            return "Main Drive - Advanced";
        }
        return "Main Drive";
    }

    mass() {
        if (this.thrust === undefined) {
            return undefined;
        }
        return Math.round((this.ship.mass * 0.05) * (this.thrust as number));
    }

    points() {
        let mass = this.mass();
        let points = mass * 2;
        if (this.advanced) {
            points = mass * 3;
        }
        return points;
    }

    glyph() {
        if (this.advanced) {
            return {
                id: "driveAdv",
                svg: `<symbol id="svg_driveAdv" viewBox="245 45 470 470"><polygon fill="white" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="706.8,390.2 480,500.4 253.2,390.2 253.2,169.8 480,59.6 706.8,169.8"/><text x="480" y="320" dominant-baseline="middle" text-anchor="middle" font-size="400">${this.thrust}</text></symbol>`,
                height: 1,
                width: 1
            }
        } else {
            return {
                id: "drive",
                svg: `<symbol id="svg_drive" viewBox="164 -35.5 629 629"><polygon fill="white" stroke="#000000" stroke-width="26" stroke-miterlimit="10" points="779,526 180,526 180,215.8 479.5,34 779,215.8"/><text x="479.5" y="343.52" dominant-baseline="middle" text-anchor="middle" font-size="400">${this.thrust}</text></symbol>`,
                height: 1,
                width: 1
            }
        }
    }
}