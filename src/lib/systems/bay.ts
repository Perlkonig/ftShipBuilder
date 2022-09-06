import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class Bay extends System {
    public type: "cargo" | "passenger" | "troop";
    public capacity = 1;
    public id: string;

    constructor(data: ISystem, ship: FullThrustShip) {
        super("bay", ship);
        if (data.hasOwnProperty("capacity")) {
            this.capacity = data.capacity as number;
        }
        if (data.hasOwnProperty("type")) {
            this.type = data.type as "cargo" | "passenger" | "troop";
        }
        if (data.hasOwnProperty("id")) {
            this.id = data.id as string;
        }
    }

    fullName() {
        if (this.type === "cargo") {
            return "Cargo Hold";
        } else if (this.type === "passenger") {
            return "Passenger Berth";
        } else {
            return "Troop Berth";
        }
    }

    mass() {
        return this.capacity;
    }

    points() {
        return 0;
    }

    glyph() {
        switch (this.type) {
            case "cargo":
                return {
                    id: "bayCargo",
                    svg: `<symbol id="svg_bayCargo" viewBox="305 17 350 525"><rect x="329.4" y="21" fill="white" stroke="#000000" stroke-width="6.282" stroke-miterlimit="10" width="301.2" height="518.1"/><g><path d="M430.9,58.8v84.6h97.8V58.8h26.4V261h-26.4v-94.8h-97.8V261h-26.1V58.8H430.9z"/></g></symbol>`,
                    height: 3,
                    width: 2
                };
            case "troop":
                return {
                    id: "bayTroop",
                    svg: `<symbol id="svg_bayTroop" viewBox="305 17 350 525"><rect x="329.4" y="21" fill="white" stroke="#000000" stroke-width="6.282" stroke-miterlimit="10" width="301.2" height="518.1"/><g><path d="M466.6,70.6h-61.5V48.4h149.7v22.2H493v180h-26.4V70.6z"/></g></symbol>`,
                    height: 3,
                    width: 2
                };
            case "passenger":
                return {
                    id: "bayPassenger",
                    svg: `<symbol id="svg_bayPassenger" viewBox="305 17 350 525"><rect x="329.4" y="21" fill="white" stroke="#000000" stroke-width="6.282" stroke-miterlimit="10" width="301.2" height="518.1"/><g><path d="M427.8,62c12.6-2.1,29.1-3.9,50.1-3.9c25.8,0,44.7,6,56.7,16.8c11.1,9.6,17.7,24.3,17.7,42.3c0,18.3-5.4,32.7-15.6,43.2 c-13.8,14.7-36.3,22.2-61.8,22.2c-7.8,0-15-0.3-21-1.8v81h-26.1V62z M453.9,159.5c5.7,1.5,12.9,2.1,21.6,2.1 c31.5,0,50.7-15.3,50.7-43.2c0-26.7-18.9-39.6-47.7-39.6c-11.4,0-20.1,0.9-24.6,2.1V159.5z"/></g></symbol>`,
                    height: 3,
                    width: 2
                };
        }
    }
}