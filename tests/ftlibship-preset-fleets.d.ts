declare module "ftlibship/preset-fleets.json" {
    import type { FullThrustShip } from "ftlibship";
    interface PresetFleet {
        name: string;
        ships: FullThrustShip[];
    }
    const fleets: PresetFleet[];
    export default fleets;
}
