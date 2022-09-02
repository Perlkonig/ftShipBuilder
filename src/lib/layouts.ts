export interface IBox {
    minx: number;
    miny: number;
    width: number;
    height: number;
}

abstract class Layout {
    width: number;
    height: number;
    cellsize: number;

    constructor(w: number) {
        this.width = w;
    }

    abstract blockName(): IBox;
    abstract blockHull(): IBox;
    abstract blockDrive(): IBox;
    abstract blockFtl(): IBox;
    abstract blockCore(): IBox;
    abstract blockSystems(): IBox;

    allBlocks(): IBox[] {
        return [
            this.blockName(),
            this.blockHull(),
            this.blockDrive(),
            this.blockFtl(),
            this.blockCore(),
            this.blockSystems()
        ];
    }
}

class LayoutCompact extends Layout {
    constructor(w: number) {
        super(w);
        this.height = w / 1.5;
        this.cellsize = this.width / 15; //Math.min(this.width / 8, this.height / 4);
    }

    blockName = (): IBox => {
        const minx = this.width / 3;
        const miny = 0;
        const width = this.width - minx;
        const height = this.height * 0.1;
        return {minx, miny, width, height};
    };

    blockHull = (): IBox => {
        const minx = 0;
        const miny = 0;
        const width = this.width / 3;
        const height = (this.height * 2) / 3;
        return {minx, miny, width, height};
    };

    blockDrive = (): IBox => {
        const minx = this.width / 4;
        const miny = (this.height * 2) / 3;
        const width = this.width / 4;
        const height = this.height - miny;
        return {minx, miny, width, height};
    };

    blockFtl = (): IBox => {
        const minx = 0;
        const miny = (this.height * 2) / 3;
        const width = this.width / 4;
        const height = this.height - miny;
        return {minx, miny, width, height};
    };

    blockCore = (): IBox => {
        const minx = this.width / 2;
        const miny = (this.height * 2) / 3;
        const width = this.width / 2;
        const height = this.height - miny;
        return {minx, miny, width, height};
    };

    blockSystems = (): IBox => {
        const nb = this.blockName();
        const db = this.blockDrive();
        const minx = this.width / 3;
        const miny = nb.miny + nb.height;
        const width = this.width - minx; //666
        const height = db.miny - miny; //344.444444...
        return {minx, miny, width, height};
    }
}

class LayoutNarrow extends Layout {
    constructor(w: number) {
        super(w);
        this.height = w * 2;
        this.cellsize = this.width / 11; // Math.min(this.width / 9, this.height / 5);
    }

    blockName = (): IBox => {
        const minx = 0;
        const miny = 0;
        const width = this.width;
        const height = this.height * 0.1;
        return {minx, miny, width, height};
    };

    blockHull = (): IBox => {
        const minx = 0;
        const miny = this.height * 0.4;
        const width = this.width;
        const height = this.height * 0.3;
        return {minx, miny, width, height};
    };

    blockDrive = (): IBox => {
        const minx = this.width / 2;
        const miny = this.height - (this.height * 0.15);
        const width = this.width / 2;
        const height = this.height * 0.15;
        return {minx, miny, width, height};
    };

    blockFtl = (): IBox => {
        const minx = 0;
        const miny = this.height - (this.height * 0.15);
        const width = this.width / 2;
        const height = this.height * 0.15;
        return {minx, miny, width, height};
    };

    blockCore = (): IBox => {
        const minx = 0;
        const miny = this.height - (this.height * 0.3);
        const width = this.width;
        const height = this.height * 0.15;
        return {minx, miny, width, height};
    };

    blockSystems = (): IBox => {
        const nb = this.blockName();
        const minx = 0;
        const miny = nb.miny + nb.height;
        const width = this.width; //1000
        const height = this.height * 0.3; //600
        return {minx, miny, width, height};
    };
}

class LayoutStandard extends Layout {
    constructor(w: number) {
        super(w);
        this.height = (w / 3) * 4;
        this.cellsize = this.width / 14; // Math.min(this.width / 13, this.height / 7);
    }

    blockName = (): IBox => {
        const minx = 0;
        const miny = 0;
        const width = this.width;
        const height = this.height * 0.1;
        return {minx, miny, width, height};
    };

    blockHull = (): IBox => {
        const minx = 0;
        const miny = this.height * 0.5;
        const width = this.width;
        const height = this.height * 0.35;
        return {minx, miny, width, height};
    };

    blockDrive = (): IBox => {
        const minx = this.width / 4;
        const miny = this.height - (this.height * 0.15);
        const width = this.width / 4;
        const height = this.height * 0.15;
        return {minx, miny, width, height};
    };

    blockFtl = (): IBox => {
        const minx = 0;
        const miny = this.height - (this.height * 0.15);
        const width = this.width / 4;
        const height = this.height * 0.15;
        return {minx, miny, width, height};
    };

    blockCore = (): IBox => {
        const minx = this.width / 2;
        const miny = this.height - (this.height * 0.15);
        const width = this.width / 2;
        const height = this.height * 0.15;
        return {minx, miny, width, height};
    };

    blockSystems = (): IBox => {
        const nb = this.blockName();
        const minx = 0;
        const miny = nb.miny + nb.height;
        const width = this.width; //1000
        const height = this.height * 0.4; //533.333...
        return {minx, miny, width, height};
    };
}

class LayoutSquare extends Layout {
    constructor(w: number) {
        super(w);
        this.height = w;
        this.cellsize = this.width / 20; // Math.min(this.width / 18, this.height / 7);
    }

    blockName = (): IBox => {
        const minx = 0;
        const miny = 0;
        const width = this.width;
        const height = this.height * 0.1;
        return {minx, miny, width, height};
    };

    blockHull = (): IBox => {
        const minx = 0;
        const miny = this.height * 0.5;
        const width = this.width;
        const height = this.height * 0.35;
        return {minx, miny, width, height};
    };

    blockDrive = (): IBox => {
        const minx = this.width / 4;
        const miny = this.height - (this.height * 0.15);
        const width = this.width / 4;
        const height = this.height * 0.15;
        return {minx, miny, width, height};
    };

    blockFtl = (): IBox => {
        const minx = 0;
        const miny = this.height - (this.height * 0.15);
        const width = this.width / 4;
        const height = this.height * 0.15;
        return {minx, miny, width, height};
    };

    blockCore = (): IBox => {
        const minx = this.width / 2;
        const miny = this.height - (this.height * 0.15);
        const width = this.width / 2;
        const height = this.height * 0.15;
        return {minx, miny, width, height};
    };

    blockSystems = (): IBox => {
        const nb = this.blockName();
        const minx = 0;
        const miny = nb.miny + nb.height;
        const width = this.width; //1000
        const height = this.height * 0.4; //400
        return {minx, miny, width, height};
    };
}

class LayoutHuge extends Layout {
    constructor(w: number) {
        super(w);
        this.height = (w / 3) * 2;
        this.cellsize = this.width / 35; // Math.min(this.width / 28, this.height / 8);
    }

    blockName = (): IBox => {
        const minx = 0;
        const miny = 0;
        const width = this.width;
        const height = this.height * 0.1;
        return {minx, miny, width, height};
    };

    blockHull = (): IBox => {
        const minx = 0;
        const miny = this.height * 0.5;
        const width = this.width;
        const height = this.height * 0.35;
        return {minx, miny, width, height};
    };

    blockDrive = (): IBox => {
        const minx = (this.width / 2) - (this.width / 8);
        const miny = this.height - (this.height * 0.15);
        const width = this.width / 8;
        const height = this.height * 0.15;
        return {minx, miny, width, height};
    };

    blockFtl = (): IBox => {
        const minx = this.width / 4;
        const miny = this.height - (this.height * 0.15);
        const width = this.width / 8;
        const height = this.height * 0.15;
        return {minx, miny, width, height};
    };

    blockCore = (): IBox => {
        const minx = this.width / 2;
        const miny = this.height - (this.height * 0.15);
        const width = this.width / 4;
        const height = this.height * 0.15;
        return {minx, miny, width, height};
    };

    blockSystems = (): IBox => {
        const nb = this.blockName();
        const minx = 0;
        const miny = nb.miny + nb.height;
        const width = this.width; //1000
        const height = this.height * 0.4; //266.666...
        return {minx, miny, width, height};
    };
}

export interface ILayoutDesc {
    id: string;
    name: string;
    notes: string;
}
export const layoutList: ILayoutDesc[] = [
    {
        id: "32compact",
        name: "Tiny ships (3:2 compact)",
        notes: "Ideal for the smallest ships"
    },
    {
        id: "12narrow",
        name: "Small ships (1:2 narrow)",
        notes: "Ideal for smaller ships"
    },
    {
        id: "34standard",
        name: "Average ships (3:4 standard)",
        notes: "Good mid-range layout"
    },
    {
        id: "11square",
        name: "Larger ships (1:1 square)",
        notes: "Good for larger ships"
    },
    {
        id: "32standard",
        name: "Huge ships (3:2 standard)",
        notes: "Made for the largest ships"
    },
];

export const layoutFactory = (id: string, width: number): Layout | undefined => {
    if (id === "32compact") {
        return new LayoutCompact(width);
    } else if (id === "12narrow") {
        return new LayoutNarrow(width);
    } else if (id === "34standard") {
        return new LayoutStandard(width);
    } else if (id === "11square") {
        return new LayoutSquare(width);
    } else if (id === "32standard") {
        return new LayoutHuge(width);
    }
    return undefined;
};
