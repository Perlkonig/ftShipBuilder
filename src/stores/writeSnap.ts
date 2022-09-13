// I feel stupid putting a single variable in a store,
// but given how the component in question is constantly being updated,
// it seems like the only option.

import { writable } from "svelte/store";

export const snapToGrid = writable(true);
