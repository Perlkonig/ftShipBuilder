import { expect } from "chai";
import "mocha";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { evaluate } from "ftlibship";
import { computeAutoMass } from "../src/lib/autoMass.js";
import { starterShip } from "../src/stores/writeShip.js";

const library = JSON.parse(
    readFileSync(
        join(dirname(fileURLToPath(import.meta.url)), "../src/stores/presets.json"),
        "utf-8"
    )
);

describe("computeAutoMass", () => {
    it("matches preset ship mass values", () => {
        for (const fleet of library) {
            for (const ship of fleet.ships) {
                expect(computeAutoMass(ship)).to.equal(ship.mass);
            }
        }
    });

    it("returns at least the minimum legal mass", () => {
        const ship = structuredClone(starterShip);
        expect(computeAutoMass(ship)).to.be.at.least(5);
    });

    it("does not overallocate systems on the starter hull", () => {
        const ship = structuredClone(starterShip);
        const mass = computeAutoMass(ship);
        const evaluation = evaluate({ ...ship, mass });
        expect(evaluation.mass).to.be.at.most(mass);
    });

    it("accounts for thrust-scaled drive mass", () => {
        const ship = structuredClone(starterShip);
        ship.systems[0].thrust = 6;
        ship.systems.push({ name: "screen", type: "standard" });
        const mass = computeAutoMass(ship);
        const evaluation = evaluate({ ...ship, mass });
        expect(evaluation.mass).to.equal(mass);
        expect(mass).to.be.greaterThan(5);
    });
});
