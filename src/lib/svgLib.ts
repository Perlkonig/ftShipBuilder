// A collection of SVGs that are unattached to any specific system object.

export interface ISystemSVG {
    id: string;
    svg: string;
    height: number;
    width: number;
};

export const svgLib: ISystemSVG[] = [
    {
        id: "armour",
        svg: `<symbol id="svg_armour" viewBox="202 2 556 556"><circle fill="none" stroke="#000000" stroke-width="20.8163" stroke-miterlimit="10" cx="480" cy="280" r="226.7"/></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "coreSys",
        svg: `<symbol id="svg_coreSys" viewBox="66 142 828 276"><polygon fill="none" stroke="#303030" stroke-width="18" stroke-miterlimit="10" points="842.7,214.1 780.8,152.2 179.2,152.2 117.3,214.1 117.3,345.9 179.2,407.8 780.8,407.8 842.7,345.9"/><g><rect x="196.9" y="194.5" stroke="#000000" stroke-width="4.7613" stroke-miterlimit="10" width="165.9" height="171"/><rect x="397.1" y="194.5" stroke="#000000" stroke-width="4.7613" stroke-miterlimit="10" width="165.9" height="171"/><rect x="597.2" y="194.5" stroke="#000000" stroke-width="4.7613" stroke-miterlimit="10" width="165.9" height="171"/><rect x="220.1" y="294.1" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4.7613" stroke-miterlimit="10" width="119.4" height="19.4"/><rect x="220.1" y="322.7" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4.7613" stroke-miterlimit="10" width="119.4" height="19.4"/><rect x="220.1" y="265.5" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4.7613" stroke-miterlimit="10" width="119.4" height="19.4"/><path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4.7613" stroke-miterlimit="10" d="M279.8,204.4c-19.3,0-34.9,15.6-34.9,34.9 s15.6,34.9,34.9,34.9s34.9-15.6,34.9-34.9S299.1,204.4,279.8,204.4z M279.8,257.6c-10.1,0-18.3-8.2-18.3-18.3 c0-10.1,8.2-18.3,18.3-18.3c10.1,0,18.3,8.2,18.3,18.3C298.1,249.4,289.9,257.6,279.8,257.6z"/><ellipse stroke="#FFFFFF" stroke-width="5.1362" stroke-miterlimit="10" cx="480" cy="280" rx="63.8" ry="74.5"/><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="5.1362" stroke-miterlimit="10" cx="480" cy="228.5" r="15.8"/><path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="5.1362" stroke-miterlimit="10" d="M427.6,250.5h103.4c0,0-46.9,7.1-51.7,93.1 C479.3,343.6,483.7,258.2,427.6,250.5z"/><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="3.7583" stroke-miterlimit="10" cx="680.2" cy="280" r="10.3"/><ellipse transform="matrix(0.7431 -0.6691 0.6691 0.7431 -12.654 527.0353)" fill="none" stroke="#FFFFFF" stroke-width="4.8492" stroke-miterlimit="10" cx="680.2" cy="280" rx="17.6" ry="75.5"/><ellipse transform="matrix(-0.5878 -0.809 0.809 -0.5878 853.4232 994.8409)" fill="none" stroke="#FFFFFF" stroke-width="4.8492" stroke-miterlimit="10" cx="680.2" cy="280" rx="17.6" ry="75.5"/><ellipse transform="matrix(-0.9781 -0.2079 0.2079 -0.9781 1287.2416 695.2945)" fill="none" stroke="#FFFFFF" stroke-width="4.8492" stroke-miterlimit="10" cx="680.2" cy="280" rx="17.6" ry="75.5"/></g></symbol>`,
        height: 1,
        width: 3
    },
    {
        id: "hull",
        svg: `<symbol id="svg_hull" viewBox="184 -16 592 592"><rect x="266" y="66" fill="none" stroke="#000000" stroke-width="18.5192" stroke-miterlimit="10" width="428" height="428"/></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "hullCrew",
        svg: `<symbol id="svg_hullCrew" viewBox="184 -16 592 592"><defs><symbol id="_internalStar" viewBox="165 212 172 172"><polygon points="251.2,216.3 271.3,278.1 336.3,278.1 283.7,316.4 303.8,378.2 251.2,340 198.5,378.2 218.6,316.4 166,278.1 231.1,278.1"/></symbol></defs><rect x="266" y="66" fill="none" stroke="#000000" stroke-width="18.5192" stroke-miterlimit="10" width="428" height="428"/><use href="#_internalStar" x="373" y="173" width="214" height="214" /></symbol>`,
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
