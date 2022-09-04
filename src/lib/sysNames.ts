interface ISystem {
    name: string;
    [k: string]: unknown;
};

const dict: Map<string, string> = new Map<string, string>([
    ["adfc", "Area Defense Fire Control"],
    ["amt", "Antimatter Missile"],
    ["bay", "Hold or Berth"],
    ["damageControl", "Extra Damage Control"],
    ["ecm", "ECM Device"],
    ["fireControl", "Fire Control"],
    ["holofield", "Holofield"],
    ["magazine", "Salvo Missile Magazine"],
    ["marines", "Extra Marines"],
    ["mineLayer", "Mine Layer"],
    ["mineSweeper", "Mine Sweeper"],
    ["missile", "Heavy Missile"],
    ["mkp", "Multiple Kinetic Penetrator"],
    ["rocketPod", "Rocket Pod"],
    ["salvo", "Salvo Missile Rack (single-use)"],
    ["salvoLauncher", "Salvo Missile Launcher"],
    ["screen", "Screen"],
    ["stealthField", "Stealth Field Generator"],
    ["suicide", "Antimatter Suicide Charge"],
]);

export const str2name = (sys: string): string => {
    if (dict.has(sys)) {
        return dict.get(sys)!;
    } else {
        return `UNKNOWN (${sys})`;
    }
};

export const obj2name = (sys: ISystem): string => {
    // Manually check for systems with modifiers
    if ( (sys.name === "adfc") || (sys.name === "fireControl") ) {
        if ( (sys.hasOwnProperty("advanced")) && (sys.advanced) ) {
            return "Advanced " + str2name(sys.name);
        }
    } else if (sys.name === "screen") {
        let advanced = false;
        let area = false;
        if (sys.hasOwnProperty("advanced")) {
            advanced = sys.advanced as boolean;
        }
        if (sys.hasOwnProperty("area")) {
            area = sys.area as boolean;
        }
        return (advanced ? "Advanced " : "") + (area ? "Area " : "") + str2name(sys.name);
    } else if (sys.name === "bay") {
        if (sys.hasOwnProperty("type")) {
            if (sys.type === "passenger") {
                return "Passenger Berth";
            } else if (sys.type === "troop") {
                return "Troop Berth";
            } else if (sys.type === "cargo") {
                return "Cargo Hold";
            }
        }
    } else if ( (sys.name === "salvo") || (sys.name === "magazine") || (sys.name === "missile") ) {
        if (sys.hasOwnProperty("modifier")) {
            if (sys.modifier === "er") {
                return str2name(sys.name) + ' - Long Range';
            } else if (sys.modifier === "twostage") {
                return str2name(sys.name) + ' - Multistage';
            }
        }
    } else if (sys.name === "ecm") {
        if ( (sys.hasOwnProperty("area")) && (sys.area) ) {
            return "Area " + str2name(sys.name);
        }
    }
    // The rest just get looked up
    return str2name(sys.name);
};
