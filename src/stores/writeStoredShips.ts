import { writable } from "svelte/store";

export interface ISavedShip {
    name: string;
    json: string;
}

let storedShips: ISavedShip[] = [];
if (localStorage.getItem("ships") !== null) {
    storedShips = JSON.parse(localStorage.getItem("ships"));
}

export const savedShips = writable(storedShips);

savedShips.subscribe((v) => {
    localStorage.setItem("ships", JSON.stringify(v));
});
