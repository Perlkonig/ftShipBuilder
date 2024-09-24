export interface IBox {
    minx: number;
    miny: number;
    width: number;
    height: number;
}

export interface ILayout {
    id: string;
    name: string;
    width: number;
    height: number;
    cellsize: number;
    blockName: IBox | undefined;
    blockStats: IBox | undefined;
    blockHull: IBox | undefined;
    blockDrive: IBox | undefined;
    blockFtl: IBox | undefined;
    blockCore: IBox | undefined;
    blockSystems: IBox | undefined;
}

const layoutCompact: ILayout = {
    id: "32compact",
    name: "3:2 Compact (Hull 5×7)",
    width: 3000,
    height: 2000,
    cellsize: 200,
    blockCore: {
        minx: 1800,
        miny: 1600,
        width: 1200,
        height: 400,
    },
    blockDrive: {
        minx: 600,
        miny: 1600,
        width: 1200,
        height: 400,
    },
    blockFtl: {
        minx: 0,
        miny: 1600,
        width: 600,
        height: 400,
    },
    blockHull: {
        minx: 0,
        miny: 100,
        width: 1000,
        height: 1500,
    },
    blockName: {
        minx: 1000,
        miny: 0,
        width: 2000,
        height: 200,
    },
    blockStats: {
        minx: 0,
        miny: 0,
        width: 1000,
        height: 100,
    },
    blockSystems: {
        minx: 1000,
        miny: 200,
        width: 2000,
        height: 1400,
    },
};

const layoutNarrow: ILayout = {
    id: "12narrow",
    name: "1:2 Narrow (Hull 10×7)",
    width: 1000,
    height: 2000,
    cellsize: 100,
    blockCore: {
        minx: 500,
        miny: 1800,
        width: 500,
        height: 200,
    },
    blockDrive: {
        minx: 200,
        miny: 1800,
        width: 300,
        height: 200,
    },
    blockFtl: {
        minx: 0,
        miny: 1800,
        width: 200,
        height: 200,
    },
    blockHull: {
        minx: 0,
        miny: 1100,
        width: 1000,
        height: 700,
    },
    blockName: {
        minx: 0,
        miny: 0,
        width: 1000,
        height: 150,
    },
    blockStats: {
        minx: 0,
        miny: 150,
        width: 1000,
        height: 50,
    },
    blockSystems: {
        minx: 0,
        miny: 200,
        width: 1000,
        height: 900,
    },
};

const layoutStandard: ILayout = {
    id: "34standard",
    name: "3:4 Standard (Hull 15×8)",
    width: 3000,
    height: 4000,
    cellsize: 200,
    blockCore: {
        minx: 1400,
        miny: 3600,
        width: 1600,
        height: 400,
    },
    blockDrive: {
        minx: 600,
        miny: 3600,
        width: 800,
        height: 400,
    },
    blockFtl: {
        minx: 0,
        miny: 3600,
        width: 600,
        height: 400,
    },
    blockHull: {
        minx: 0,
        miny: 2000,
        width: 3000,
        height: 1600,
    },
    blockName: {
        minx: 0,
        miny: 0,
        width: 3000,
        height: 200,
    },
    blockStats: {
        minx: 0,
        miny: 200,
        width: 3000,
        height: 100,
    },
    blockSystems: {
        minx: 0,
        miny: 300,
        width: 3000,
        height: 1700,
    },
};

const layoutSquare: ILayout = {
    id: "11square",
    name: "1:1 Square (Hull 20×9)",
    width: 2000,
    height: 2000,
    cellsize: 100,
    blockCore: {
        minx: 1000,
        miny: 1800,
        width: 1000,
        height: 200,
    },
    blockDrive: {
        minx: 500,
        miny: 1800,
        width: 500,
        height: 200,
    },
    blockFtl: {
        minx: 0,
        miny: 1800,
        width: 500,
        height: 200,
    },
    blockHull: {
        minx: 0,
        miny: 900,
        width: 2000,
        height: 900,
    },
    blockName: {
        minx: 0,
        miny: 0,
        width: 2000,
        height: 100,
    },
    blockStats: {
        minx: 0,
        miny: 100,
        width: 2000,
        height: 50,
    },
    blockSystems: {
        minx: 0,
        miny: 150,
        width: 2000,
        height: 750,
    },
};

const layoutHuge: ILayout = {
    id: "32standard",
    name: "3:2 Standard (Hull 40×10)",
    width: 3000,
    height: 2000,
    cellsize: 75,
    blockCore: {
        minx: 1500,
        miny: 1825,
        width: 750,
        height: 150,
    },
    blockDrive: {
        minx: 1125,
        miny: 1825,
        width: 375,
        height: 150,
    },
    blockFtl: {
        minx: 750,
        miny: 1825,
        width: 375,
        height: 150,
    },
    blockHull: {
        minx: 0,
        miny: 1050,
        width: 3000,
        height: 750,
    },
    blockName: {
        minx: 0,
        miny: 0,
        width: 3000,
        height: 150,
    },
    blockStats: {
        minx: 0,
        miny: 1950,
        width: 300,
        height: 50,
    },
    blockSystems: {
        minx: 0,
        miny: 150,
        width: 3000,
        height: 900,
    },
};

export const layouts: ILayout[] = [
    layoutCompact,
    layoutNarrow,
    layoutStandard,
    layoutSquare,
    layoutHuge,
];
