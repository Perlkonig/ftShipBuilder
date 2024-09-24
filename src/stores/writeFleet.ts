import type { FullThrustShip } from "ftlibship";
import { writable } from "svelte/store";

export interface ISavedFleet {
    name: string;
    ships: FullThrustShip[];
}

let storedFleet: ISavedFleet = {name: "Unnamed", ships: []};
if (localStorage.getItem("fleet") !== null) {
    storedFleet = JSON.parse(localStorage.getItem("fleet"));
}

export const savedFleet = writable(storedFleet);

savedFleet.subscribe(v => {
    localStorage.setItem("fleet", JSON.stringify(v));
});
