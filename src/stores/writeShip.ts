import { writable } from "svelte/store";
import type { Arcs, FullThrustShip } from "../schemas/ship";

const starterShip: FullThrustShip = {
    hull: {points: 1, rows: 4, stealth: "0", streamlining: "none"},
    armour: [] as number[],
    systems: [
        {
            name: "drive",
            thrust: 0,
            advanced: false
        }
    ],
    weapons: [],
    ordnance: [],
    extras: [],
    fighters: []
};

export const ship = writable(starterShip as FullThrustShip);
