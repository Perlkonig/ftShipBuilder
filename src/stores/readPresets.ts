import { readable } from "svelte/store";
import type { FullThrustShip } from "ftlibship";
import library from "./presets.json";

export interface IPresetFleet {
    name: string;
    notes?: string;
    ships: FullThrustShip[];
}

export const presets = readable(library as unknown as IPresetFleet[]);
