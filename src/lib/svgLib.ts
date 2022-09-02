export interface ISystemSVG {
    id: string;
    svg: string;
    height: number;
    width: number;
};

interface ISystem {
    name: string;
    [k: string]: unknown;
};

export const getSVG = (sys: ISystem): ISystemSVG | undefined => {
    if ( (sys !== undefined) && (sys.hasOwnProperty("name")) && (sys.name !== undefined) ) {
        let realname = sys.name;
        // Look for modifiers
        if ( (sys.name === "adfc") && (sys.hasOwnProperty("advanced")) && (sys.advanced) ) {
                realname = "aadfc";
        } else if ( (sys.name === "fireControl") && (sys.hasOwnProperty("advanced")) && (sys.advanced) ) {
                realname = "afcs";
        } else if (sys.name === "screen") {
            let advanced = false;
            if (sys.hasOwnProperty("advanced")) {
                advanced = sys.advanced as boolean;
            }
            let area = false;
            if (sys.hasOwnProperty("area")) {
                area = sys.area as boolean;
            }
            if (advanced && area) {
                realname = "screenAA";
            } else if (advanced) {
                realname = "screenAdv";
            } else if (area) {
                realname = "screenArea";
            }
        } else if (sys.name === "mineLayer") {
            if ( (! sys.hasOwnProperty("capacity")) || (sys.capacity < 1) || (sys.capacity > 9 ) ) {
                return undefined;
            }
            realname = `${sys.name}${sys.capacity}`;
        }
        return svgLib.find(x => x.id === realname);
    }
    return undefined;
};

export const svgLib: ISystemSVG[] = [
    {
        id: "aadfc",
        svg: `<symbol id="svg_aadfc" viewBox="349 19 261 522"><g><rect x="362" y="68" fill="white" stroke="#000000" stroke-width="22" stroke-miterlimit="10" width="236" height="424"/><rect x="414.7" y="314.7" fill="none" stroke="#000000" stroke-width="18.1941" stroke-miterlimit="10" width="130.7" height="130.7"/><rect x="414.7" y="114.6" fill="none" stroke="#000000" stroke-width="18.1941" stroke-miterlimit="10" width="130.7" height="130.7"/><polygon points="480,179.9 414.7,114.6 484.7,114.6 545.3,114.6"/><polygon points="480,179.9 414.7,245.3 484.7,245.3 545.3,245.3"/><polygon points="480,380.1 414.7,445.4 484.7,445.4 545.3,445.4"/><polygon points="480,380.1 414.7,314.7 484.7,314.7 545.3,314.7"/></g></symbol>`,
        height: 2,
        width: 1
    },
    {
        id: "adfc",
        svg: `<symbol id="svg_adfc" viewBox="248 48 464 464"><g><rect x="257" y="57" fill="white" stroke="#000000" stroke-width="15.0325" stroke-miterlimit="10" width="446" height="446"/><polygon points="480,280 257,57 480,58.8 703,57"/><polygon points="480,280 257,503 480,501.2 703,503"/></g></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "afcs",
        svg: `<symbol id="svg_afcs" viewBox="271 -31.25 415 622.5"><rect x="287" y="32" fill="white" stroke="#000000" stroke-width="28" stroke-miterlimit="10" width="384" height="497"/><circle stroke="#000000" stroke-width="13.7436" stroke-miterlimit="10" cx="480" cy="353" r="75.1"/><circle stroke="#000000" stroke-width="13.7436" stroke-miterlimit="10" cx="480" cy="196" r="75.1"/></symbol>`,
        height: 1.5,
        width: 1
    },
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
        id: "drive",
        svg: `<symbol id="svg_drive" viewBox="164 -35.5 629 629"><polygon fill="none" stroke="#000000" stroke-width="26" stroke-miterlimit="10" points="779,526 180,526 180,215.8 479.5,34 779,215.8"/></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "driveAdv",
        svg: `<symbol id="svg_driveAdv" viewBox="245 45 470 470"><polygon fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="706.8,390.2 480,500.4 253.2,390.2 253.2,169.8 480,59.6 706.8,169.8"/></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "fireControl",
        svg: `<symbol id="svg_fireControl" viewBox="274 75 411 411"><rect x="287.5" y="88.5" fill="white" stroke="#000000" stroke-width="25" stroke-miterlimit="10" width="384" height="384"/><circle stroke="#000000" stroke-width="22.2545" stroke-miterlimit="10" cx="480" cy="280" r="121.6"/></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "ftl",
        svg: `<symbol id="svg_ftl" viewBox="18.5 -180.5 922 922"><g><rect x="264.5" y="65.5" fill="none" stroke="#000000" stroke-width="29" stroke-miterlimit="10" width="430" height="430"/><path fill="none" stroke="#000000" stroke-width="28.507" stroke-miterlimit="10" d="M265.4,260.8c0,0,43.9,136,104.2,136 c31.9,0,52.6-54.9,63.8-77.5c21.7-43.8,40.7-91,72.1-129c14.9-18,37.3-38.2,62.9-37.6c28.1,0.6,48.5,27.5,65,47.1 c23.1,27.5,43.5,57.6,61.9,88.5"/></g></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "ftlAdv",
        svg: `<symbol id="svg_ftlAdv" viewBox="-51.5 -247.5 1058 1058"><g><rect x="264.5" y="65.5" fill="none" stroke="#000000" stroke-width="29" stroke-miterlimit="10" width="430" height="430"/><path fill="none" stroke="#000000" stroke-width="28.507" stroke-miterlimit="10" d="M265.4,260.8c0,0,43.9,136,104.2,136 c31.9,0,52.6-54.9,63.8-77.5c21.7-43.8,40.7-91,72.1-129c14.9-18,37.3-38.2,62.9-37.6c28.1,0.6,48.5,27.5,65,47.1 c23.1,27.5,43.5,57.6,61.9,88.5"/></g><rect x="221" y="25" fill="none" stroke="#000000" stroke-width="12" stroke-miterlimit="10" width="514" height="514"/></symbol>`,
        width: 1,
        height: 1
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
        id: "mineLayer2",
        svg: `<symbol id="svg_mineLayer2" viewBox="-7 -12 179 537"><symbol id="svg__mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="165" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/></symbol>`,
        height: 3,
        width: 1
    },
    {
        id: "mineLayer3",
        svg: `<symbol id="svg_mineLayer3" viewBox="-7 -12 179 537"><symbol id="svg__mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="165" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/></symbol>`,
        height: 3,
        width: 1
    },
    {
        id: "mineLayer4",
        svg: `<symbol id="svg_mineLayer4" viewBox="-19 -12 358 537"><symbol id="svg__mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="320" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/></symbol>`,
        height: 3,
        width: 2
    },
    {
        id: "mineLayer5",
        svg: `<symbol id="svg_mineLayer5" viewBox="-19 -12 358 537"><symbol id="svg__mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="320" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/></symbol>`,
        height: 3,
        width: 2
    },
    {
        id: "mineLayer6",
        svg: `<symbol id="svg_mineLayer6" viewBox="-19 -12 358 537"><symbol id="svg__mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="320" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="358.25" width="130" height="130"/></symbol>`,
        height: 3,
        width: 2
    },
    {
        id: "mineLayer7",
        svg: `<symbol id="svg_mineLayer7" viewBox="-33 -12 537 537"><symbol id="svg__mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="470" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="24.75" width="130" height="130"/></symbol>`,
        height: 3,
        width: 3
    },
    {
        id: "mineLayer8",
        svg: `<symbol id="svg_mineLayer8" viewBox="-33 -12 537 537"><symbol id="svg__mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="470" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="191.5" width="130" height="130"/></symbol>`,
        height: 3,
        width: 3
    },
    {
        id: "mineLayer9",
        svg: `<symbol id="svg_mineLayer9" viewBox="-33 -12 537 537"><symbol id="svg__mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="470" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="358.25" width="130" height="130"/></symbol>`,
        height: 3,
        width: 3
    },
    {
        id: "mineSweeper",
        svg: `<symbol id="svg_mineSweeper" viewBox="255 55 450 450"><g><path d="M373.4,501.7V386.6H258.3v-71h115.1v-71H258.3v-71h115.1V58.3h71v115.2h71V58.3h71v115.2h115.2v71H586.5v71h115.2v71H586.5 v115.1h-71V386.6h-71v115.1H373.4z"/></g></symbol>`,
        height: 2,
        width: 2
    },
    {
        id: "screen",
        svg: `<symbol id="svg_screen" viewBox="250 40 460 460"><g><circle cx="480" cy="366.8" r="131.8"/><path fill="none" stroke="#000000" stroke-width="39.3368" stroke-miterlimit="10" d="M348.2,193.3c0,0,130-67.9,263.6,0"/><path fill="none" stroke="#000000" stroke-width="39.3368" stroke-miterlimit="10" d="M290.8,104.7c0,0,186.6-97.4,378.5,0"/></g></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "screenAA",
        svg: `<symbol id="svg_screenAA" viewBox="280 80 400 400"><g><rect x="413" y="213" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -57.4011 421.4214)" width="134" height="134"/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="398.8,214 332.8,280 398.8,346 "/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="378.2,193.5 291.7,280 378.2,366.5"/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="561.2,214 627.2,280 561.2,346"/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="581.8,193.5 668.3,280 581.8,366.5"/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="414,200.3 480,134.3 546,200.3"/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="393.5,179.7 480,93.2 566.5,179.7"/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="414,359.7 480,425.7 546,359.7"/><polyline fill="none" stroke="#000000" stroke-width="14" stroke-miterlimit="10" points="393.5,380.3 480,466.8 566.5,380.3"/></g></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "screenAdv",
        svg: `<symbol id="svg_screenAdv" viewBox="250 45 460 460"><g><rect x="387.3" y="280.8" transform="matrix(0.7071 0.7071 -0.7071 0.7071 404.6839 -230.0195)" width="185.5" height="185.5"/><polyline fill="none" stroke="#000000" stroke-width="13" stroke-miterlimit="10" points="654.3,330.5 480,156.2 305.7,330.5 "/><polyline fill="none" stroke="#000000" stroke-width="13" stroke-miterlimit="10" points="704.1,279.5 480,55.4 255.9,279.5"/></g></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "screenArea",
        svg: `<symbol id="svg_screenArea" viewBox="302.5 102.5 355 355"><g><circle cx="480" cy="280" r="63"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M417,197c0,0,62.1-32.4,126.1,0"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M409.5,163c0,0,69.4-32.4,140.9,0"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M398.4,129c0,0,80.4-32.4,163.2,0"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M417,363c0,0,62.1,32.4,126.1,0"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M409.5,397c0,0,69.4,32.4,140.9,0"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M398.4,431c0,0,80.4,32.4,163.2,0"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M391.3,217c0,0-32.4,62.1,0,126.1"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M357.3,209.5c0,0-32.4,69.4,0,140.9"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M323.4,198.4c0,0-32.4,80.4,0,163.2"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M568.7,217c0,0,32.4,62.1,0,126.1"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M602.7,209.5c0,0,32.4,69.4,0,140.9"/><path fill="none" stroke="#000000" stroke-width="8.3452" stroke-miterlimit="10" d="M636.6,198.4c0,0,32.4,80.4,0,163.2"/></g></symbol>`,
        width: 1,
        height: 1
    },
    {
        id: "suicide",
        svg: `<symbol id="svg_suicide" viewBox="195 -5 569 569"><polygon fill="white" stroke="#000000" stroke-width="21" stroke-miterlimit="10" points="299.5,515.5 207.5,424.2 207.5,116.8 298.6,44.5 676.9,44.5 751.5,118.8 751.5,422.5 677.8,515.5 "/><path d="M480,112.9c-92.3,0-167.1,74.8-167.1,167.1S387.7,447.1,480,447.1S647.1,372.3,647.1,280S572.3,112.9,480,112.9z M480,152 h78.4l-39.2,64l-39.2,64l-39.2-64l-39.2-64H480z M597.2,344.1L558,408.2l-39.2-64.1L480,280.6L441.2,344l-39.2,64l-39.2-64l-39.2-64 H402h77.6h0.7H558h78.4L597.2,344.1z"/></symbol>`,
        height: 2,
        width: 2
    },
];
