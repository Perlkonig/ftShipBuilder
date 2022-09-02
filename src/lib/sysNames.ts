interface ISystem {
    name: string;
    [k: string]: unknown;
};

const dict: Map<string, string> = new Map<string, string>([
    ["adfc", "Area Defense Fire Control"],
    ["fireControl", "Fire Control"],
    ["mineLayer", "Mine Layer"],
    ["mineSweeper", "Mine Sweeper"],
    ["screen", "Screen"],
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
    }
    // The rest just get looked up
    return str2name(sys.name);
};
