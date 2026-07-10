import { expect } from "chai";
import "mocha";

import type { FullThrustShip } from "ftlibship";
import { compatCheck } from "../src/lib/compatCheck.js";

describe("compatCheck", () => {
    it("converts legacy numeric armour rows to [cols, offset] tuples", () => {
        const ship = {
            armour: [5, 3, 1],
        } as unknown as FullThrustShip;

        compatCheck(ship);

        expect(ship.armour).to.deep.equal([
            [5, 0],
            [3, 0],
            [1, 0],
        ]);
    });

    it("leaves modern armour tuples unchanged", () => {
        const ship = {
            armour: [
                [5, 0],
                [3, 2],
            ],
        } as FullThrustShip;

        compatCheck(ship);

        expect(ship.armour).to.deep.equal([
            [5, 0],
            [3, 2],
        ]);
    });

    it("does nothing when armour is absent", () => {
        const ship = {
            hull: { points: 10, rows: 4, stealth: "0", streamlining: "none" },
        } as FullThrustShip;

        compatCheck(ship);

        expect(ship.armour).to.be.undefined;
    });

    it("handles an empty armour array", () => {
        const ship = {
            armour: [],
        } as FullThrustShip;

        compatCheck(ship);

        expect(ship.armour).to.deep.equal([]);
    });

    it("mutates the ship in place", () => {
        const ship = {
            armour: [2],
        } as unknown as FullThrustShip;

        compatCheck(ship);

        expect(ship.armour![0]).to.deep.equal([2, 0]);
    });

    it("strips legacy invaders from ship JSON", () => {
        const ship = {
            invaders: [{ type: "marines" }],
            mass: 50,
        } as FullThrustShip & { invaders: unknown[] };

        compatCheck(ship);

        expect(ship).to.not.have.property("invaders");
    });

    it("normalizes extras array to object", () => {
        const ship = {
            extras: [],
        } as unknown as FullThrustShip;

        compatCheck(ship);

        expect(ship.extras).to.deep.equal({});
    });
});
