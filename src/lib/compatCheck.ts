import type { FullThrustShip } from "ftlibship";

export const compatCheck = (ship: FullThrustShip) => {
    // Transform old `armour` to new
    if (ship.hasOwnProperty("armour") && ship.armour !== undefined) {
        for (let i = 0; i < ship.armour.length; i++) {
            if (typeof ship.armour[i] === "number") {
                ship.armour[i] = [ship.armour[i] as unknown as number, 0];
            }
        }
    }

    // v3: invaders are render-time only, not persisted on ship JSON
    if (ship.hasOwnProperty("invaders")) {
        delete (ship as FullThrustShip & { invaders?: unknown }).invaders;
    }

    // v3: extras is an object, not an array
    if (Array.isArray(ship.extras)) {
        ship.extras = {};
    }
};
