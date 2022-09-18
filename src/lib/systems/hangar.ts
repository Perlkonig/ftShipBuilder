import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";
import { type2name } from "./fighters";

export class Hangar extends System {
    public id: string;
    public isRack = false;
    public critRules = false;

    constructor(data: ISystem, ship: FullThrustShip) {
        super(data, ship);
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

    cpv() {
        return this.mass();
    }

    glyph() {
        const fighter = this.ship.fighters.find(x => x.hangar === this.id);
        let insert = "";
        let mod = "";
        let rack = "";
        if (this.isRack) {
            mod = "Rack";
            rack = `<rect x="328.8" y="47" fill="white" stroke="#000000" stroke-width="12.7331" stroke-miterlimit="10" width="302.4" height="456"/>`;
        }
        if (fighter !== undefined) {
            switch (fighter.type) {
                case "MKP":
                    insert = `<polygon fill="none" stroke="#000000" stroke-width="2.747" stroke-miterlimit="10" points="449.3,473.2 418.6,419.8 449.3,366.4 510.7,366.4 541.4,419.8 510.7,473.2"/><polygon stroke="#000000" stroke-width="0.3924" stroke-miterlimit="10" points="480,418.9 510.2,326.8 449.8,326.8 480,418.9 510.2,326.8 449.8,326.8"/>`;
                    break;
                case "attack":
                    insert = `<path d="M413,426l55-143.2h20.4L547,426h-21.6l-16.7-43.4h-59.9L433.1,426H413z M454.3,367.2h48.5l-14.9-39.6c-4.6-12-7.9-21.9-10.2-29.7c-1.8,9.2-4.4,18.3-7.7,27.3L454.3,367.2z"/>`;
                    break;
                case "graser":
                    insert = `<circle cx="480" cy="373.8" r="68.3" stroke="black" fill="black"/>`;
                    break;
                case "interceptor":
                    insert = `<path d="M438.4,265.5h83.3v9.2h-14.3c-6.3,0-10.4,0.8-12,2.4s-2.5,4.9-2.5,10.1v136.7c0,5.5,0.7,8.9,2.2,10.3c2,1.9,5.5,2.8,10.6,2.8h16v9.2h-83.3v-9.2h15.7c5.5,0,9.1-0.8,10.7-2.4c1.6-1.6,2.4-5.2,2.4-10.6V287.1c0-5.2-0.7-8.4-2.2-9.6c-2.3-1.9-6.5-2.8-12.6-2.8h-14.2V265.5z"/>`;
                    break;
                case "light":
                case "lightAttack":
                case "lightInterceptor":
                    insert = `<path d="M445.3,427V283.8h18.9v126.3h70.5V427H445.3z"/>`;
                    break;
                case "missile":
                    insert = `<polygon fill="none" stroke="#000000" stroke-width="12.221" stroke-miterlimit="10" points="480,260.6 510.3,350.1 540.7,439.5 480,398.1 419.3,439.5 449.7,350.1"/>`;
                    break;
                case "multiRole":
                    insert = `<path d="M472.7,432.5c-0.8-15.4-1.8-33.9-1.6-47.7h-0.5c-3.8,13-8.4,26.7-13.9,42l-19.5,53.6h-10.8l-17.9-52.6c-5.2-15.6-9.7-29.8-12.8-43h-0.3c-0.3,13.8-1.1,32.3-2.1,48.9l-3,47.4h-13.6l7.7-110.5h18.2l18.9,53.5c4.6,13.6,8.4,25.7,11.2,37.2h0.5c2.8-11.2,6.7-23.3,11.6-37.2l19.7-53.5h18.2l6.9,110.5h-13.9L472.7,432.5z"/><path d="M511.4,371.9c7.2-1.5,17.5-2.3,27.4-2.3c15.3,0,25.1,2.8,32,9c5.6,4.9,8.7,12.5,8.7,21c0,14.6-9.2,24.3-20.8,28.2v0.5c8.5,3,13.6,10.8,16.2,22.3c3.6,15.4,6.2,26.1,8.5,30.3h-14.8c-1.8-3.1-4.3-12.6-7.4-26.4c-3.3-15.3-9.2-21-22.1-21.5h-13.4V481h-14.3V371.9z M525.7,422.3h14.6c15.3,0,24.9-8.4,24.9-21c0-14.3-10.3-20.5-25.4-20.7c-6.9,0-11.8,0.7-14.1,1.3V422.3z"/>`;
                    break;
                case "plasma":
                    insert = `<circle cx="480" cy="373.8" r="68.3" stroke="black" stroke-width="12" fill="white"/>`;
                    break;
                case "torpedo":
                    insert = `<polygon points="510.3,399.2 510.3,204.3 480,156.4 449.7,204.3 449.7,399.2 419.4,454.1 463.8,454.1 463.8,497.7 496.2,497.7 496.2,454.1 540.6,454.1"/>`;
                    break;
                case "standard":
                    insert = `<polygon points="480,496 573.5,334 386.5,334 480,496 573.5,334 386.5,334 "/>`;
                    break;
                default:
                    insert = `<text x="479.5" y="444.625" dominant-baseline="middle" text-anchor="middle" font-size="30">${type2name.get(fighter.type)}</text>`;
                    break;
            }
        }
        let svg = `<symbol id="svg_hangar${mod}" viewBox="320 35.75 319 478.5">${rack}<polygon fill="white" stroke="#000000" stroke-width="12.221" stroke-miterlimit="10" points="480,63.6 553.4,280 626.8,496.4 480,496.4 333.2,496.4 406.6,280"/>${insert}</symbol>`;
        let id = `hangar${mod}`;
        return {
            id,
            svg,
            height: 3,
            width: 2
        };
   }
}
