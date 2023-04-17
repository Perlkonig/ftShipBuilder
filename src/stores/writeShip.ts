import { writable } from "svelte/store";
import type { FullThrustShip } from "ftlibship";
import type { ILayout as IBlockLayout } from "@/lib/layouts";

interface IDim {
    width: number;
    height: number;
    x: number;
    y: number;
    factor: number | undefined;
}
export interface IElement {
    id: string;
    glyphid: string; // ID for the <use> tag
    width: number;
    height: number;
    x: number;
    y: number;
}
interface IElements {
    [k: string]: IElement;
}
interface IBackground {
    svg: string | undefined;
    x: number;
    y: number;
    zoom: number;
    opacity: number;
}
export interface IFreeform {
    width: number;
    height: number;
    cellsize: number;
    nameplate: IDim;
    stats: IDim;
    background: IBackground | undefined;
    elements: IElements;
}

export interface IBlocks {
    blocks: IBlockLayout;
    elements: IElements
}

export interface ILayout {
    blocks: IBlocks;
    freeform: IFreeform;
}

export const starterShip: FullThrustShip = {
    hull: {points: 1, rows: 4, stealth: "0", streamlining: "none"},
    armour: [] as [number, number][],
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
    fighters: [],
    layout: {} as ILayout
};

export const ship = writable(starterShip as FullThrustShip);
