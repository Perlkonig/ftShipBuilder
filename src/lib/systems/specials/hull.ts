import type { FullThrustShip } from "../../../schemas/ship";
import { SpecialSystem } from "../_base";

export class Hull extends SpecialSystem {
    constructor(ship: FullThrustShip) {
        super(ship);
    }

    mass() {
        return this.ship.hull.points;
    }

    points() {
        if (this.ship.hull.rows === 3) {
            return this.ship.hull.points * 3;
        } else if (this.ship.hull.rows === 4) {
            return this.ship.hull.points * 2;
        } else if (this.ship.hull.rows === 5) {
            return Math.round(this.ship.hull.points * 1.5);
        } else if (this.ship.hull.rows === 6) {
            return this.ship.hull.points;
        }
    }
}