import { expect } from "chai";
import "mocha";

import type { FullThrustShip, IValidation } from "ftlibship";
import { EvalErrorCode, ValErrorCode, evaluate, validate } from "ftlibship";
import type { IPresetFleet } from "../src/stores/readPresets";
import library from "../src/stores/presets.json" assert { type: "json" };

describe("Presets", () => {
    it("Validate fleets", () => {
        const lib: IPresetFleet[] = library as unknown as IPresetFleet[];
        for (const fleet of lib) {
            expect(fleet).haveOwnProperty("name");
            expect(fleet).haveOwnProperty("ships");
            expect(fleet.ships).to.be.an("array");
        }
    });
    it("Validate ships", () => {
        const lib: IPresetFleet[] = library as unknown as IPresetFleet[];
        for (const fleet of lib) {
            for (const ship of fleet.ships) {
                // console.log(`Fleet: ${fleet.name}, Ship: ${ship.name}`);
                const results = validate(JSON.stringify(ship));
                // console.log(results);
                expect(results.valid).to.be.true;
                expect(results.ajvErrors).to.be.undefined;
                expect(results.evalErrors).to.be.undefined;
                const evaluation = evaluate(ship);
                // console.log(evaluation);
                expect(evaluation.errors.length).to.equal(0);
                expect(evaluation.mass).to.equal(ship.mass);
                expect(evaluation.points).to.equal(ship.points);
                expect(evaluation.cpv).to.equal(ship.cpv);
            }
        }
    });
});
