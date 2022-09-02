import type { FullThrustShip } from "../schemas/ship";

export interface IMassPts {
    mass: number;
    points: number;
};

export const calcAllMassPts = (ship: FullThrustShip) => {
    let mass = 0;
    let points = 0;
    let results: IMassPts;

    if (! ship.hasOwnProperty("mass")) {
        return undefined;
    }

    // Hull
    results = calcHullMassPts(ship.hull);
    mass += results.mass;
    points += results.points;

    // Armour
    results = calcArmourMassPts(ship.armour);
    mass += results.mass;
    points += results.points;

    // General systems (including drive and ftl)
    for (const sys of ship.systems) {
        results = calcSysMassPts(sys, ship.mass);
        if (results !== undefined) {
            mass += results.mass;
            points += results.points;
        } else {
            throw new Error(`Unrecognized system encountered: ${JSON.stringify(sys)}`);
        }
    }

    // Weapons
    // Ordnance
    // Extras
    // Fighters

    return {mass, points};
};

interface IHull {
    points: number;
    rows: 3|4|5|6;
};
export const calcHullMassPts = (hull: IHull): IMassPts => {
    const results = {mass: 0, points: 0};
    results.mass = hull.points;
    if (hull.rows === 3) {
        results.points = hull.points * 3;
    } else if (hull.rows === 4) {
        results.points = hull.points * 2;
    } else if (hull.rows === 5) {
        results.points = Math.round(hull.points * 1.5);
    } else if (hull.rows === 6) {
        results.points = hull.points;
    }
    return results;
};

export const calcArmourMassPts = (armour: number[]): IMassPts => {
    const results = {mass: 0, points: 0};
    results.mass = armour.reduce((acc, curr) => {return acc + curr}, 0);
    for (let i = 0; i < armour.length; i++) {
        results.points += 2 * (i + 1)
    }
    return results;
};

interface ISystem {
    name: string;
    [k: string]: unknown;
};

export const calcSysMassPts = (sys: ISystem, shipMass: number): IMassPts | undefined => {
    if (sys === undefined) {
        return undefined;
    }
    if (sys.name === "suicide") {
        return {mass: 1, points: 5};
    } else if (sys.name === "adfc") {
        if ( (sys.hasOwnProperty("advanced")) && (sys.advanced) ) {
            return {mass: 2, points: 10}
        } else {
            return {mass: 2, points: 8}
        }
    } else if (sys.name === "fireControl") {
        if ( (sys.hasOwnProperty("advanced")) && (sys.advanced) ) {
            return {mass: 1, points: 5}
        } else {
            return {mass: 1, points: 4}
        }
    } else if (sys.name === "mineLayer") {
        if (! sys.hasOwnProperty("capacity")) {
            sys.capacity = 2;
        }
        return {mass: 2 + (sys.capacity as number), points: 6 + (2 * (sys.capacity as number))};
    } else if (sys.name === "mineSweeper") {
        return {mass: 5, points: 15}
    } else if (sys.name === "screen") {
        let advanced = false;
        if ( (sys.hasOwnProperty("advanced")) && (sys.advanced) ) {
            advanced = true;
        }
        let area = false;
        if ( (sys.hasOwnProperty("area")) && (sys.area) ) {
            area = true;
        }
        if (advanced && area) {
            const mass = Math.round(shipMass * 0.3);
            return {mass, points: Math.round(mass * 3.5)};
        } else if (advanced) {
            const mass = Math.round(shipMass * 0.075);
            return {mass, points: mass * 4};
        } else if (area) {
            const mass = Math.round(shipMass * 0.2);
            return {mass, points: Math.round(mass * 3.5)};
        } else {
            const mass = Math.round(shipMass * 0.05);
            return {mass, points: mass * 3};
        }
    } else if (sys.name === "drive") {
        if ( (! sys.hasOwnProperty("thrust")) || (sys.thrust === undefined) ) {
            return undefined;
        }
        const mass = Math.round((shipMass * 0.05) * (sys.thrust as number));
        let points = mass * 2;
        if ( (sys.hasOwnProperty("advanced")) && (sys.advanced) ) {
            points = mass * 3;
        }
        return {mass, points};
    } else if (sys.name === "ftl") {
        const mass = Math.round(shipMass * 0.1);
        let points = mass * 2;
        if ( (sys.hasOwnProperty("advanced")) && (sys.advanced) ) {
            points = mass * 3;
        }
        return {mass, points};
    }
    return undefined;
};