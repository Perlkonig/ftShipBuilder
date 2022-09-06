import type { FullThrustShip } from "src/schemas/ship";
import { System } from "./_base";
import type { ISystem } from "./_base";

export class DamageControl extends System {
    constructor(_data: ISystem, ship: FullThrustShip) {
        super("damageControl", ship);
    }

    fullName() {
        return "Extra Damage Control";
    }

    mass() {
        return 0;
    }

    points() {
        return 5;
    }

    glyph() {
        return {
            id: "damageControl",
            svg: `<symbol id="svg_damageControl" viewBox="230 30 500 500"><circle fill-rule="evenodd" clip-rule="evenodd" fill="white" stroke="#000000" stroke-width="23" stroke-miterlimit="10" cx="480" cy="280" r="235.5"/><path stroke="#000000" stroke-width="7" stroke-miterlimit="10" d="M463,270.4c0,0-23.6,20.7-52.5,46.4 c-28.9,25.7-32.6,22.5-41,24.6s-20.5,2.2-32.1,18c-11.6,15.8-2,36,0,36.2c0,0,13-19.3,16.2-22.2c3.2-2.9,7.2-1.7,7.2-1.7 s16.3,8.6,19.7,10.4s1.5,5.9,1.5,5.9l-12.8,20c0,0-3.4,4.4-0.2,5.7c14.3,0.8,35.7-9.6,38.7-30.6c3-21,20.4-33.1,20.4-33.1l60.7-55.3 M488.7,294.7c6.7-6,14.6-13.2,22.6-20.5c10.8-9.7,21.7-19.3,32.3-29.2c11-10.2,24-19.3,39.6-19.7c22-0.7,61.4-19.5,37.7-57.9 c0,0-0.3-1.1-1.9,1.4c-1.5,2.5-13.4,22.5-13.4,22.5s-2.9,2.9-7.9,0.6c-5-2.4-29.2-15.2-29.2-15.2s-3-2.2-0.3-6.6 s12.2-19.5,12.2-19.5s2.5-3.4,0-4.4c-2.5-1-40.9,5.4-40.2,36.3c-0.8,10.4-4.9,20-11.3,28.1c-6.6,8.3-15.4,14.7-23.3,21.7 c-9,8-17.9,15.9-26.9,23.9c-5.3,4.7-10.6,9.4-15.9,14.1"/></symbol>`,
            height: 1,
            width: 1
        };
    }
}