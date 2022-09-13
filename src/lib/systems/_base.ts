import type { FullThrustShip } from "src/schemas/ship";

export type Arc = "F"|"FS"|"FP"|"A"|"AS"|"AP";
export type ArcNum = 1|2|3|4|5|6;

export interface IGlyph {
    id: string;
    svg: string;
    height: number;
    width: number;
}

export interface ISystem {
    name: string;
    [k: string]: unknown;
};

export abstract class System {
    public readonly name: string;
    protected readonly ship: FullThrustShip

    constructor(name: string, ship: FullThrustShip) {
        this.name = name;
        this.ship = ship;
    }

    abstract fullName(): string;
    abstract mass(): number;
    abstract points(): number;
    abstract glyph(): IGlyph | undefined;
}

export abstract class SpecialSystem {
    protected readonly ship: FullThrustShip;

    constructor(ship: FullThrustShip) {
        this.ship = ship;
    }

    abstract mass(): number;
    abstract points(): number;
}
