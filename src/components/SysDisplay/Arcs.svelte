<script lang="ts">
    import { afterUpdate } from "svelte";
    import { ship } from "../../stores/writeShip";
    import { hexes } from "ftlibship";
    import robustPointInPolygon from "robust-point-in-polygon";

    type Arc = "F" | "FS" | "FP" | "A" | "AS" | "AP";

    interface ISystem {
        name: string;
        leftArc: Arc;
        numArcs: number;
        [k: string]: unknown;
    };

    export let prop: string;
    export let idx: number;
    export let minArcs = 1;
    export let maxArcs = 6;
    export let arcBlacklist: Arc[] = [];

    let sys: ISystem;
    $: sys = $ship[prop][idx];

    let selectedArcs: Arc[] = [];
    let contiguous = true;
    // onMount(() => {
    //     const s = $ship[prop][idx];
    //     if (s !== undefined) {
    //         if (! s.hasOwnProperty("leftArc")) {
    //             s.leftArc = "F" as Arcs;
    //         }
    //         if (! s.hasOwnProperty("numArcs")) {
    //             s.numArcs = 1;
    //         }
    //         selectedArcs = arcList(s.leftArc, s.numArcs);
    //     }
    // });
    afterUpdate(() => {
        const s = $ship[prop][idx];
        if (s !== undefined) {
            if (! s.hasOwnProperty("leftArc")) {
                s.leftArc = "F" as Arc;
            }
            if (! s.hasOwnProperty("numArcs")) {
                s.numArcs = 1;
            }
            selectedArcs = hexes.arcList(s.leftArc, s.numArcs);
        }
    });

    interface IPoint {
        x: number;
        y: number;
    }

    const polyPts: [Arc, IPoint[]][] = [
        ["F", [{x: 300, y: 300}, {x: 158.5, y: 54.914810729003904}, {x: 441.5, y:54.914810729003875}]],
        ["FS", [{x: 300, y: 300}, {x: 441.5, y:54.914810729003875}, {x: 583, y:300}]],
        ["AS", [{x: 300, y: 300}, {x: 583, y:300}, {x: 441.5, y:545.0851892709961}]],
        ["A", [{x: 300, y: 300}, {x: 441.5, y:545.0851892709961}, {x: 158.5, y: 545.0851892709961}]],
        ["AP", [{x: 300, y: 300}, {x: 158.5, y: 545.0851892709961}, {x: 17, y: 300}]],
        ["FP", [{x: 300, y: 300}, {x: 17, y: 300}, {x: 158.5, y: 54.914810729003904}]],
    ];
    let polyStrs: [Arc, string][] = [];
    for (const pair of polyPts) {
        const str = pair[1].map(p => `${p.x},${p.y}`).join(" ");
        polyStrs.push([pair[0], str]);
    }

    const neighboursLeft: Map<Arc, Arc> = new Map([
        ["F", "FP"],
        ["FS", "F"],
        ["AS", "FS"],
        ["A", "AS"],
        ["AP", "A"],
        ["FP", "AP"],
    ]);
    const neighboursRight: Map<Arc, Arc> = new Map([
        ["F", "FS"],
        ["FS", "AS"],
        ["AS", "A"],
        ["A", "AP"],
        ["AP", "FP"],
        ["FP", "F"],
    ]);

    let svgDisplay: SVGSVGElement;
    let dragSelected: SVGPolygonElement;
    let targetArc: Arc;
    const startDrag = (e: MouseEvent | TouchEvent) => {
        dragSelected = e.target as SVGPolygonElement;
        targetArc = (e.target as SVGPolygonElement).id as Arc;
    }

    const drag = (e: MouseEvent | TouchEvent) => {
        if (dragSelected !== undefined) {
            e.preventDefault();
            if ("touches" in e) {
                const coord = getMousePosition(e);
                for (const poly of polyPts) {
                    const result = robustPointInPolygon(poly[1].map(pt => [pt.x, pt.y]), [coord.x, coord.y]);
                    if (result < 1) {
                        targetArc = poly[0];
                        break;
                    }
                }
            } else {
                targetArc = (e.target as SVGPolygonElement).id as Arc;
            }
        }
    }

    const getMousePosition = (e: MouseEvent | TouchEvent): IPoint => {
        var CTM = svgDisplay.getScreenCTM();
        let realE: MouseEvent | Touch;
        if ("touches" in e) {
            realE = (e as TouchEvent).touches[0];
        } else {
            realE = e as MouseEvent;
        }
        return {
            x: (realE.clientX - CTM.e) / CTM.a,
            y: (realE.clientY - CTM.f) / CTM.d
        };
    }

    const endDrag = (e: MouseEvent | TouchEvent) => {
        if (dragSelected !== undefined) {
            if (targetArc !== undefined) {
                if ( (targetArc === dragSelected.id) || (! selectedArcs.includes(dragSelected.id as Arc)) ) {
                    handleClick(dragSelected.id as Arc);
                } else {
                    handleClick(dragSelected.id as Arc, targetArc)
                }
            }
            dragSelected = undefined;
        }
        e.preventDefault();
    }

    // This is ugly, brute-force work. No elegance here.
    const handleClick = (arc1: Arc, arc2: Arc | undefined = undefined) => {
        let arc: Arc;
        let delArc: Arc;
        // In a simple click, arc1 will be defined and arc2 will not.
        // In a drag and drop, arc1 needs to be deactivated, and arc2 activated.
        if (arc2 === undefined) {
            arc = arc1;
        } else {
            arc = arc2;
            delArc = arc1;
        }

        // Make a working copy of `selectedArcs`
        const selected = [...selectedArcs];
        // Add or remove the clicked arc as appropriate
        const idx = selected.findIndex(x => x === arc);
        if (idx !== -1) {
            selected.splice(idx, 1);
        } else {
            selected.push(arc);
        }
        // If a `delArc` was passed, delete that arc now (happens when clicking and dragging)
        if ( (delArc !== undefined) && (arc !== delArc) ) {
            const delIdx = selected.findIndex(x => x === delArc);
            if (delIdx !== -1) {
                selected.splice(delIdx, 1);
            }
        }

        // Now validate that the list of selected arcs is valid
        let valid = true;
        contiguous = true;
        let lh: Arc;
        let rh: Arc;
        // If there are six arcs, we're by definition good.
        if (selected.length === 0) {
            valid = false;
        } else if (selected.length < 6) {
            // Find the arc with an empty left-hand neighbour
            for (const a of selected) {
                const lhn = neighboursLeft.get(a)!;
                if (! selected.includes(lhn)) {
                    // Normally we'd break after finding one, but
                    // we're going to do the continuity check here.
                    // If there are two arcs with empty left-hand neighbours,
                    // then we have a problem.
                    if (lh === undefined) {
                        lh = a;
                    } else {
                        valid = false;
                        contiguous = false;
                        // Now we break. We've seen enough.
                        break;
                    }
                }
            }
            if (valid) {
                // Find the arc with an empty right-hand neighbour
                for (const a of selected) {
                    const rhn = neighboursRight.get(a)!;
                    if (! selected.includes(rhn)) {
                        rh = a;
                        break;
                    }
                }
            }
        }

        // If it is, translate it into `leftArc` and `numArcs` and update the object
        if (valid) {
            if (selected.length === 6) {
                sys.leftArc = "F";
                sys.numArcs = 6;
            } else {
                const degLeft = hexes.lefts.get(lh)!;
                let degRight = hexes.rights.get(rh)!;
                if (degRight < degLeft) {
                    degRight += 360;
                }
                const dist = Math.floor((degRight - degLeft) / 60);
                sys.leftArc = lh;
                sys.numArcs = dist;
            }
            selectedArcs = [...selected];
        // Otherwise, update `selectedArcs`, but not the ship itself.
        } else {
            selectedArcs = [...selected];
        }
        $ship = $ship;
        dragSelected = undefined;
    };
</script>

<div class="content">
    <p class="smaller">
        Click to toggle an arc on or off. Active arcs are highlighted in red. Arcs highlighted in black are locked and cannot be selected at all. You can click and drag an active arc to another position.
    </p>
{#if ! contiguous}
    <p class="alert">Selected arcs must be contiguous.</p>
{:else if selectedArcs.length < minArcs}
    <p class="alert">Not enough arcs selected.</p>
{:else if selectedArcs.length > maxArcs}
    <p class="alert">Too many arcs selected.</p>
{/if}
</div>

<div class="arcSelector">
    <svg viewBox="-1 -1 602 602" bind:this="{svgDisplay}" on:mousedown="{startDrag}" on:mouseup="{endDrag}" on:mousemove="{drag}" on:touchstart="{startDrag}" on:touchmove="{drag}" on:touchend="{endDrag}" on:touchcancel="{endDrag}">
    {#each polyStrs as p}
        {#if arcBlacklist.includes(p[0])}
            <polygon id="{p[0]}" points="{p[1]}" stroke="black" fill="black"/>
        {:else if selectedArcs.includes(p[0])}
            <polygon id="{p[0]}" points="{p[1]}" stroke="black" fill="red"/>
        {:else}
            <polygon id="{p[0]}" points="{p[1]}" stroke="black" fill="white"/>
        {/if}
    {/each}
    </svg>
</div>

<style>
    .arcSelector {
        width: 10rem;
    }
    .alert {
        color: red;
    }
    .smaller {
        font-size: smaller;
    }
</style>