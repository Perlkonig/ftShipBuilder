import { expect } from "chai";
import "mocha";

import { shipOutlines } from "../src/lib/shipOutlines.js";

describe("shipOutlines", () => {
    it("exports the core-rule record sheet backgrounds", () => {
        expect(shipOutlines).to.have.length(3);
        expect(shipOutlines.map((o) => o.id)).to.deep.equal([
            "originalSmall",
            "originalMedium",
            "originalLarge",
        ]);
    });

    it("uses unique outline ids", () => {
        const ids = shipOutlines.map((o) => o.id);
        expect(new Set(ids).size).to.equal(ids.length);
    });

    for (const outline of shipOutlines) {
        describe(outline.name, () => {
            it("has metadata and positive dimensions", () => {
                expect(outline.name).to.be.a("string").and.not.be.empty;
                expect(outline.notes).to.be.a("string").and.not.be.empty;
                expect(outline.width).to.be.greaterThan(0);
                expect(outline.height).to.be.greaterThan(0);
            });

            it("embeds an SVG symbol with a viewBox", () => {
                expect(outline.svg).to.include("<symbol");
                expect(outline.svg).to.include("viewBox=");
                expect(outline.svg).to.include("_freeformBackground");
            });
        });
    }
});
