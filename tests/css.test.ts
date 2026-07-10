import { expect } from "chai";
import "mocha";

import { fontRoboto, fontZen } from "../src/lib/css.js";

describe("css embedded fonts", () => {
    it("uses a single data URL prefix per font face", () => {
        for (const css of [fontZen, fontRoboto]) {
            expect(css).to.not.include(
                "data:application/font-woff;base64,data:application/font-woff;base64"
            );
            expect(css).to.include("url(data:application/font-woff;base64,");
        }
    });
});
