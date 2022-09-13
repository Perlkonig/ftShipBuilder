import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";
import { type2name } from "./fighters";

export class Hangar extends System {
    public id: string;
    public isRack = false;
    public critRules = false;

    constructor(data: ISystem, ship: FullThrustShip) {
        super("hangar", ship);
        if (data.hasOwnProperty("id")) {
            this.id = data.id as string;
        }
        if (data.hasOwnProperty("isRack")) {
            this.isRack = data.isRack as boolean;
        }
        if (data.hasOwnProperty("critRules")) {
            this.critRules = data.critRules as boolean;
        }
    }

    fullName() {
        if (this.isRack) {
            return "Fighter Rack";
        } else {
            return "Hangar Bay";
        }
    }

    mass() {
        if (this.isRack) {
            return 6;
        } else {
            const idx = this.ship.systems.findIndex(x => x.name === "launchTube");
            if (idx !== -1) {
                return 6;
            } else {
                return 9;
            }
        }
    }

    points() {
        if (this.isRack) {
            return this.mass() * 3;
        } else {
            if (this.critRules) {
                return this.mass() * 2;
            } else {
                return this.mass() * 3;
            }
        }
    }

    glyph() {
        const fighter = this.ship.fighters.find(x => x.hangar === this.id);
        let insert = "";
        if (fighter !== undefined) {
            insert = `<text x="479.5" y="444.625" dominant-baseline="middle" text-anchor="middle" font-size="30">${type2name.get(fighter.type)}</text>`;
        }
        if (this.isRack) {
            return {
                id: "fighterRack",
                svg: `<symbol id="svg_fighterRack" viewBox="320 35.75 319 478.5"><rect x="328.8" y="47" fill="white" stroke="#000000" stroke-width="12.7331" stroke-miterlimit="10" width="302.4" height="456"/><polygon fill="white" stroke="#000000" stroke-width="12.221" stroke-miterlimit="10" points="480,63.6 553.4,280 626.8,496.4 480,496.4 333.2,496.4 406.6,280"/>${insert}</symbol>`,
                height: 3,
                width: 2
            };
        } else {
            return {
                id: "hangar",
                svg: `<symbol id="svg_hangar" viewBox="320 35.75 319 478.5"><polygon fill="white" stroke="#000000" stroke-width="12.221" stroke-miterlimit="10" points="480,63.6 553.4,280 626.8,496.4 480,496.4 333.2,496.4 406.6,280"/>${insert}</symbol>`,
                height: 3,
                width: 2
            };
        }
   }
}
