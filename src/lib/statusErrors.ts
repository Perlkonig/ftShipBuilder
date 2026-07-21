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
    [
        EvalErrorCode.OverFighters,
        "You have more fighter wings than hangar bays.",
    ],
    [
        EvalErrorCode.UnknownFighterHangar,
        "A fighter wing references a hangar id that does not exist on this ship.",
    ],
    [
        EvalErrorCode.DuplicateFighterHangar,
        "More than one fighter wing is assigned to the same hangar.",
    ],
    [
        EvalErrorCode.OverGunboats,
        "A gunboat squadron has more than six boats.",
    ],
    [
        EvalErrorCode.FtlOnRack,
        "FTL gunboat squadrons cannot be assigned to a gunboat rack.",
    ],
    [
        EvalErrorCode.GunboatSquadronNoRack,
        "Each non-FTL gunboat squadron must be assigned to a gunboat rack.",
    ],
    [
        EvalErrorCode.UnknownGunboatRack,
        "A gunboat squadron references a rack id that does not exist on this ship.",
    ],
    [
        EvalErrorCode.DuplicateGunboatRack,
        "More than one gunboat squadron is assigned to the same rack.",
    ],
]);

export const formatEvalError = (code: EvalErrorCode): string =>
    errorMsgs.get(code) ?? `Validation error: ${code}`;
