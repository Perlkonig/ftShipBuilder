<script lang="ts">
    import { afterUpdate, createEventDispatcher } from "svelte";
    import type { ILayout, IBox } from "@/lib/layouts";
    import { savedLayouts } from "@/stores/writeStoredLayouts";

    const dispatch = createEventDispatcher();

    export let newLayout: ILayout = {
        id: "",
        name: "",
        width: 1000,
        height: 1000,
        cellsize: 50,
        blockCore: {minx: 0, miny: 0, width: 0, height: 0},
        blockDrive: {minx: 0, miny: 0, width: 0, height: 0},
        blockFtl: {minx: 0, miny: 0, width: 0, height: 0},
        blockHull: {minx: 0, miny: 0, width: 0, height: 0},
        blockName: {minx: 0, miny: 0, width: 0, height: 0},
        blockStats: {minx: 0, miny: 0, width: 0, height: 0},
        blockSystems: {minx: 0, miny: 0, width: 0, height: 0}
    };

    let xs: number[] = [];
    let ys: number[] = [];
    let rects: IBox[] = [];
    afterUpdate(() => {
        xs = [];
        ys = [];
        let currx = newLayout.cellsize;
        while (currx < newLayout.width) {
            xs.push(currx)
            currx += newLayout.cellsize;
        }
        let curry = newLayout.cellsize;
        while (curry < newLayout.height) {
            ys.push(curry)
            curry += newLayout.cellsize;
        }
        rects = [];
        for (const prop of ["blockCore", "blockDrive", "blockFtl", "blockHull", "blockName", "blockStats", "blockSystems"] as const) {
            if ( (actives[prop]) && (newLayout[prop] !== undefined) && (newLayout[prop].height > 0) && (newLayout[prop].width > 0) ) {
                rects.push(newLayout[prop]);
            }
            // if ( (newLayout[prop].height <= 0) || (newLayout[prop].width <= 0) ) {
            //     actives[prop] = false;
            // } else {
            //     actives[prop] = true;
            // }
        }
    });

    const actives = {
        blockName: true,
        blockStats: true,
        blockSystems: true,
        blockHull: true,
        blockFtl: true,
        blockDrive: true,
        blockCore: true
    }

    let duplicated: boolean = true;
    $: if ( (newLayout.id !== undefined) && (newLayout.id !== "") ) {
        const idx = $savedLayouts.findIndex(x => x.id === newLayout.id);
        if (idx !== -1) {
            duplicated = true;
        } else {
            duplicated = false;
        }
    }

    let jsonDataStr: string;
    $: jsonDataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(newLayout));

    const saveStorage = () => {
        const idx = $savedLayouts.findIndex(x => x.id === newLayout.id);
        if (idx !== -1) {
            $savedLayouts.splice(idx, 1);
        }
        $savedLayouts.push(newLayout);
        $savedLayouts = $savedLayouts;
        dispatch("message", {msg: "close", apply: newLayout.id});
    }

    const cancel = () => {
        dispatch("message", {msg: "close"})
    }
</script>

<div class="columns">
    <div class="column">
        <div class="field">
            <label class="label" for="id">Layout ID</label>
            <div class="control">
                <input class="input" id="id" type="text" placeholder="Layout ID" bind:value="{newLayout.id}">
            </div>
            <p class="help">A short, unique identifier for this layout (users never see this).</p>
            {#if ( (newLayout.id === undefined) || (newLayout.id.length === 0) )}
                <p class="help is-danger">An ID is required!</p>
            {:else if duplicated}
                <p class="help is-danger">That ID already exists. If you save, it will overwrite the existing layout.</p>
            {/if}
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="name">Layout name</label>
            <div class="control">
                <input class="input" id="name" type="text" placeholder="Layout name" bind:value="{newLayout.name}">
            </div>
            <p class="help">A descriptive name for the layout (users see this).</p>
            {#if ( (newLayout.name === undefined) || (newLayout.name.length === 0) )}
                <p class="help is-danger">A name is required!</p>
            {/if}
        </div>
    </div>
</div>
<div class="columns">
    <div class="column">
        <div class="field">
            <label class="label" for="totalWidth">Total width</label>
            <div class="control">
                <input class="input" id="totalWidth" type="number" placeholder="Total width" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.width}">
            </div>
            <p class="help">The total width of the SSD. The absolute units don't matter because we're using vector graphics. Focus on the relative dimensions.</p>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="totalHeight">Total height</label>
            <div class="control">
                <input class="input" id="totalHeight" type="number" placeholder="Total height" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.height}">
            </div>
            <p class="help">The total height of the SSD. The absolute units don't matter because we're using vector graphics. Focus on the relative dimensions.</p>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="cellsize">Cell size</label>
            <div class="control">
                <input class="input" id="cellsize" type="number" placeholder="Cell size" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.cellsize}">
            </div>
            <p class="help">A cell is the smallest element of an SSD (e.g., a hull box). The smaller the cell size relative to the height/width, the more elements will fit on the layout.</p>
        </div>
    </div>
</div>
<div class="columns">
    <div class="column content explainer">
        <p>
            An SSD is composed of multiple blocks, one for each main element:
        </p>
        <dl>
            <dt>Name</dt>
            <dd>A ship's class and given name</dd>
            <dt>Stats</dt>
            <dd>The ship's mass and NPV</dd>
            <dt>Systems</dt>
            <dd>The area dedicated to the weapons and other ship systems</dd>
            <dt>Hull</dt>
            <dd>The ship's hull and armour boxes</dd>
            <dt>Drive</dt>
            <dd>Location of the ship's thrust number</dd>
            <dt>FTL</dt>
            <dd>The location of the ship's FTL drive, if equipped</dd>
            <dt>Core systems</dt>
            <dd>Location of the large core systems icons</dd>
        </dl>
        <p>Any block can be omitted if desired (e.g., you plan on incorporating the generated SSD into some other medium that contains the omitted data).</p>
        <p>Each block comprises four elements:</p>
        <ul>
            <li>The x coordinate of the top-left corner of the block</li>
            <li>The y coordinate of the top-left corner of the block</li>
            <li>The width of the block</li>
            <li>The height of the block</li>
        </ul>
        <p>A wireframe of your layout is rendered at the bottom of the page as you enter numbers.</p>
    </div>
</div>
<div class="columns">
    <div class="column">
        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" bind:checked="{actives.blockName}">
                    Name
                </label>
            </div>
        </div>
    </div>
{#if actives.blockName}
    <div class="column">
        <div class="field">
            <label class="label" for="minx">Top-left x coordinate</label>
            <div class="control">
                <input class="input" id="minx" type="number" placeholder="Top-left x coordinate" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockName.minx}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="minx">Top-left y coordinate</label>
            <div class="control">
                <input class="input" id="miny" type="number" placeholder="Top-left y coordinate" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockName.miny}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="width">Width</label>
            <div class="control">
                <input class="input" id="width" type="number" placeholder="Width" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockName.width}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="height">Height</label>
            <div class="control">
                <input class="input" id="height" type="number" placeholder="Height" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockName.height}">
            </div>
        </div>
    </div>
{/if}
</div>
<div class="columns">
    <div class="column">
        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" bind:checked="{actives.blockStats}">
                    Stats
                </label>
            </div>
        </div>
    </div>
{#if actives.blockStats}
    <div class="column">
        <div class="field">
            <label class="label" for="minx">Top-left x coordinate</label>
            <div class="control">
                <input class="input" id="minx" type="number" placeholder="Top-left x coordinate" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockStats.minx}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="minx">Top-left y coordinate</label>
            <div class="control">
                <input class="input" id="miny" type="number" placeholder="Top-left y coordinate" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockStats.miny}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="width">Width</label>
            <div class="control">
                <input class="input" id="width" type="number" placeholder="Width" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockStats.width}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="height">Height</label>
            <div class="control">
                <input class="input" id="height" type="number" placeholder="Height" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockStats.height}">
            </div>
        </div>
    </div>
{/if}
</div>
<div class="columns">
    <div class="column">
        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" bind:checked="{actives.blockSystems}">
                    Systems
                </label>
            </div>
        </div>
    </div>
{#if actives.blockSystems}
    <div class="column">
        <div class="field">
            <label class="label" for="minx">Top-left x coordinate</label>
            <div class="control">
                <input class="input" id="minx" type="number" placeholder="Top-left x coordinate" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockSystems.minx}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="minx">Top-left y coordinate</label>
            <div class="control">
                <input class="input" id="miny" type="number" placeholder="Top-left y coordinate" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockSystems.miny}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="width">Width</label>
            <div class="control">
                <input class="input" id="width" type="number" placeholder="Width" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockSystems.width}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="height">Height</label>
            <div class="control">
                <input class="input" id="height" type="number" placeholder="Height" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockSystems.height}">
            </div>
        </div>
    </div>
{/if}
</div>

<div class="columns">
    <div class="column">
        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" bind:checked="{actives.blockHull}">
                    Hull
                </label>
            </div>
        </div>
    </div>
{#if actives.blockHull}
    <div class="column">
        <div class="field">
            <label class="label" for="minx">Top-left x coordinate</label>
            <div class="control">
                <input class="input" id="minx" type="number" placeholder="Top-left x coordinate" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockHull.minx}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="minx">Top-left y coordinate</label>
            <div class="control">
                <input class="input" id="miny" type="number" placeholder="Top-left y coordinate" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockHull.miny}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="width">Width</label>
            <div class="control">
                <input class="input" id="width" type="number" placeholder="Width" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockHull.width}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="height">Height</label>
            <div class="control">
                <input class="input" id="height" type="number" placeholder="Height" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockHull.height}">
            </div>
        </div>
    </div>
{/if}
</div>

<div class="columns">
    <div class="column">
        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" bind:checked="{actives.blockFtl}">
                    FTL
                </label>
            </div>
        </div>
    </div>
{#if actives.blockFtl}
    <div class="column">
        <div class="field">
            <label class="label" for="minx">Top-left x coordinate</label>
            <div class="control">
                <input class="input" id="minx" type="number" placeholder="Top-left x coordinate" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockFtl.minx}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="minx">Top-left y coordinate</label>
            <div class="control">
                <input class="input" id="miny" type="number" placeholder="Top-left y coordinate" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockFtl.miny}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="width">Width</label>
            <div class="control">
                <input class="input" id="width" type="number" placeholder="Width" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockFtl.width}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="height">Height</label>
            <div class="control">
                <input class="input" id="height" type="number" placeholder="Height" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockFtl.height}">
            </div>
        </div>
    </div>
{/if}
</div>

<div class="columns">
    <div class="column">
        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" bind:checked="{actives.blockDrive}">
                    Drive
                </label>
            </div>
        </div>
    </div>
{#if actives.blockDrive}
    <div class="column">
        <div class="field">
            <label class="label" for="minx">Top-left x coordinate</label>
            <div class="control">
                <input class="input" id="minx" type="number" placeholder="Top-left x coordinate" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockDrive.minx}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="minx">Top-left y coordinate</label>
            <div class="control">
                <input class="input" id="miny" type="number" placeholder="Top-left y coordinate" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockDrive.miny}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="width">Width</label>
            <div class="control">
                <input class="input" id="width" type="number" placeholder="Width" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockDrive.width}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="height">Height</label>
            <div class="control">
                <input class="input" id="height" type="number" placeholder="Height" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockDrive.height}">
            </div>
        </div>
    </div>
{/if}
</div>

<div class="columns">
    <div class="column">
        <div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" bind:checked="{actives.blockCore}">
                    Core systems
                </label>
            </div>
        </div>
    </div>
{#if actives.blockCore}
    <div class="column">
        <div class="field">
            <label class="label" for="minx">Top-left x coordinate</label>
            <div class="control">
                <input class="input" id="minx" type="number" placeholder="Top-left x coordinate" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockCore.minx}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="minx">Top-left y coordinate</label>
            <div class="control">
                <input class="input" id="miny" type="number" placeholder="Top-left y coordinate" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockCore.miny}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="width">Width</label>
            <div class="control">
                <input class="input" id="width" type="number" placeholder="Width" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockCore.width}">
            </div>
        </div>
    </div>
    <div class="column">
        <div class="field">
            <label class="label" for="height">Height</label>
            <div class="control">
                <input class="input" id="height" type="number" placeholder="Height" min="0" step="{newLayout.cellsize}" bind:value="{newLayout.blockCore.height}">
            </div>
        </div>
    </div>
{/if}
</div>

<div class="ssd">
    <svg viewBox="-1 -1 {newLayout.width + 2} {newLayout.height + 2}" width="100%" height="100%">
        <rect x="0" y="0" width="{newLayout.width}" height="{newLayout.height}" fill="none" stroke="black"/>
        <g id="grid">
    {#each xs as x}
        <line x1="{x}" y1="0" x2="{x}" y2="{newLayout.height}" stroke="#c0c0c0"/>
    {/each}
    {#each ys as y}
        <line x1="0" y1="{y}" x2="{newLayout.width}" y2="{y}" stroke="#c0c0c0"/>
    {/each}
    {#each rects as r}
        <rect x="{r.minx}" y="{r.miny}" width="{r.width}" height="{r.height}" stroke="black" fill="none" />
    {/each}
        </g>
    </svg>
</div>

<div class="level">
    <div class="level-item">
        <a href="{jsonDataStr}" download="layout.json">
            <button class="button">Download Layout JSON</button>
        </a>
    </div>
    <div class="level-item">
        <div class="field">
            <div class="control">
            {#if ( (newLayout.id !== undefined) && (newLayout.id.length > 0) )}
                <button class="button" on:click="{saveStorage}">Save Layout to Local Storage</button>
            {:else}
                <button class="button" disabled>Save Layout to Local Storage</button>
            {/if}
            </div>
        </div>
    </div>
    <div class="level-item">
        <div class="field">
            <div class="control">
                <button class="button" on:click="{cancel}">Cancel Layout Creation</button>
            </div>
        </div>
    </div>
</div>

<style>
    .ssd {
        width: 100%;
        height: 30rem;
        padding-bottom: 2rem;
    }
    .explainer {
        font-size: smaller;
    }
    dt {
        font-weight: bolder;
    }
</style>