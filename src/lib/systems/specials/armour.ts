import type { FullThrustShip } from "../../../schemas/ship";
import { SpecialSystem } from "../_base";

export class Armour extends SpecialSystem {
    constructor(ship: FullThrustShip) {
        super(ship);
    }

    mass() {
        return this.ship.armour.reduce((acc, curr) => {return acc + curr[0] + curr[1]}, 0);
    }

    points() {
        let points = 0;
        for (let i = 0; i < this.ship.armour.length; i++) {
            const multBase = 2 * (i + 1);
            const multRegen = 2 * (i + 2);
            points += (this.ship.armour[i][0] as number) * multBase;
            points += (this.ship.armour[i][1] as number) * multRegen;
        }
        return points;
    }
}