import { expect } from "chai";
import "mocha";

import { layouts, type ILayout } from "../src/lib/layouts.js";

const blockKeys = [
    "blockName",
    "blockStats",
    "blockHull",
    "blockDrive",
    "blockFtl",
    "blockCore",
    "blockSystems",
] as const;

describe("layouts", () => {
    it("exports the expected preset layouts", () => {
        expect(layouts).to.have.length(5);
        expect(layouts.map((l) => l.id)).to.deep.equal([
            "32compact",
            "12narrow",
            "34standard",
            "11square",
            "32standard",
        ]);
    });

    it("uses unique layout ids", () => {
        const ids = layouts.map((l) => l.id);
        expect(new Set(ids).size).to.equal(ids.length);
    });

    for (const layout of layouts) {
        describe(layout.name, () => {
            it("has positive canvas dimensions and cell size", () => {
                expect(layout.width).to.be.greaterThan(0);
                expect(layout.height).to.be.greaterThan(0);
                expect(layout.cellsize).to.be.greaterThan(0);
            });

            it("defines all block regions with positive size", () => {
                for (const key of blockKeys) {
                    const box = layout[key];
                    expect(box, key).to.exist;
                    expect(box!.width, `${key}.width`).to.be.greaterThan(0);
                    expect(box!.height, `${key}.height`).to.be.greaterThan(0);
                    expect(box!.minx, `${key}.minx`).to.be.at.least(0);
                    expect(box!.miny, `${key}.miny`).to.be.at.least(0);
                }
            });

            it("keeps block regions inside the canvas", () => {
                for (const key of blockKeys) {
                    const box = layout[key]!;
                    expect(box.minx + box.width, `${key} width overflow`).to.be.at
                        .most(layout.width);
                    expect(box.miny + box.height, `${key} height overflow`).to.be
                        .at.most(layout.height);
                }
            });

            it("aligns the hull block to the cell grid", () => {
                const hull = layout.blockHull!;
                expect(hull.width % layout.cellsize).to.equal(0);
                expect(hull.height % layout.cellsize).to.equal(0);
            });
        });
    }

    it("uses a 5×7 hull grid for the compact layout", () => {
        const compact = layouts.find((l) => l.id === "32compact")!;
        expect(compact.blockHull!.width / compact.cellsize).to.equal(5);
        expect(compact.blockHull!.height / compact.cellsize).to.equal(7);
    });

    it("matches the ILayout interface shape", () => {
        const sample: ILayout = layouts[0];
        expect(sample).to.include.keys([
            "id",
            "name",
            "width",
            "height",
            "cellsize",
            ...blockKeys,
        ]);
    });
});
