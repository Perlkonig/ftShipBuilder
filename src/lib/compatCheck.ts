import type { FullThrustShip } from "ftlibship";

export const compatCheck = (ship: FullThrustShip) => {
    // Transform old `armour` to new
    if ( (ship.hasOwnProperty("armour")) && (ship.armour !== undefined) ) {
        for (let i = 0; i < ship.armour.length; i++) {
            if (typeof ship.armour[i] === "number") {
                ship.armour[i] = [(ship.armour[i] as unknown) as number, 0];
            }
        }
    }
}
