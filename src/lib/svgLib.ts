import type { Arcs } from "../schemas/ship";

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
            if ( (! sys.hasOwnProperty("capacity")) || (sys.capacity < 1) ) {
                return undefined;
            }
            let qty = sys.capacity as number;
            if (qty > 9) { qty = 9; }
            realname = `${sys.name}${qty}`;
        } else if (sys.name === "bay") {
            if (sys.hasOwnProperty("type")) {
                if (sys.type === "cargo") {
                    realname = "bayCargo";
                } else if (sys.type === "passenger") {
                    realname = "bayPassenger";
                } else if (sys.type === "troop") {
                    realname = "bayTroop";
                }
            }
        } else if ( (sys.name === "missile") || (sys.name === "salvo") ) {
            if (sys.hasOwnProperty("modifier")) {
                if (sys.modifier === "er") {
                    realname = `${sys.name}ER`;
                } else if (sys.modifier === "twostage") {
                    realname = `${sys.name}TwoStage`;
                }
            }
        } else if (sys.name === "salvoLauncher") {
            if (sys.hasOwnProperty("leftArc")) {
                if (sys.leftArc === "AP") {
                    realname = "smlAP";
                } else if (sys.leftArc === "FP") {
                    realname = "smlFP";
                } else if (sys.leftArc === "F") {
                    realname = "smlF";
                }
            }
        } else if (sys.name === "rocketPod") {
            if (sys.hasOwnProperty("leftArc")) {
                if (sys.leftArc === "AP") {
                    realname = sys.name + "AP";
                } else if (sys.leftArc === "FP") {
                    realname = sys.name + "FP";
                } else if (sys.leftArc === "F") {
                    realname = sys.name + "F";
                }
            }
        } else if (sys.name === "magazine") {
            let mod = "";
            if (sys.hasOwnProperty("modifier")) {
                if (sys.modifier === "er") {
                    mod = "ER";
                } else if (sys.modifier === "twostage") {
                    mod = "TwoStage";
                }
            }
            let qty = 2;
            if (sys.hasOwnProperty("capacity")) {
                qty = sys.capacity as number;
            }
            if (qty > 9) { qty = 9; }
            realname = `${sys.name}${mod}${qty}`;
        } else if (sys.name === "mkp") {
            if (sys.hasOwnProperty("arc")) {
                realname = `mkp${sys.arc}`;
            }
        } else if (sys.name === "ecm") {
            if ( (sys.hasOwnProperty("area")) && (sys.area) ) {
                realname = sys.name + "Area"
            }
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
        id: "amt",
        svg: `<symbol id="svg_amt" viewBox="61 130 298 298"><g><polygon fill="white" stroke="#000000" stroke-width="8" stroke-miterlimit="10" points="239,169.4 210,137.2 181,169.4 181,423 239,423"/><polygon stroke="#000000" stroke-width="8" stroke-miterlimit="10" points="181,218.4 181,267 138.3,267"/><polygon stroke="#000000" stroke-width="8" stroke-miterlimit="10" points="181,313 181,403 99.1,403"/><polygon stroke="#000000" stroke-width="8" stroke-miterlimit="10" points="239,218.4 239,267 281.7,267"/><polygon stroke="#000000" stroke-width="8" stroke-miterlimit="10" points="239,313 239,403 320.9,403"/></g></symbol>`,
        width: 1,
        height: 1
    },
    {
        id: "armour",
        svg: `<symbol id="svg_armour" viewBox="202 2 556 556"><circle fill="none" stroke="#000000" stroke-width="20.8163" stroke-miterlimit="10" cx="480" cy="280" r="226.7"/></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "bayCargo",
        svg: `<symbol id="svg_bayCargo" viewBox="305 17 350 525"><rect x="329.4" y="21" fill="white" stroke="#000000" stroke-width="6.282" stroke-miterlimit="10" width="301.2" height="518.1"/><g><path d="M430.9,58.8v84.6h97.8V58.8h26.4V261h-26.4v-94.8h-97.8V261h-26.1V58.8H430.9z"/></g></symbol>`,
        height: 3,
        width: 2
    },
    {
        id: "bayPassenger",
        svg: `<symbol id="svg_bayPassenger" viewBox="305 17 350 525"><rect x="329.4" y="21" fill="white" stroke="#000000" stroke-width="6.282" stroke-miterlimit="10" width="301.2" height="518.1"/><g><path d="M427.8,62c12.6-2.1,29.1-3.9,50.1-3.9c25.8,0,44.7,6,56.7,16.8c11.1,9.6,17.7,24.3,17.7,42.3c0,18.3-5.4,32.7-15.6,43.2 c-13.8,14.7-36.3,22.2-61.8,22.2c-7.8,0-15-0.3-21-1.8v81h-26.1V62z M453.9,159.5c5.7,1.5,12.9,2.1,21.6,2.1 c31.5,0,50.7-15.3,50.7-43.2c0-26.7-18.9-39.6-47.7-39.6c-11.4,0-20.1,0.9-24.6,2.1V159.5z"/></g></symbol>`,
        height: 3,
        width: 2
    },
    {
        id: "bayTroop",
        svg: `<symbol id="svg_bayTroop" viewBox="305 17 350 525"><rect x="329.4" y="21" fill="white" stroke="#000000" stroke-width="6.282" stroke-miterlimit="10" width="301.2" height="518.1"/><g><path d="M466.6,70.6h-61.5V48.4h149.7v22.2H493v180h-26.4V70.6z"/></g></symbol>`,
        height: 3,
        width: 2
    },
    {
        id: "coreSys",
        svg: `<symbol id="svg_coreSys" viewBox="66 142 828 276"><polygon fill="none" stroke="#303030" stroke-width="18" stroke-miterlimit="10" points="842.7,214.1 780.8,152.2 179.2,152.2 117.3,214.1 117.3,345.9 179.2,407.8 780.8,407.8 842.7,345.9"/><g><rect x="196.9" y="194.5" stroke="#000000" stroke-width="4.7613" stroke-miterlimit="10" width="165.9" height="171"/><rect x="397.1" y="194.5" stroke="#000000" stroke-width="4.7613" stroke-miterlimit="10" width="165.9" height="171"/><rect x="597.2" y="194.5" stroke="#000000" stroke-width="4.7613" stroke-miterlimit="10" width="165.9" height="171"/><rect x="220.1" y="294.1" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4.7613" stroke-miterlimit="10" width="119.4" height="19.4"/><rect x="220.1" y="322.7" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4.7613" stroke-miterlimit="10" width="119.4" height="19.4"/><rect x="220.1" y="265.5" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4.7613" stroke-miterlimit="10" width="119.4" height="19.4"/><path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="4.7613" stroke-miterlimit="10" d="M279.8,204.4c-19.3,0-34.9,15.6-34.9,34.9 s15.6,34.9,34.9,34.9s34.9-15.6,34.9-34.9S299.1,204.4,279.8,204.4z M279.8,257.6c-10.1,0-18.3-8.2-18.3-18.3 c0-10.1,8.2-18.3,18.3-18.3c10.1,0,18.3,8.2,18.3,18.3C298.1,249.4,289.9,257.6,279.8,257.6z"/><ellipse stroke="#FFFFFF" stroke-width="5.1362" stroke-miterlimit="10" cx="480" cy="280" rx="63.8" ry="74.5"/><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="5.1362" stroke-miterlimit="10" cx="480" cy="228.5" r="15.8"/><path fill="#FFFFFF" stroke="#FFFFFF" stroke-width="5.1362" stroke-miterlimit="10" d="M427.6,250.5h103.4c0,0-46.9,7.1-51.7,93.1 C479.3,343.6,483.7,258.2,427.6,250.5z"/><circle fill="#FFFFFF" stroke="#FFFFFF" stroke-width="3.7583" stroke-miterlimit="10" cx="680.2" cy="280" r="10.3"/><ellipse transform="matrix(0.7431 -0.6691 0.6691 0.7431 -12.654 527.0353)" fill="none" stroke="#FFFFFF" stroke-width="4.8492" stroke-miterlimit="10" cx="680.2" cy="280" rx="17.6" ry="75.5"/><ellipse transform="matrix(-0.5878 -0.809 0.809 -0.5878 853.4232 994.8409)" fill="none" stroke="#FFFFFF" stroke-width="4.8492" stroke-miterlimit="10" cx="680.2" cy="280" rx="17.6" ry="75.5"/><ellipse transform="matrix(-0.9781 -0.2079 0.2079 -0.9781 1287.2416 695.2945)" fill="none" stroke="#FFFFFF" stroke-width="4.8492" stroke-miterlimit="10" cx="680.2" cy="280" rx="17.6" ry="75.5"/></g></symbol>`,
        height: 1,
        width: 3
    },
    {
        id: "damageControl",
        svg: `<symbol id="svg_damageControl" viewBox="230 30 500 500"><circle fill-rule="evenodd" clip-rule="evenodd" fill="white" stroke="#000000" stroke-width="23" stroke-miterlimit="10" cx="480" cy="280" r="235.5"/><path stroke="#000000" stroke-width="7" stroke-miterlimit="10" d="M463,270.4c0,0-23.6,20.7-52.5,46.4 c-28.9,25.7-32.6,22.5-41,24.6s-20.5,2.2-32.1,18c-11.6,15.8-2,36,0,36.2c0,0,13-19.3,16.2-22.2c3.2-2.9,7.2-1.7,7.2-1.7 s16.3,8.6,19.7,10.4s1.5,5.9,1.5,5.9l-12.8,20c0,0-3.4,4.4-0.2,5.7c14.3,0.8,35.7-9.6,38.7-30.6c3-21,20.4-33.1,20.4-33.1l60.7-55.3 M488.7,294.7c6.7-6,14.6-13.2,22.6-20.5c10.8-9.7,21.7-19.3,32.3-29.2c11-10.2,24-19.3,39.6-19.7c22-0.7,61.4-19.5,37.7-57.9 c0,0-0.3-1.1-1.9,1.4c-1.5,2.5-13.4,22.5-13.4,22.5s-2.9,2.9-7.9,0.6c-5-2.4-29.2-15.2-29.2-15.2s-3-2.2-0.3-6.6 s12.2-19.5,12.2-19.5s2.5-3.4,0-4.4c-2.5-1-40.9,5.4-40.2,36.3c-0.8,10.4-4.9,20-11.3,28.1c-6.6,8.3-15.4,14.7-23.3,21.7 c-9,8-17.9,15.9-26.9,23.9c-5.3,4.7-10.6,9.4-15.9,14.1"/></symbol>`,
        height: 1,
        width: 1
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
        id: "ecm",
        svg: `<symbol id="svg_ecm" viewBox="212 12.5 535 535"><g><path fill="none" stroke="#000000" stroke-width="11" stroke-miterlimit="10" d="M571.2,39.7l-77.6,150.2c-4.5-0.7-9-1.1-13.6-1.1 c-4.6,0-9.2,0.5-13.6,1.1L388.8,39.7C291.8,76.5,222.9,170.2,222.9,280s68.9,203.5,165.8,240.3l77.6-150.2c4.5,0.7,9,1.1,13.6,1.1 c4.6,0,9.2-0.5,13.6-1.1l77.6,150.2c96.9-36.8,165.8-130.5,165.8-240.3S668.2,76.5,571.2,39.7z M480,316.4 c-20.1,0-36.4-16.3-36.4-36.4s16.3-36.4,36.4-36.4s36.4,16.3,36.4,36.4S500.1,316.4,480,316.4z"/><path fill="none" stroke="#000000" stroke-width="11" stroke-miterlimit="10" d="M407.3,75.5C323.2,105.4,263,185.7,263,280 s60.2,174.6,144.3,204.5"/><path fill="none" stroke="#000000" stroke-width="11" stroke-miterlimit="10" d="M552.7,484.5C636.8,454.6,697,374.3,697,280 S636.8,105.4,552.7,75.5"/><path fill="none" stroke="#000000" stroke-width="11" stroke-miterlimit="10" d="M428.6,114.8C358.1,136.7,307,202.4,307,280 c0,77.3,50.7,142.8,120.7,165"/><path fill="none" stroke="#000000" stroke-width="11" stroke-miterlimit="10" d="M531.4,445.2C601.9,423.3,653,357.6,653,280 c0-77.3-50.7-142.8-120.7-165"/><path fill="none" stroke="#000000" stroke-width="11" stroke-miterlimit="10" d="M449.7,157.7c-55,13.6-95.7,63.2-95.7,122.3 c0,59.2,40.8,108.8,95.7,122.3"/><path fill="none" stroke="#000000" stroke-width="11" stroke-miterlimit="10" d="M510.3,402.3c55-13.6,95.7-63.2,95.7-122.3 c0-59.2-40.8-108.8-95.7-122.3"/><circle fill="none" stroke="#000000" stroke-width="10.8406" stroke-miterlimit="10" cx="480" cy="280" r="90.7"/></g></symbol>`,
        width: 1,
        height: 1
    },
    {
        id: "ecmArea",
        svg: `<symbol id="svg_ecmArea" viewBox="206 6.5 547 547"><g><path fill="none" stroke="#000000" stroke-width="30" stroke-miterlimit="10" d="M571.2,39.7l-77.6,150.2c-4.5-0.7-9-1.1-13.6-1.1 c-4.6,0-9.2,0.5-13.6,1.1L388.8,39.7C291.8,76.5,222.9,170.2,222.9,280s68.9,203.5,165.8,240.3l77.6-150.2c4.5,0.7,9,1.1,13.6,1.1 c4.6,0,9.2-0.5,13.6-1.1l77.6,150.2c96.9-36.8,165.8-130.5,165.8-240.3S668.2,76.5,571.2,39.7z M480,316.4 c-20.1,0-36.4-16.3-36.4-36.4s16.3-36.4,36.4-36.4s36.4,16.3,36.4,36.4S500.1,316.4,480,316.4z"/><path fill="none" stroke="#000000" stroke-width="30" stroke-miterlimit="10" d="M407.3,75.5C323.2,105.4,263,185.7,263,280 s60.2,174.6,144.3,204.5"/><path fill="none" stroke="#000000" stroke-width="30" stroke-miterlimit="10" d="M552.7,484.5C636.8,454.6,697,374.3,697,280 S636.8,105.4,552.7,75.5"/><path fill="none" stroke="#000000" stroke-width="30" stroke-miterlimit="10" d="M428.6,114.8C358.1,136.7,307,202.4,307,280 c0,77.3,50.7,142.8,120.7,165"/><path fill="none" stroke="#000000" stroke-width="30" stroke-miterlimit="10" d="M531.4,445.2C601.9,423.3,653,357.6,653,280 c0-77.3-50.7-142.8-120.7-165"/><path fill="none" stroke="#000000" stroke-width="30" stroke-miterlimit="10" d="M449.7,157.7c-55,13.6-95.7,63.2-95.7,122.3 c0,59.2,40.8,108.8,95.7,122.3"/><path fill="none" stroke="#000000" stroke-width="30" stroke-miterlimit="10" d="M510.3,402.3c55-13.6,95.7-63.2,95.7-122.3 c0-59.2-40.8-108.8-95.7-122.3"/><circle fill="black" stroke="#000000" stroke-width="10.8406" stroke-miterlimit="10" cx="480" cy="280" r="90.7"/></g></symbol>`,
        width: 1,
        height: 1
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
        id: "holofield",
        svg: `<symbol id="svg_holofield" viewBox="280 71 400 400"><g><path d="M601.2,302.5c0-16.7,1.2-34-2.3-50.5c-3.4-16-15.6-26.9-26.1-38.7c-9.2-10.5-17-22.3-27.5-31.6 c-5.9-5.3-13.9-7.6-19.4-13.5c-12.7-13.4-8.8-32.5-17.6-47.7c-8.8-15.2-16.8-29.6-27.8-30.3v-0.1c-0.2,0-0.3,0-0.5,0 c-0.2,0-0.3,0-0.5,0v0.1c-11,0.8-19.1,15.1-27.8,30.3c-8.8,15.2-5,34.2-17.6,47.7c-5.5,5.9-13.5,8.2-19.4,13.5 c-10.4,9.4-18.2,21.2-27.5,31.6c-10.4,11.8-22.7,22.8-26.1,38.7c-3.5,16.5-2.3,33.8-2.3,50.5c0,16.8,0,33.7,0,50.5 c0,12.7-1.3,25.5,3.4,37.5c5,12.8,13.7,24.2,23.9,33.2c5.2,4.6,11.1,9.2,17.3,12.2c5,2.4,10,2.3,13.7,7.3 c4.7,6.3,3.2,13.6,2.5,20.8c-0.7,7.8,121.5,7.8,120.7,0c-0.7-7.1-2.2-14.5,2.5-20.8c3.7-5,8.6-4.9,13.7-7.3 c6.3-3,12.2-7.6,17.3-12.2c10.3-9.1,18.9-20.4,23.9-33.2c4.7-12.1,3.4-24.8,3.4-37.5C601.2,336.2,601.2,319.4,601.2,302.5z"/><g><path fill="none" stroke="#000000" stroke-width="29.5924" stroke-miterlimit="10" d="M524.1,90.1c13.4,0.9,21.3,17,26.7,27.3 c8,15.4,14.5,31.7,23.7,46.4c10.4,16.6,24.1,30.8,37.6,44.9c11.8,12.5,19.8,25.8,23.5,43.3c3.4,16.2,2.3,33,2.3,50.5 c0,16.8,0,33.7,0,50.5c0,12.7,1.3,25.5-3.4,37.5c-5,12.8-6.7,24.1-16.9,33.1c-5.2,4.6-11.1,9.2-17.3,12.2c-5,2.4-10,2.3-13.7,7.3 c-4.7,6.3-3.2,13.6-2.5,20.8"/></g><g><path fill="none" stroke="#000000" stroke-width="29.592" stroke-miterlimit="10" d="M435.9,90.1c-13.4,0.9-21.3,17-26.7,27.3 c-8,15.4-14.5,31.7-23.7,46.4c-10.4,16.6-24.1,30.8-37.6,44.9c-11.8,12.5-19.8,25.8-23.5,43.3c-3.4,16.2-2.3,33-2.3,50.5 c0,16.8,0,33.7,0,50.5c0,12.7-1.3,25.5,3.4,37.5c5,12.8,6.7,24.1,16.9,33.1c5.2,4.6,11.1,9.2,17.3,12.2c5,2.4,10,2.3,13.7,7.3 c4.7,6.3,3.2,13.6,2.5,20.8"/></g></g></symbol>`,
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
        id: "magazine2",
        svg: `<symbol id="svg_magazine2" viewBox="-1 -1 22 12"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="20" height="10" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /></symbol>`,
        width: 2,
        height: 1
    },
    {
        id: "magazine3",
        svg: `<symbol id="svg_magazine3" viewBox="-1 -1 32 12"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="10" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /><use href="#_internalSalvo" x="20" y="0" width="10" height="10" /></symbol>`,
        width: 3,
        height: 1
    },
    {
        id: "magazine4",
        svg: `<symbol id="svg_magazine4" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /><use href="#_internalSalvo" x="20" y="0" width="10" height="10" /><use href="#_internalSalvo" x="0" y="10" width="10" height="10" /></symbol>`,
        width: 3,
        height: 2
    },
    {
        id: "magazine5",
        svg: `<symbol id="svg_magazine5" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /><use href="#_internalSalvo" x="20" y="0" width="10" height="10" /><use href="#_internalSalvo" x="0" y="10" width="10" height="10" /><use href="#_internalSalvo" x="10" y="10" width="10" height="10" /></symbol>`,
        width: 3,
        height: 2
    },
    {
        id: "magazine6",
        svg: `<symbol id="svg_magazine6" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /><use href="#_internalSalvo" x="20" y="0" width="10" height="10" /><use href="#_internalSalvo" x="0" y="10" width="10" height="10" /><use href="#_internalSalvo" x="10" y="10" width="10" height="10" /><use href="#_internalSalvo" x="20" y="10" width="10" height="10" /></symbol>`,
        width: 3,
        height: 2
    },
    {
        id: "magazine7",
        svg: `<symbol id="svg_magazine7" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /><use href="#_internalSalvo" x="20" y="0" width="10" height="10" /><use href="#_internalSalvo" x="0" y="10" width="10" height="10" /><use href="#_internalSalvo" x="10" y="10" width="10" height="10" /><use href="#_internalSalvo" x="20" y="10" width="10" height="10" /><use href="#_internalSalvo" x="0" y="20" width="10" height="10" /></symbol>`,
        width: 3,
        height: 3
    },
    {
        id: "magazine8",
        svg: `<symbol id="svg_magazine8" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /><use href="#_internalSalvo" x="20" y="0" width="10" height="10" /><use href="#_internalSalvo" x="0" y="10" width="10" height="10" /><use href="#_internalSalvo" x="10" y="10" width="10" height="10" /><use href="#_internalSalvo" x="20" y="10" width="10" height="10" /><use href="#_internalSalvo" x="0" y="20" width="10" height="10" /><use href="#_internalSalvo" x="10" y="20" width="10" height="10" /></symbol>`,
        width: 3,
        height: 3
    },
    {
        id: "magazine9",
        svg: `<symbol id="svg_magazine9" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvo" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvo" x="0" y="0" width="10" height="10" /><use href="#_internalSalvo" x="10" y="0" width="10" height="10" /><use href="#_internalSalvo" x="20" y="0" width="10" height="10" /><use href="#_internalSalvo" x="0" y="10" width="10" height="10" /><use href="#_internalSalvo" x="10" y="10" width="10" height="10" /><use href="#_internalSalvo" x="20" y="10" width="10" height="10" /><use href="#_internalSalvo" x="0" y="20" width="10" height="10" /><use href="#_internalSalvo" x="10" y="20" width="10" height="10" /><use href="#_internalSalvo" x="20" y="20" width="10" height="10" /></symbol>`,
        width: 3,
        height: 3
    },
    {
        id: "magazineER2",
        svg: `<symbol id="svg_magazineER2" viewBox="-1 -1 22 12"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="20" height="10" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /></symbol>`,
        width: 2,
        height: 1
    },
    {
        id: "magazineER3",
        svg: `<symbol id="svg_magazineER3" viewBox="-1 -1 32 12"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="10" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="0" width="10" height="10" /></symbol>`,
        width: 3,
        height: 1
    },
    {
        id: "magazineER4",
        svg: `<symbol id="svg_magazineER4" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="10" width="10" height="10" /></symbol>`,
        width: 3,
        height: 2
    },
    {
        id: "magazineER5",
        svg: `<symbol id="svg_magazineER5" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="10" width="10" height="10" /></symbol>`,
        width: 3,
        height: 2
    },
    {
        id: "magazineER6",
        svg: `<symbol id="svg_magazineER6" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="10" width="10" height="10" /></symbol>`,
        width: 3,
        height: 2
    },
    {
        id: "magazineER7",
        svg: `<symbol id="svg_magazineER7" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="20" width="10" height="10" /></symbol>`,
        width: 3,
        height: 3
    },
    {
        id: "magazineER8",
        svg: `<symbol id="svg_magazineER8" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="20" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="20" width="10" height="10" /></symbol>`,
        width: 3,
        height: 3
    },
    {
        id: "magazineER9",
        svg: `<symbol id="svg_magazineER9" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvoER" viewBox="430.5 148 99 99"><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvoER" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="10" width="10" height="10" /><use href="#_internalSalvoER" x="0" y="20" width="10" height="10" /><use href="#_internalSalvoER" x="10" y="20" width="10" height="10" /><use href="#_internalSalvoER" x="20" y="20" width="10" height="10" /></symbol>`,
        width: 3,
        height: 3
    },
    {
        id: "magazineTwoStage2",
        svg: `<symbol id="svg_magazineTwoStage2" viewBox="-1 -1 22 12"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="20" height="10" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /></symbol>`,
        width: 2,
        height: 1
    },
    {
        id: "magazineTwoStage3",
        svg: `<symbol id="svg_magazineTwoStage3" viewBox="-1 -1 32 12"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="30" height="10" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="0" width="10" height="10" /></symbol>`,
        width: 3,
        height: 1
    },
    {
        id: "magazineTwoStage4",
        svg: `<symbol id="svg_magazineTwoStage4" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="10" width="10" height="10" /></symbol>`,
        width: 3,
        height: 2
    },
    {
        id: "magazineTwoStage5",
        svg: `<symbol id="svg_magazineTwoStage5" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="10" width="10" height="10" /></symbol>`,
        width: 3,
        height: 2
    },
    {
        id: "magazineTwoStage6",
        svg: `<symbol id="svg_magazineTwoStage6" viewBox="-1 -1 32 22"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="30" height="20" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="10" width="10" height="10" /></symbol>`,
        width: 3,
        height: 2
    },
    {
        id: "magazineTwoStage7",
        svg: `<symbol id="svg_magazineTwoStage7" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="20" width="10" height="10" /></symbol>`,
        width: 3,
        height: 3
    },
    {
        id: "magazineTwoStage8",
        svg: `<symbol id="svg_magazineTwoStage8" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="20" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="20" width="10" height="10" /></symbol>`,
        width: 3,
        height: 3
    },
    {
        id: "magazineTwoStage9",
        svg: `<symbol id="svg_magazineTwoStage9" viewBox="-1 -1 32 32"><defs><symbol id="_internalSalvoTwoStage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><rect x="0" y="0" width="30" height="30" stroke="black" fill="white" /><use href="#_internalSalvoTwoStage" x="0" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="0" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="10" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="0" y="20" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="10" y="20" width="10" height="10" /><use href="#_internalSalvoTwoStage" x="20" y="20" width="10" height="10" /></symbol>`,
        width: 3,
        height: 3
    },
    {
        id: "marines",
        svg: `<symbol id="svg_marines" viewBox="310 110 340 340"><path fill="white" stroke="#000000" stroke-width="12" stroke-miterlimit="10" d="M605,228.3c0-62-50.3-112.3-112.3-112.3h-25.4 c-62,0-112.3,50.3-112.3,112.3v104.4c0,62,50.3,112.3,112.3,112.3h25.4c62,0,112.3-50.3,112.3-112.3V228.3z"/><path d="M562.5,378.3c-3.2-3.2-6.8-2.6-10.2-6.6c-2.9-3.5,5.1-3.8,3.4-7.5c-15.2-33.5-37.7-90-39.5-93.2c-2.6-4.5-0.6-12.9,4.5-13.6 c5.2-0.6,8.4-0.6,9,2.6s6.7,15,6.7,15s-8.2,8.4-6.6,11.9c2.9,6.4,7.6,15.7,10.9,17c5.2,1.9,12.3-1.3,12.3-3.9 c0-2.6-1.9-23.2-1.9-23.2s9.7-36.8,10.3-43.2c0.2-2-5.3-3.8-8.9-10c-3.8-6.4-5-24.8-9.1-30.9c-4.6-6.7-9-4.3-9-4.3s-21.9,2.6-25.8,0 s0.7-4,0-4.5c0,0-14.8-17.1-28.4-17.1s-28.4,17.1-28.4,17.1c-0.7,0.5,3.9,1.9,0,4.5c-3.9,2.6-25.8,0-25.8,0s-4.5-2.4-9,4.3 c-4.1,6.1-5.3,24.4-9.1,30.9c-3.7,6.2-9.1,8-8.9,10c0.6,6.5,10.3,43.2,10.3,43.2s-1.9,20.7-1.9,23.2c0,2.6,7.1,5.8,12.3,3.9 c3.6-1.3,8.7-12,11.5-18.4c1.2-2.8-7.3-11.7-7.3-11.7s6.1-10.5,6.8-13.7c0.6-3.2,3.9-3.2,9-2.6c5.2,0.6,7.1,9,4.5,13.6 c-1.8,3.2-24.4,59.7-39.5,93.2c-1.7,3.7,6.3,4,3.4,7.5c-3.3,4-6.9,3.4-10.2,6.6c-4.7,4.6-8.2,7.9-7.9,8.9c2.6,7.7,45.1,5.8,45.1,5.8 s13.6-6.5,11-14.8c-1.1-3.6-3.4-35.9-3-45.4c0.5-12.6,4-3,6.2-8.2c3.9-9,18.1-26.5,22.6-29c4.5-2.6,8.4-4,8.4-4s3.9,1.5,8.4,4 c4.5,2.6,18.7,20,22.6,29c2.2,5.2,5.8-4.5,6.2,8.2c0.3,9.5-1.9,41.8-3,45.4c-2.6,8.4,11,14.8,11,14.8s42.5,1.9,45.1-5.8 C570.7,386.2,567.1,382.9,562.5,378.3z"/></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "mineLayer2",
        svg: `<symbol id="svg_mineLayer2" viewBox="-7 -12 179 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="165" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/></symbol>`,
        height: 3,
        width: 1
    },
    {
        id: "mineLayer3",
        svg: `<symbol id="svg_mineLayer3" viewBox="-7 -12 179 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="165" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/></symbol>`,
        height: 3,
        width: 1
    },
    {
        id: "mineLayer4",
        svg: `<symbol id="svg_mineLayer4" viewBox="-19 -12 358 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="320" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/></symbol>`,
        height: 3,
        width: 2
    },
    {
        id: "mineLayer5",
        svg: `<symbol id="svg_mineLayer5" viewBox="-19 -12 358 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="320" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/></symbol>`,
        height: 3,
        width: 2
    },
    {
        id: "mineLayer6",
        svg: `<symbol id="svg_mineLayer6" viewBox="-19 -12 358 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="320" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="358.25" width="130" height="130"/></symbol>`,
        height: 3,
        width: 2
    },
    {
        id: "mineLayer7",
        svg: `<symbol id="svg_mineLayer7" viewBox="-33 -12 537 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="470" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="24.75" width="130" height="130"/></symbol>`,
        height: 3,
        width: 3
    },
    {
        id: "mineLayer8",
        svg: `<symbol id="svg_mineLayer8" viewBox="-33 -12 537 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="470" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="191.5" width="130" height="130"/></symbol>`,
        height: 3,
        width: 3
    },
    {
        id: "mineLayer9",
        svg: `<symbol id="svg_mineLayer9" viewBox="-33 -12 537 537"><symbol id="_mineIndividual" width="79" height="79" viewBox="440.5 244 79 79"><polygon fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="480,315.8 466.7,293.6 453.5,271.5 480,271.5 506.5,271.5 493.3,293.6"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="480" y1="269.3" x2="480" y2="244.3"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="466.6" y1="292.4" x2="445" y2="304.9"/><line fill="none" stroke="#000000" stroke-width="7" stroke-miterlimit="10" x1="493.4" y1="292.4" x2="515" y2="304.9"/></symbol><rect x="0" y="0" fill="white" stroke="#000000" stroke-width="10" stroke-miterlimit="10" width="470" height="515"/><use href="#_mineIndividual" x="17.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="17.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="169.5" y="358.25" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="24.75" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="191.5" width="130" height="130"/><use href="#_mineIndividual" x="321.5" y="358.25" width="130" height="130"/></symbol>`,
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
        id: "missile",
        svg: `<symbol id="svg_missile" viewBox="286.5 85 386 386"><polygon fill="white" stroke="#000000" stroke-width="12.7306" stroke-miterlimit="10" points="514.6,306.2 514.6,134.7 480,96.3  445.4,134.7 445.4,306.2 347.6,413.6 434.3,413.6 450.1,432.1 450.1,463.7 509.9,463.7 509.9,432.1 525.7,413.6 612.4,413.6"/></symbol>`,
        width: 1,
        height: 1
    },
    {
        id: "missileER",
        svg: `<symbol id="svg_missileER" viewBox="286.5 85 386 386"><polygon fill="black" stroke="#000000" stroke-width="12.7306" stroke-miterlimit="10" points="514.6,306.2 514.6,134.7 480,96.3  445.4,134.7 445.4,306.2 347.6,413.6 434.3,413.6 450.1,432.1 450.1,463.7 509.9,463.7 509.9,432.1 525.7,413.6 612.4,413.6"/></symbol>`,
        width: 1,
        height: 1
    },
    {
        id: "missileTwoStage",
        svg: `<symbol id="svg_missileTwoStage" viewBox="286.5 85 386 386"><defs><symbol id="_internalTwoStage" viewBox="265 134 150 150"><polygon fill="white" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="386.2,230.5 339.9,140.5 293.6,230.5 324.5,216.7 293.6,275.5 339.9,245.3 386.2,275.5 355.9,216.7"/></symbol></defs><polygon fill="white" stroke="#000000" stroke-width="12.7306" stroke-miterlimit="10" points="514.6,306.2 514.6,134.7 480,96.3  445.4,134.7 445.4,306.2 347.6,413.6 434.3,413.6 450.1,432.1 450.1,463.7 509.9,463.7 509.9,432.1 525.7,413.6 612.4,413.6"/><use href="#_internalTwoStage" x="429" y="310" height="100" width="100" /></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "mkpAP",
        svg: `<symbol id="svg_mkpAP" viewBox="275 78 410 410"><g transform="rotate(240, 480, 282)"><polygon fill="white" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="401.7,467.5 323.5,331.5 401.7,195.5  558.3,195.5 636.5,331.5 558.3,467.5"/><polygon stroke="#000000" stroke-miterlimit="10" points="480,329.3 556.9,94.5 403.1,94.5 480,329.3 556.9,94.5 403.1,94.5"/></g></symbol>`,
        width: 1,
        height: 1
    },
    {
        id: "mkpAS",
        svg: `<symbol id="svg_mkpAS" viewBox="275 78 410 410"><g transform="rotate(120, 480, 282)"><polygon fill="white" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="401.7,467.5 323.5,331.5 401.7,195.5  558.3,195.5 636.5,331.5 558.3,467.5"/><polygon stroke="#000000" stroke-miterlimit="10" points="480,329.3 556.9,94.5 403.1,94.5 480,329.3 556.9,94.5 403.1,94.5"/></g></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "mkpF",
        svg: `<symbol id="svg_mkpF" viewBox="290 92 380 380"><g><polygon fill="white" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="401.7,467.5 323.5,331.5 401.7,195.5  558.3,195.5 636.5,331.5 558.3,467.5"/><polygon stroke="#000000" stroke-miterlimit="10" points="480,329.3 556.9,94.5 403.1,94.5 480,329.3 556.9,94.5 403.1,94.5"/></g></symbol>`,
        width: 1,
        height: 1
    },
    {
        id: "mkpFP",
        svg: `<symbol id="svg_mkpFP" viewBox="275 78 410 410"><g transform="rotate(300, 480, 282)"><polygon fill="white" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="401.7,467.5 323.5,331.5 401.7,195.5  558.3,195.5 636.5,331.5 558.3,467.5"/><polygon stroke="#000000" stroke-miterlimit="10" points="480,329.3 556.9,94.5 403.1,94.5 480,329.3 556.9,94.5 403.1,94.5"/></g></symbol>`,
        width: 1,
        height: 1
    },
    {
        id: "mkpFS",
        svg: `<symbol id="svg_mkpFS" viewBox="275 78 410 410"><g transform="rotate(60, 480, 282)"><polygon fill="white" stroke="#000000" stroke-width="7" stroke-miterlimit="10" points="401.7,467.5 323.5,331.5 401.7,195.5  558.3,195.5 636.5,331.5 558.3,467.5"/><polygon stroke="#000000" stroke-miterlimit="10" points="480,329.3 556.9,94.5 403.1,94.5 480,329.3 556.9,94.5 403.1,94.5"/></g></symbol>`,
        width: 1,
        height: 1
    },
    {
        id: "rocketPodAP",
        svg: `<symbol id="svg_rocketPodAP" viewBox="-1 -1 602 602"><defs><symbol id="_internalRocket" viewBox="260 39.5 440 440"><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="398,364.9 348.9,311 348.9,224.9 331.6,205.6  314.2,224.9 314.2,311 265.1,364.9 320.2,364.9 320.2,397.5 342.9,397.5 342.9,364.9"/><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="562,364.9 611.1,311 611.1,224.9 628.4,205.6  645.8,224.9 645.8,311 694.9,364.9 639.8,364.9 639.8,397.5 617.1,397.5 617.1,364.9"/><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="546.4,282.2 497.4,228.3 497.4,142.3 480,123 462.6,142.3 462.6,228.3 413.6,282.2 468.6,282.2 468.6,314.8 491.4,314.8 491.4,282.2"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><use href="#_internalRocket" width="350" height="350" x="125" y="115" /></symbol>`,
        width: 2,
        height: 2
    },
    {
        id: "rocketPodFP",
        svg: `<symbol id="svg_rocketPodFP" viewBox="-1 -1 602 602"><defs><symbol id="_internalRocket" viewBox="260 39.5 440 440"><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="398,364.9 348.9,311 348.9,224.9 331.6,205.6  314.2,224.9 314.2,311 265.1,364.9 320.2,364.9 320.2,397.5 342.9,397.5 342.9,364.9"/><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="562,364.9 611.1,311 611.1,224.9 628.4,205.6  645.8,224.9 645.8,311 694.9,364.9 639.8,364.9 639.8,397.5 617.1,397.5 617.1,364.9"/><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="546.4,282.2 497.4,228.3 497.4,142.3 480,123 462.6,142.3 462.6,228.3 413.6,282.2 468.6,282.2 468.6,314.8 491.4,314.8 491.4,282.2"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><use href="#_internalRocket" width="350" height="350" x="125" y="115" /></symbol>`,
        height: 2,
        width: 2
    },
    {
        id: "rocketPodF",
        svg: `<symbol id="svg_rocketPodF" viewBox="-1 -1 602 602"><defs><symbol id="_internalRocket" viewBox="260 39.5 440 440"><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="398,364.9 348.9,311 348.9,224.9 331.6,205.6  314.2,224.9 314.2,311 265.1,364.9 320.2,364.9 320.2,397.5 342.9,397.5 342.9,364.9"/><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="562,364.9 611.1,311 611.1,224.9 628.4,205.6  645.8,224.9 645.8,311 694.9,364.9 639.8,364.9 639.8,397.5 617.1,397.5 617.1,364.9"/><polygon stroke="#000000" stroke-width="4.6996" stroke-miterlimit="10" points="546.4,282.2 497.4,228.3 497.4,142.3 480,123 462.6,142.3 462.6,228.3 413.6,282.2 468.6,282.2 468.6,314.8 491.4,314.8 491.4,282.2"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><use href="#_internalRocket" width="350" height="350" x="125" y="115" /></symbol>`,
        width: 2,
        height: 2
    },
    {
        id: "salvo",
        svg: `<symbol id="svg_salvo" viewBox="385 85.5 190 190"><g><path fill="none" stroke="#000000" stroke-width="3.5245" stroke-miterlimit="10" d="M480,107.4c-50.6,0-91.6,41-91.6,91.6h36.4 c0-30.5,24.7-55.2,55.2-55.2s55.2,24.7,55.2,55.2h36.4C571.7,148.5,530.7,107.4,480,107.4z"/><line fill="none" stroke="#000000" stroke-width="9.1569" stroke-miterlimit="10" x1="535.3" y1="194.7" x2="571.7" y2="194.7"/><line fill="none" stroke="#000000" stroke-width="9.1569" stroke-miterlimit="10" x1="424.8" y1="194.7" x2="388.3" y2="194.7"/><line fill="none" stroke="#000000" stroke-width="10.5735" stroke-miterlimit="10" x1="507.5" y1="151.3" x2="525.8" y2="119.7"/><line fill="none" stroke="#000000" stroke-width="10.5735" stroke-miterlimit="10" x1="452.3" y1="151.3" x2="434.1" y2="119.7"/></g><circle fill="white" stroke="#000000" stroke-width="3.4671" stroke-miterlimit="10" cx="480" cy="199.1" r="55.2"/><polygon stroke="#000000" fill="white" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol>`,
        width: 2,
        height: 2
    },
    {
        id: "salvoER",
        svg: `<symbol id="svg_salvoER" viewBox="385 85.5 190 190"><g><path fill="none" stroke="#000000" stroke-width="3.5245" stroke-miterlimit="10" d="M480,107.4c-50.6,0-91.6,41-91.6,91.6h36.4 c0-30.5,24.7-55.2,55.2-55.2s55.2,24.7,55.2,55.2h36.4C571.7,148.5,530.7,107.4,480,107.4z"/><line fill="none" stroke="#000000" stroke-width="9.1569" stroke-miterlimit="10" x1="535.3" y1="194.7" x2="571.7" y2="194.7"/><line fill="none" stroke="#000000" stroke-width="9.1569" stroke-miterlimit="10" x1="424.8" y1="194.7" x2="388.3" y2="194.7"/><line fill="none" stroke="#000000" stroke-width="10.5735" stroke-miterlimit="10" x1="507.5" y1="151.3" x2="525.8" y2="119.7"/><line fill="none" stroke="#000000" stroke-width="10.5735" stroke-miterlimit="10" x1="452.3" y1="151.3" x2="434.1" y2="119.7"/></g><circle fill="white" stroke="#000000" stroke-width="3.4671" stroke-miterlimit="10" cx="480" cy="199.1" r="55.2"/><polygon stroke="#000000" fill="black" stroke-width="4.1006" stroke-miterlimit="10" points="480,161.2 501.3,237 480,223.7 458.6,237"/></symbol>`,
        width: 2,
        height: 2
    },
    {
        id: "salvoTwoStage",
        svg: `<symbol id="svg_salvoTwoStage" viewBox="385 85.5 190 190"><defs><symbol id="_internalMultistage" viewBox="405 279 150 150"><polygon fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" points="433.7,375.5 480,285.5 526.3,375.5 495.4,361.7 526.3,420.5 480,390.3 433.7,420.5 464,361.7"/></symbol></defs><g><path fill="none" stroke="#000000" stroke-width="3.5245" stroke-miterlimit="10" d="M480,107.4c-50.6,0-91.6,41-91.6,91.6h36.4 c0-30.5,24.7-55.2,55.2-55.2s55.2,24.7,55.2,55.2h36.4C571.7,148.5,530.7,107.4,480,107.4z"/><line fill="none" stroke="#000000" stroke-width="9.1569" stroke-miterlimit="10" x1="535.3" y1="194.7" x2="571.7" y2="194.7"/><line fill="none" stroke="#000000" stroke-width="9.1569" stroke-miterlimit="10" x1="424.8" y1="194.7" x2="388.3" y2="194.7"/><line fill="none" stroke="#000000" stroke-width="10.5735" stroke-miterlimit="10" x1="507.5" y1="151.3" x2="525.8" y2="119.7"/><line fill="none" stroke="#000000" stroke-width="10.5735" stroke-miterlimit="10" x1="452.3" y1="151.3" x2="434.1" y2="119.7"/></g><circle fill="white" stroke="#000000" stroke-width="3.4671" stroke-miterlimit="10" cx="480" cy="199.1" r="55.2"/><use href="#_internalMultistage" x="435" y="150" width="90" height="90" /></symbol>`,
        width: 2,
        height: 2
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
        id: "smlAP",
        svg: `<symbol id="svg_smlAP" viewBox="-1 -1 602 602"><defs><symbol id="_internalBlackChevron" viewBox="102 88.5 88.5 88.5"><polygon stroke="#000000" stroke-width="4.1006" stroke-miterlimit="10" points="146.2,96.4 167.5,172.2 146.2,158.9 124.9,172.2"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.50000000000006" y1="545.0851892709961" x2="196.95000000000005" y2="478.48783571997285" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.50000000000006 545.0851892709961 A 283 283 0 0 1 441.5 54.914810729003875"/><use href="#_internalBlackChevron" width="350" height="350" x="125" y="115" /></symbol>`,
        width: 2,
        height: 2
    },
    {
        id: "smlF",
        svg: `<symbol id="svg_smlF" viewBox="-1 -1 602 602"><defs><symbol id="_internalBlackChevron" viewBox="102 88.5 88.5 88.5"><polygon stroke="#000000" stroke-width="4.1006" stroke-miterlimit="10" points="146.2,96.4 167.5,172.2 146.2,158.9 124.9,172.2"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="545.0851892709961" x2="403.05" y2="478.4878357199728" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 158.4999999999999 54.914810729003904 A 283 283 0 0 1 441.4999999999999 545.0851892709961"/><use href="#_internalBlackChevron" width="350" height="350" x="125" y="115" /></symbol>`,
        width: 2,
        height: 2
    },
    {
        id: "smlFP",
        svg: `<symbol id="svg_smlFP" viewBox="-1 -1 602 602"><defs><symbol id="_internalBlackChevron" viewBox="102 88.5 88.5 88.5"><polygon stroke="#000000" stroke-width="4.1006" stroke-miterlimit="10" points="146.2,96.4 167.5,172.2 146.2,158.9 124.9,172.2"/></symbol></defs><rect x="0" y="0" width="600" height="600" fill="white" /><circle fill="white" stroke="#000000" stroke-width="20" stroke-miterlimit="10" cx="300" cy="300" r="206.1"/><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="17" y1="300.00000000000006" x2="93.9" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="158.4999999999999" y1="54.914810729003904" x2="196.94999999999993" y2="121.51216428002724" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="441.5" y1="54.914810729003875" x2="403.05" y2="121.5121642800272" stroke-width="20" stroke-miterlimit="10" stroke="black" /><line x1="583" y1="300" x2="506.1" y2="300" stroke-width="20" stroke-miterlimit="10" stroke="black" /><path stroke-width="20" stroke-miterlimit="10" stroke="black" fill="none" d="M 17 300.00000000000006 A 283 283 0 0 1 583 299.99999999999994"/><use href="#_internalBlackChevron" width="350" height="350" x="125" y="115" /></symbol>`,
        width: 2,
        height: 2
    },
    {
        id: "stealthField",
        svg: `<symbol id="svg_stealthField" viewBox="265 56 430 430"><g><path d="M507.6,228.9c-15.3-15.3-40-15.3-55.2,0l-94.7,94.7c-15.3,15.3-15.3,40,0,55.2l94.7,94.7c15.3,15.3,40,15.3,55.2,0 l94.7-94.7c15.3-15.3,15.3-40,0-55.2L507.6,228.9z"/><path fill="none" stroke="#000000" stroke-width="33.4736" stroke-miterlimit="10" d="M386.1,189.2c0,0,31.6-46.5,93.9-46.5 s93.9,46.5,93.9,46.5"/><path fill="none" stroke="#000000" stroke-width="33.4736" stroke-miterlimit="10" d="M349.8,127.8c0,0,43.7-52.7,130.2-52.7 s130.2,52.7,130.2,52.7"/></g></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "stealthHull",
        svg: `<symbol id="svg_stealthHull" viewBox="243 43 474 474"><rect x="313.8" y="113.8" transform="matrix(0.7071 0.7071 -0.7071 0.7071 338.5786 -257.4012)" width="332.3" height="332.3"/></symbol>`,
        height: 1,
        width: 1
    },
    {
        id: "suicide",
        svg: `<symbol id="svg_suicide" viewBox="195 -5 569 569"><polygon fill="white" stroke="#000000" stroke-width="21" stroke-miterlimit="10" points="299.5,515.5 207.5,424.2 207.5,116.8 298.6,44.5 676.9,44.5 751.5,118.8 751.5,422.5 677.8,515.5 "/><path d="M480,112.9c-92.3,0-167.1,74.8-167.1,167.1S387.7,447.1,480,447.1S647.1,372.3,647.1,280S572.3,112.9,480,112.9z M480,152 h78.4l-39.2,64l-39.2,64l-39.2-64l-39.2-64H480z M597.2,344.1L558,408.2l-39.2-64.1L480,280.6L441.2,344l-39.2,64l-39.2-64l-39.2-64 H402h77.6h0.7H558h78.4L597.2,344.1z"/></symbol>`,
        height: 2,
        width: 2
    },
];
