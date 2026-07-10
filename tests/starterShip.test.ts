import { expect } from "chai";
import "mocha";

import { EvalErrorCode, evaluate, validate } from "ftlibship";
import { starterShip } from "../src/stores/writeShip.js";

describe("starterShip", () => {
    it("provides the minimum fields needed to begin editing", () => {
        expect(starterShip.hull).to.deep.include({
            points: 1,
            rows: 4,
            stealth: "0",
            streamlining: "none",
        });
        expect(starterShip.systems).to.have.length(1);
        expect(starterShip.systems![0]).to.deep.include({
            name: "drive",
            thrust: 0,
            advanced: false,
        });
        expect(starterShip.weapons).to.deep.equal([]);
        expect(starterShip.ordnance).to.deep.equal([]);
        expect(starterShip.extras).to.deep.equal({});
        expect(starterShip.fighters).to.deep.equal([]);
        expect(starterShip.armour).to.deep.equal([]);
    });

    it("reports missing mass while still being edited", () => {
        const evaluation = evaluate(starterShip);
        expect(evaluation.errors).to.deep.equal([EvalErrorCode.NoMass]);
    });

    it("fails validation until mass and points are assigned", () => {
        const results = validate(JSON.stringify(starterShip));
        expect(results.valid).to.be.false;
        expect(results.code).to.equal("BADCONSTRUCTION");
        expect(results.evalErrors).to.deep.equal([EvalErrorCode.NoMass]);
    });
});
