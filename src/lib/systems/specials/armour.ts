import type { FullThrustShip } from "../../../schemas/ship";
import { SpecialSystem } from "../_base";

export class Armour extends SpecialSystem {
    constructor(ship: FullThrustShip) {
        super(ship);
    }

    mass() {
        return this.ship.armour.reduce((acc, curr) => {return acc + curr}, 0);
    }

    points() {
        let points = 0;
        for (let i = 0; i < this.ship.armour.length; i++) {
            points += 2 * (i + 1)
        }
        return points;
    }
}