import { writable } from "svelte/store";
import type { ILayout } from "../lib/layouts";
import { readJsonStorage, writeJsonStorage } from "../lib/localStorage.js";

const storedLayouts = readJsonStorage<ILayout[]>("layouts", []);

export const savedLayouts = writable(storedLayouts);

savedLayouts.subscribe((v) => {
    writeJsonStorage("layouts", v);
});
