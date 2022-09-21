// A collection of SVGs that are unattached to any specific system object.

import type { FullThrustShip } from "@/schemas/ship";

export interface ISystemSVG {
    id: string;
    svg: string;
    height: number;
    width: number;
};

export interface IShipOutlineSVG extends ISystemSVG {
    name: string;
    notes: string;
}

export const svgLib: ISystemSVG[] = [
    {
        id: "armour",
        svg: `<symbol id="svg_armour" viewBox="202 2 556 556"><circle fill="white" stroke="#000000" stroke-width="20.8163" stroke-miterlimit="10" cx="480" cy="280" r="226.7"/></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "coreSys",
        svg: `<symbol id="svg_coreSys" viewBox="66 142 828 276"><polygon fill="white" stroke="#303030" stroke-width="18" stroke-miterlimit="10" points="842.7,214.1 780.8,152.2 179.2,152.2 117.3,214.1 117.3,345.9 179.2,407.8 780.8,407.8 842.7,345.9"/><g><rect x="196.9" y="194.5" stroke="#000000" stroke-width="4.7613" stroke-miterlimit="10" width="165.9" height="171"/><rect x="397.1" y="194.5" stroke="#000000" stroke-width="4.7613" stroke-miterlimit="10" width="165.9" height="171"/><rect x="597.2" y="194.5" stroke="#000000" stroke-width="4.7613" stroke-miterlimit="10" width="165.9" height="171"/><rect x="220.1" y="294.1" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4.7613" stroke-miterlimit="10" width="119.4" height="19.4"/><rect x="220.1" y="322.7" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4.7613" stroke-miterlimit="10" width="119.4" height="19.4"/><rect x="220.1" y="265.5" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4.7613" stroke-miterlimit="10" width="119.4" height="19.4"/><path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4.7613" stroke-miterlimit="10" d="M279.8,204.4c-19.3,0-34.9,15.6-34.9,34.9 s15.6,34.9,34.9,34.9s34.9-15.6,34.9-34.9S299.1,204.4,279.8,204.4z M279.8,257.6c-10.1,0-18.3-8.2-18.3-18.3 c0-10.1,8.2-18.3,18.3-18.3c10.1,0,18.3,8.2,18.3,18.3C298.1,249.4,289.9,257.6,279.8,257.6z"/><ellipse stroke="#FFFFFF" stroke-width="5.1362" stroke-miterlimit="10" cx="480" cy="280" rx="63.8" ry="74.5"/><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="5.1362" stroke-miterlimit="10" cx="480" cy="228.5" r="15.8"/><path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="5.1362" stroke-miterlimit="10" d="M427.6,250.5h103.4c0,0-46.9,7.1-51.7,93.1 C479.3,343.6,483.7,258.2,427.6,250.5z"/><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="3.7583" stroke-miterlimit="10" cx="680.2" cy="280" r="10.3"/><ellipse transform="matrix(0.7431 -0.6691 0.6691 0.7431 -12.654 527.0353)" fill="none" stroke="#FFFFFF" stroke-width="4.8492" stroke-miterlimit="10" cx="680.2" cy="280" rx="17.6" ry="75.5"/><ellipse transform="matrix(-0.5878 -0.809 0.809 -0.5878 853.4232 994.8409)" fill="none" stroke="#FFFFFF" stroke-width="4.8492" stroke-miterlimit="10" cx="680.2" cy="280" rx="17.6" ry="75.5"/><ellipse transform="matrix(-0.9781 -0.2079 0.2079 -0.9781 1287.2416 695.2945)" fill="none" stroke="#FFFFFF" stroke-width="4.8492" stroke-miterlimit="10" cx="680.2" cy="280" rx="17.6" ry="75.5"/></g></symbol>`,
        height: 1,
        width: 3
    },
    {
        id: "hull",
        svg: `<symbol id="svg_hull" viewBox="184 -16 592 592"><rect x="266" y="66" fill="white" stroke="#000000" stroke-width="18.5192" stroke-miterlimit="10" width="428" height="428"/></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "hullCrew",
        svg: `<symbol id="svg_hullCrew" viewBox="184 -16 592 592"><defs><symbol id="_internalStar" viewBox="165 212 172 172"><polygon points="251.2,216.3 271.3,278.1 336.3,278.1 283.7,316.4 303.8,378.2 251.2,340 198.5,378.2 218.6,316.4 166,278.1 231.1,278.1"/></symbol></defs><rect x="266" y="66" fill="white" stroke="#000000" stroke-width="18.5192" stroke-miterlimit="10" width="428" height="428"/><use href="#_internalStar" x="373" y="173" width="214" height="214" /></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "stealthHull",
        svg: `<symbol id="svg_stealthHull" viewBox="243 43 474 474"><rect x="313.8" y="113.8" transform="matrix(0.7071 0.7071 -0.7071 0.7071 338.5786 -257.4012)" width="332.3" height="332.3"/></symbol>`,
        height: 1,
        width: 1
    },
];

export const shipOutlines: IShipOutlineSVG[] = [
    {
        id: "originalSmall",
        name: "Core - Small",
        notes: "The small ship from the core rules ship record sheet",
        svg: `<symbol id="_freeformBackground" viewBox="410 -5425 3030 4120"><g transform="scale(1, -1)"><path d="M1860 5396 c-153 -64 -238 -129 -324 -245 -72 -96 -135 -258 -176 -451 -17 -80 -34 -153 -36 -163 -4 -11 -79 -55 -203 -117 l-198 -98 -251 -454 -252 -454 0 -651 0 -652 53 -15 c28 -8 95 -28 147 -44 l95 -28 3 -357 2 -357 1205 0 1205 0 2 357 3 357 95 28 c52 16 119 36 148 44 l52 15 0 652 0 651 -252 454 -251 454 -198 98 c-124 62 -199 106 -203 117 -2 10 -19 83 -36 163 -77 361 -203 554 -435 665 -118 57 -130 59 -195 31z m195 -41 c231 -111 347 -293 430 -673 19 -90 35 -164 35 -165 0 -1 90 -47 200 -102 l200 -100 250 -450 250 -451 -2 -648 -3 -648 -60 -18 c-33 -10 -99 -30 -147 -45 l-88 -26 0 -355 0 -354 -1195 0 -1195 0 0 354 0 355 -87 26 c-49 15 -115 35 -148 45 l-60 18 -3 648 -2 648 250 451 250 450 200 100 c110 55 200 101 200 102 0 1 16 75 35 165 89 411 211 585 495 704 66 28 77 26 195 -31z"/></g></symbol>`,
        width: 3030,
        height: 4120
    },
    {
        id: "originalMedium",
        name: "Core - Medium",
        notes: "The medium ship from the core rules ship record sheet",
        svg: `<symbol id="_freeformBackground" viewBox="775 -7855 3040 6530"><g transform="scale(1, -1)"><path d="M2230 7816 c-153 -64 -238 -129 -324 -245 -75 -100 -134 -256 -184 -481 l-38 -175 -243 -383 c-133 -211 -247 -396 -252 -410 -5 -15 -97 -400 -204 -857 l-195 -829 0 -1153 0 -1152 53 -15 c28 -8 95 -28 147 -44 l95 -28 3 -357 2 -357 1205 0 1205 0 2 357 3 357 95 28 c52 16 119 36 148 44 l52 15 0 1152 0 1153 -195 829 c-107 457 -199 842 -204 857 -5 14 -117 197 -249 405 -131 208 -242 387 -246 398 -4 11 -23 92 -42 180 -82 379 -204 567 -439 680 -118 57 -130 59 -195 31z m195 -41 c231 -110 347 -293 429 -670 19 -88 38 -169 42 -180 4 -11 115 -190 246 -398 132 -208 244 -391 249 -405 5 -15 97 -400 204 -857 l195 -830 -2 -1149 -3 -1148 -60 -18 c-33 -10 -99 -30 -147 -45 l-88 -26 0 -355 0 -354 -1195 0 -1195 0 0 354 0 355 -87 26 c-49 15 -115 35 -148 45 l-60 18 -3 1148 -2 1149 195 830 c107 457 199 842 204 857 5 14 119 199 252 410 l243 383 38 175 c93 425 212 595 498 716 66 28 77 26 195 -31z"/></g></symbol>`,
        width: 3040,
        height: 6530
    },
    {
        id: "originalLarge",
        name: "Core - Large",
        notes: "The large ship from the core rules ship record sheet",
        svg: `<symbol id="_freeformBackground" viewBox="800 -8475 6050 7150"><g transform="scale(1,-1)"><path d="M3760 8426 c-153 -64 -238 -129 -324 -245 -74 -99 -135 -257 -181 -471 -20 -91 -39 -168 -43 -171 -4 -3 -68 -25 -142 -48 -74 -24 -205 -65 -291 -92 l-156 -50 -299 -449 -299 -449 -565 -141 c-311 -77 -582 -145 -602 -151 l-38 -10 0 -1802 0 -1802 300 -300 300 -300 0 -302 0 -303 2405 0 2405 0 0 303 0 302 300 300 300 300 0 1801 0 1802 -567 141 c-313 78 -584 146 -603 152 -32 8 -58 44 -334 459 l-299 449 -291 97 c-160 53 -295 100 -300 104 -4 5 -23 79 -42 167 -82 377 -204 566 -439 678 -118 57 -130 59 -195 31z m195 -41 c231 -111 347 -293 430 -673 19 -90 35 -165 35 -167 0 -2 136 -49 303 -104 l302 -102 299 -449 c280 -421 302 -451 335 -460 20 -5 272 -68 561 -140 289 -72 542 -135 563 -141 l37 -10 0 -1797 0 -1797 -300 -300 -300 -300 0 -297 0 -298 -2395 0 -2395 0 0 298 0 297 -300 300 -300 300 2 1799 3 1800 597 149 596 149 299 449 298 448 155 50 c85 27 221 70 301 95 l146 47 37 174 c89 417 210 591 496 711 66 28 77 26 195 -31z"/></g></symbol>`,
        width: 6050,
        height: 7150
    }
];
