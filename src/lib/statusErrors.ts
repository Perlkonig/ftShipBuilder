import { EvalErrorCode } from "ftlibship";

export const errorMsgs: Map<EvalErrorCode, string> = new Map([
    [EvalErrorCode.NoMass, "You haven't specified a mass for your ship."],
    [EvalErrorCode.BadMass, "The ship's mass must be between 5 and 300."],
    [
        EvalErrorCode.OverMass,
        "You have equipped more systems than your ship's mass can accommodate.",
    ],
    [
        EvalErrorCode.LowHull,
        "The ship's hull must be at least 10% of total mass.",
    ],
    [
        EvalErrorCode.OverDCP,
        "You have allocated too many damage control parties.",
    ],
    [
        EvalErrorCode.OverMarine,
        "You have allocated too many onboard marines.",
    ],
    [
        EvalErrorCode.OverCrew,
        "You have overallocated your crew. You may need to add some berths.",
    ],
    [
        EvalErrorCode.OverSpinal,
        "You have equipped more spinal mount weapons than your ship's mass can accommodate.",
    ],
    [
        EvalErrorCode.OverTurret,
        "You have equipped more turrets than your ship's mass can accommodate.",
    ],
    [
        EvalErrorCode.DblUID,
        "At least one of your systems shares a UUID with another. This should not happen in the normal course of using the builder. Did you modify a JSON file?",
    ],
    [
        EvalErrorCode.OverPBL,
        "You have equipped more plasma bolt launchers than your ship's mass can accommodate.",
    ],
    [
        EvalErrorCode.BadMagazinePairing,
        "A launcher references a magazine that is missing or the wrong type.",
    ],
    [
        EvalErrorCode.FlawedUnderMass,
        "Flawed designs require a minimum mass of 60.",
    ],
    [
        EvalErrorCode.UnknownSystem,
        "The ship JSON contains one or more unrecognized system names. Remove or replace them in the builder.",
    ],
]);

export const formatEvalError = (code: EvalErrorCode): string =>
    errorMsgs.get(code) ?? `Validation error: ${code}`;
