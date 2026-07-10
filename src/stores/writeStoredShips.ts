import { writable } from "svelte/store";
import { readJsonStorage, writeJsonStorage } from "../lib/localStorage.js";

export interface ISavedShip {
    name: string;
    json: string;
}

const storedShips = readJsonStorage<ISavedShip[]>("ships", []);

export const savedShips = writable(storedShips);

savedShips.subscribe((v) => {
    writeJsonStorage("ships", v);
});
