import { writable } from "svelte/store";

export interface ISsdComponents {
    hull: string;
    drive: string;
    ftl: string;
    core: string;
    systems: string;
}

export const ssdComponents = writable({} as ISsdComponents);
