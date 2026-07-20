import { expect } from "chai";
import "mocha";

import { EvalErrorCode, evaluate, validate } from "ftlibship";
import type { FullThrustShip } from "ftlibship";
import { starterShip } from "../src/stores/writeShip.js";

const baseShip = (): FullThrustShip => {
    const ship = structuredClone(starterShip) as FullThrustShip;
    ship.mass = 20;
    ship.hull.points = 2;
    return ship;
};

describe("boarding torpedo magazine pairing", () => {
    it("accepts a valid BT launcher and magazine pairing", () => {
        const ship = baseShip();
        ship.systems.push({
            name: "boardingTorpedoMagazine",
            id: "btMag",
            capacity: 2,
        });
        ship.weapons.push({
            name: "boardingTorpedoLauncher",
            magazine: "btMag",
            leftArc: "FP",
            numArcs: 3,
        });

        const evaluation = evaluate(ship);
        expect(evaluation.errors).to.not.include(EvalErrorCode.BadMagazinePairing);

        ship.points = evaluation.points;
        ship.cpv = evaluation.cpv;
        const results = validate(JSON.stringify(ship));
        expect(results.valid).to.be.true;
    });

    it("rejects a salvo launcher tied to a BT magazine", () => {
        const ship = baseShip();
        ship.systems.push({
            name: "boardingTorpedoMagazine",
            id: "btMag",
            capacity: 2,
        });
        ship.ordnance.push({
            name: "salvoLauncher",
            magazine: "btMag",
            leftArc: "FP",
            numArcs: 3,
        });

        const evaluation = evaluate(ship);
        expect(evaluation.errors).to.include(EvalErrorCode.BadMagazinePairing);
    });

    it("rejects a BT launcher tied to a salvo magazine", () => {
        const ship = baseShip();
        ship.systems.push({
            name: "magazine",
            id: "salvoMag",
            capacity: 2,
        });
        ship.weapons.push({
            name: "boardingTorpedoLauncher",
            magazine: "salvoMag",
            leftArc: "FP",
            numArcs: 3,
        });

        const evaluation = evaluate(ship);
        expect(evaluation.errors).to.include(EvalErrorCode.BadMagazinePairing);
    });
});
