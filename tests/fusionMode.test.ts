import { expect } from "chai";
import "mocha";

import { evaluate, systems } from "ftlibship";
import type { FullThrustShip } from "ftlibship";
import { starterShip } from "../src/stores/writeShip.js";

const baseShip = (): FullThrustShip => {
    const ship = structuredClone(starterShip) as FullThrustShip;
    ship.mass = 20;
    ship.hull.points = 2;
    return ship;
};

const fusionWeapon = (mode?: string) => {
    const weapon: Record<string, unknown> = {
        name: "fusion",
        leftArc: "F",
        numArcs: 1,
    };
    if (mode !== undefined) {
        weapon.mode = mode;
    }
    return weapon;
};

describe("fusion mode", () => {
    it("uses the standard name when mode is absent", () => {
        const ship = baseShip();
        ship.weapons.push(fusionWeapon() as FullThrustShip["weapons"][number]);

        expect(evaluate(ship).errors).to.deep.equal([]);
        expect(
            systems.getSystem(ship.weapons[0], ship).fullName()
        ).to.equal("Fusion Array");
    });

    it("uses the flare name when mode is flare", () => {
        const ship = baseShip();
        ship.weapons.push(
            fusionWeapon("flare") as FullThrustShip["weapons"][number]
        );

        expect(
            systems.getSystem(ship.weapons[0], ship).fullName()
        ).to.equal("Fusion Array - Flare");
    });

    it("uses the torpedo name when mode is torpedo", () => {
        const ship = baseShip();
        ship.weapons.push(
            fusionWeapon("torpedo") as FullThrustShip["weapons"][number]
        );

        expect(
            systems.getSystem(ship.weapons[0], ship).fullName()
        ).to.equal("Fusion Array - Torpedo");
    });

    it("uses the standard name after mode is deleted", () => {
        const ship = baseShip();
        const weapon = fusionWeapon("flare") as FullThrustShip["weapons"][number] &
            Record<string, unknown>;
        ship.weapons.push(weapon);
        delete weapon.mode;

        expect(weapon).to.not.have.property("mode");
        expect(
            systems.getSystem(ship.weapons[0], ship).fullName()
        ).to.equal("Fusion Array");
    });
});
