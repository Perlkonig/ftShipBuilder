import { createRequire } from "node:module";
import type { FullThrustShip } from "ftlibship";

const require = createRequire(import.meta.url);

export interface PresetFleet {
    name: string;
    ships: FullThrustShip[];
}

/** Preset fleets from ftlibship (Node/tests). */
export default require("ftlibship/preset-fleets.json") as PresetFleet[];
