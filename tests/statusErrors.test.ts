import { expect } from "chai";
import "mocha";

import { EvalErrorCode } from "ftlibship";
import { errorMsgs, formatEvalError } from "../src/lib/statusErrors.js";

describe("statusErrors", () => {
    it("maps every EvalErrorCode to a message", () => {
        for (const code of Object.values(EvalErrorCode)) {
            expect(errorMsgs.get(code), code).to.be.a("string").and.not.be
                .empty;
        }
    });

    it("falls back for unknown codes", () => {
        const msg = formatEvalError("NOT_A_REAL_CODE" as EvalErrorCode);
        expect(msg).to.include("NOT_A_REAL_CODE");
    });
});
