import type { FullThrustShip } from "src/schemas/ship";
import { nanoid } from "nanoid";
import type { ISystemSVG } from "../svgLib";

export type Arc = "F"|"FS"|"FP"|"A"|"AS"|"AP";
export type ArcNum = 1|2|3|4|5|6;

export interface ISystem {
    name: string;
    [k: string]: unknown;
};

export abstract class System {
    public readonly name: string;
    protected readonly ship: FullThrustShip;
    public uid: string;

    constructor(data: ISystem, ship: FullThrustShip) {
        this.name = data.name;
        if ( (data.hasOwnProperty("id")) && (data.id !== undefined) ) {
            this.uid = data.id as string;
        } else {
            this.uid = nanoid(5);
            data.id = this.uid;
        }
        this.ship = ship;
    }

    abstract fullName(): string;
    abstract mass(): number;
    abstract points(): number;
    abstract glyph(): ISystemSVG | undefined;

    cpv(): number {
        return this.points();
    }
}

export abstract class SpecialSystem {
    protected readonly ship: FullThrustShip;

    constructor(ship: FullThrustShip) {
        this.ship = ship;
    }

    abstract mass(): number;
    abstract points(): number;

    cpv(): number {
        return this.points();
    }
}
