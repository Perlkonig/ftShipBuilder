import type { FullThrustShip } from "ftlibship";
import { writable } from "svelte/store";
import { readJsonStorage, writeJsonStorage } from "../lib/localStorage.js";

export interface ISavedFleet {
    name: string;
    ships: FullThrustShip[];
}

const storedFleet = readJsonStorage<ISavedFleet>("fleet", {
    name: "Unnamed",
    ships: [],
});

export const savedFleet = writable(storedFleet);

savedFleet.subscribe((v) => {
    writeJsonStorage("fleet", v);
});
