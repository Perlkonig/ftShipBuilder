import { SpecialSystem } from "../_base";
import type { FullThrustShip } from "../../../schemas/ship";
import { getSystem } from "..";

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

    cpv() {
        let ncmass = 0;
        const ncs: string[] = ["bay", "hangar", "launchTube"];
        for (const s of this.ship.systems) {
            if (ncs.includes(s.name)) {
                const obj = getSystem(s, this.ship);
                ncmass += obj.mass();
            }
        }
        const realMass = this.ship.mass - ncmass;
        let cpv = Math.round((realMass * realMass) / 100);
        if (cpv < 1) { cpv = 1; }
        return cpv;
    }
}