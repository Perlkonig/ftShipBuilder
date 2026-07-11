import { evaluate, type FullThrustShip } from "ftlibship";

const MIN_MASS = 5;
const MAX_MASS = 300;
const MAX_ITERATIONS = 100;

/**
 * Computes ship mass so equipped systems fit with no overallocation.
 * Drive thrust, FTL, screens, and similar systems scale with ship mass,
 * so this iterates until evaluate() reports equipped mass at or below
 * the trial mass, then tightens to the fixed point when possible.
 */
export const computeAutoMass = (ship: FullThrustShip): number => {
    let mass = Math.max(MIN_MASS, ship.mass ?? MIN_MASS);

    for (let i = 0; i < MAX_ITERATIONS; i++) {
        const equipped = evaluate({ ...ship, mass }).mass;

        if (equipped === mass) {
            return mass;
        }

        if (equipped > mass) {
            mass = Math.min(MAX_MASS, Math.ceil(equipped));
            continue;
        }

        const tighter = Math.max(MIN_MASS, equipped);
        if (tighter !== mass) {
            mass = tighter;
            continue;
        }

        return mass;
    }

    return Math.min(MAX_MASS, mass);
};
