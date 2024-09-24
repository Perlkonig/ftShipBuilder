import { writable } from "svelte/store";
import type { ILayout } from "../lib/layouts";

let storedLayouts: ILayout[] = [];
if (localStorage.getItem("layouts") !== null) {
    storedLayouts = JSON.parse(localStorage.getItem("layouts"));
}

export const savedLayouts = writable(storedLayouts);

savedLayouts.subscribe((v) => {
    localStorage.setItem("layouts", JSON.stringify(v));
});
