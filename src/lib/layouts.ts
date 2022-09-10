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

abstract class Layout implements ILayout {
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

    constructor(w: number) {
        this.width = w;
    }

    allBlocks(): IBox[] {
        return [
            this.blockName,
            this.blockStats,
            this.blockHull,
            this.blockDrive,
            this.blockFtl,
            this.blockCore,
            this.blockSystems
        ];
    }
}

class LayoutCompact extends Layout {
    constructor(w: number) {
        super(w);
        this.height = w / 1.5;
        this.cellsize = this.width / 15; //Math.min(this.width / 8, this.height / 4);
        this.id = "32compact";
        this.name = "Tiny ships (3:2 compact)";

        let minx: number; let miny: number;
        let width: number; let height: number;

        // Name
        minx = this.width / 3;
        miny = 0;
        width = this.width - minx;
        height = this.height * 0.1;
        this.blockName = {minx, miny, width, height};

        // Stats
        minx = 0;
        miny = 0;
        width = this.width / 3;
        height = this.height * 0.05;
        this.blockStats = {minx, miny, width, height};

        // Hull
        minx = 0;
        miny = 0;
        width = this.width / 3;
        height = (this.height * 2) / 3;
        this.blockHull = {minx, miny, width, height};

        // Drive
        minx = this.width / 4;
        miny = (this.height * 2) / 3;
        width = this.width / 4;
        height = this.height - miny;
        this.blockDrive = {minx, miny, width, height};

        // FTL
        minx = 0;
        miny = (this.height * 2) / 3;
        width = this.width / 4;
        height = this.height - miny;
        this.blockFtl = {minx, miny, width, height};

        // Core
        minx = this.width / 2;
        miny = (this.height * 2) / 3;
        width = this.width / 2;
        height = this.height - miny;
        this.blockCore = {minx, miny, width, height};

        // Systems
        const nb = this.blockName;
        const db = this.blockDrive;
        minx = this.width / 3;
        miny = nb.miny + nb.height;
        width = this.width - minx; //666
        height = db.miny - miny; //344.444444...
        this.blockSystems = {minx, miny, width, height};
    }
}

class LayoutNarrow extends Layout {
    constructor(w: number) {
        super(w);
        this.height = w * 2;
        this.cellsize = this.width / 11; // Math.min(this.width / 9, this.height / 5);
        this.id = "12narrow";
        this.name = "Small ships (1:2 narrow)";

        let minx: number; let miny: number;
        let width: number; let height: number;

        // Name
        minx = 0;
        miny = 0;
        width = this.width;
        height = this.height * 0.075;
        this.blockName = {minx, miny, width, height};

        // Stats
        const bn = this.blockName;
        minx = 0;
        miny = bn.miny + bn.height;
        width = this.width;
        height = this.height * 0.025;
        this.blockStats = {minx, miny, width, height};

        // Hull
        minx = 0;
        miny = this.height * 0.4;
        width = this.width;
        height = this.height * 0.3;
        this.blockHull = {minx, miny, width, height};

        // Drive
        minx = this.width / 2;
        miny = this.height - (this.height * 0.15);
        width = this.width / 2;
        height = this.height * 0.15;
        this.blockDrive = {minx, miny, width, height};

        // FTL
        minx = 0;
        miny = this.height - (this.height * 0.15);
        width = this.width / 2;
        height = this.height * 0.15;
        this.blockFtl = {minx, miny, width, height};

        // Core
        minx = 0;
        miny = this.height - (this.height * 0.3);
        width = this.width;
        height = this.height * 0.15;
        this.blockCore = {minx, miny, width, height};

        // Systems
        minx = 0;
        miny = bn.miny + bn.height;
        width = this.width; //1000
        height = this.height * 0.3; //600
        this.blockSystems = {minx, miny, width, height};
    }
}

class LayoutStandard extends Layout {
    constructor(w: number) {
        super(w);
        this.height = (w / 3) * 4;
        this.cellsize = this.width / 14; // Math.min(this.width / 13, this.height / 7);
        this.id = "34standard";
        this.name = "Average ships (3:4 standard)";

        let minx: number; let miny: number;
        let width: number; let height: number;

        // Name
        minx = 0;
        miny = 0;
        width = this.width;
        height = this.height * 0.075;
        this.blockName = {minx, miny, width, height};

        // Stats
        const bn = this.blockName;
        minx = 0;
        miny = bn.miny + bn.height;
        width = this.width;
        height = this.height * 0.025;
        this.blockStats = {minx, miny, width, height};

        // Hull
        minx = 0;
        miny = this.height * 0.5;
        width = this.width;
        height = this.height * 0.35;
        this.blockHull = {minx, miny, width, height};

        // Drive
        minx = this.width / 4;
        miny = this.height - (this.height * 0.15);
        width = this.width / 4;
        height = this.height * 0.15;
        this.blockDrive = {minx, miny, width, height};

        // FTL
        minx = 0;
        miny = this.height - (this.height * 0.15);
        width = this.width / 4;
        height = this.height * 0.15;
        this.blockFtl = {minx, miny, width, height};

        // Core
        minx = this.width / 2;
        miny = this.height - (this.height * 0.15);
        width = this.width / 2;
        height = this.height * 0.15;
        this.blockCore = {minx, miny, width, height};

        // Systems
        minx = 0;
        miny = bn.miny + bn.height;
        width = this.width; //1000
        height = this.height * 0.4; //533.333...
        this.blockSystems = {minx, miny, width, height};
    }
}

class LayoutSquare extends Layout {
    constructor(w: number) {
        super(w);
        this.height = w;
        this.cellsize = this.width / 20; // Math.min(this.width / 18, this.height / 7);
        this.id = "11square";
        this.name = "Larger ships (1:1 square)";

        let minx: number; let miny: number;
        let width: number; let height: number;

        // Name
        minx = 0;
        miny = 0;
        width = this.width;
        height = this.height * 0.075;
        this.blockName = {minx, miny, width, height};

        // Stats
        const bn = this.blockName;
        minx = 0;
        miny = bn.miny + bn.height;
        width = this.width;
        height = this.height * 0.025;
        this.blockStats = {minx, miny, width, height};

        // Hull
        minx = 0;
        miny = this.height * 0.5;
        width = this.width;
        height = this.height * 0.35;
        this.blockHull = {minx, miny, width, height};

        // Drive
        minx = this.width / 4;
        miny = this.height - (this.height * 0.15);
        width = this.width / 4;
        height = this.height * 0.15;
        this.blockDrive = {minx, miny, width, height};

        // FTL
        minx = 0;
        miny = this.height - (this.height * 0.15);
        width = this.width / 4;
        height = this.height * 0.15;
        this.blockFtl = {minx, miny, width, height};

        // Core
        minx = this.width / 2;
        miny = this.height - (this.height * 0.15);
        width = this.width / 2;
        height = this.height * 0.15;
        this.blockCore = {minx, miny, width, height};

        // Systems
        minx = 0;
        miny = bn.miny + bn.height;
        width = this.width; //1000
        height = this.height * 0.4; //400
        this.blockSystems = {minx, miny, width, height};

    }
}

class LayoutHuge extends Layout {
    constructor(w: number) {
        super(w);
        this.height = (w / 3) * 2;
        this.cellsize = this.width / 35; // Math.min(this.width / 28, this.height / 8);
        this.id = "32standard";
        this.name = "Huge ships (3:2 standard)";

        let minx: number; let miny: number;
        let width: number; let height: number;

        // Name
        minx = 0;
        miny = 0;
        width = this.width;
        height = this.height * 0.075;
        this.blockName = {minx, miny, width, height};

        // Stats
        const bn = this.blockName;
        minx = 0;
        miny = bn.miny + bn.height;
        width = this.width;
        height = this.height * 0.025;
        this.blockStats = {minx, miny, width, height};

        // Hull
        minx = 0;
        miny = this.height * 0.5;
        width = this.width;
        height = this.height * 0.35;
        this.blockHull =  {minx, miny, width, height};

        // Drive
        minx = (this.width / 2) - (this.width / 8);
        miny = this.height - (this.height * 0.15);
        width = this.width / 8;
        height = this.height * 0.15;
        this.blockDrive = {minx, miny, width, height};

        // FTL
        minx = this.width / 4;
        miny = this.height - (this.height * 0.15);
        width = this.width / 8;
        height = this.height * 0.15;
        this.blockFtl = {minx, miny, width, height};

        // Core
        minx = this.width / 2;
        miny = this.height - (this.height * 0.15);
        width = this.width / 4;
        height = this.height * 0.15;
        this.blockCore = {minx, miny, width, height};

        // Systems
        minx = 0;
        miny = bn.miny + bn.height;
        width = this.width; //1000
        height = this.height * 0.4; //266.666...
        this.blockSystems = {minx, miny, width, height};
    }
}

export const layouts: ILayout[] = [
    new LayoutCompact(1000),
    new LayoutNarrow(1000),
    new LayoutStandard(1000),
    new LayoutSquare(1000),
    new LayoutHuge(1000),
];
