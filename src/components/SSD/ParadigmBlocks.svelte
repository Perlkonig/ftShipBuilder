<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";
    import { ship } from "@/stores/writeShip";
    import type { ILayout, IBlocks } from "@/stores/writeShip";
    import { savedLayouts } from "@/stores/writeStoredLayouts";
    import { layouts } from "@/lib/layouts";
    import type { ILayout as IBlockLayout } from "@/lib/layouts";
    import Assembled from "./ParadigmBlocks/Assembled.svelte";
    import SystemArranger from "./ParadigmBlocks/SystemArranger.svelte";
    import CustomLayout from "./ParadigmBlocks/CustomLayout.svelte";

    const dispatch = createEventDispatcher();

    let layout: IBlocks;
    onMount(() => {
        if ( ($ship.layout !== undefined) && (typeof $ship.layout !== "string") && ($ship.layout.hasOwnProperty("blocks")) && (($ship.layout as ILayout).blocks !== undefined) ) {
            layout = ($ship.layout as ILayout).blocks;
        } else {
            layout = {
                blocks: undefined,
                elements: {}
            }
            if ( ($ship.layout === undefined) || (typeof $ship.layout === "string") ) {
                $ship.layout = {} as ILayout;
            }
            ($ship.layout as ILayout).blocks = layout;
        }
    });

    let allLayouts: IBlockLayout[];
    $: allLayouts = [...layouts, ...$savedLayouts];

    let selected: IBlockLayout;
    $: if ( (layout !== undefined) && (layout.blocks !== undefined) ) {
        selected = allLayouts.find(x => x.id === layout.blocks.id);
    }

    let modalLoadJSON: string;
    let layoutJSON: string;
    let loadID: string;
    let delID: string;
    let editingLayout: IBlockLayout;

    const loadLocal = () => {
        editingLayout = $savedLayouts.find(x => x.id === loadID);
    }

    const delLocal = () => {
        const idx = $savedLayouts.findIndex(x => x.id === delID);
        if (idx !== -1) {
            $savedLayouts.splice(idx, 1);
        }
        $savedLayouts = $savedLayouts;
    }

    const loadJSON = () => {
        editingLayout = JSON.parse(layoutJSON);
        modalLoadJSON = undefined;
    }

    const handleMessage = (e) => {
        if (e.detail.msg === "close") {
            editingLayout = undefined;
            selectedLayout = undefined;
            if (e.detail.hasOwnProperty("apply")) {
                loadLayout(e.detail.apply);
            } else {
                layout.blocks = undefined;
            }
            layout = layout;
        }
    }

    let selectedLayout: string;
    const loadLayout = (id: string | undefined = undefined) => {
        if (id === undefined) {
            layout.blocks = allLayouts.find(x => x.id === selectedLayout);
        } else {
            layout.blocks = allLayouts.find(x => x.id === id);
        }
        layout = layout;
    }
</script>

<div class="level">
    <div class="level-item">
        <div class="field">
            <label class="label" for="layouts">Apply a layout</label>
            <div class="control">
                <div class="select">
                    <select id="layouts" bind:value={selectedLayout} on:change="{() => loadLayout()}">
                        <option hidden disabled selected value> -- apply a layout -- </option>
                        <option id="_create" value="_create">(Create custom layout)</option>
                    {#each allLayouts as l}
                        <option id="{l.id}" value="{l.id}">{l.name}</option>
                    {/each}
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div class="level-item">
        <button class="button" on:click="{() => modalLoadJSON = "is-active"}">Load a Layout from JSON</button>
    </div>
    <div class="level-item">
        <div class="field">
            <label class="label" for="saveName">Edit a saved layout</label>
            <div class="control">
                <div class="select">
                    <select id="saveName" bind:value={loadID}>
                    {#each $savedLayouts as l}
                        <option id="{l.id}" value="{l.id}">{l.name}</option>
                    {/each}
                    </select>
                </div>
                <button class="button" on:click="{loadLocal}">Edit Layout</button>
            </div>
        </div>
    </div>
    <div class="level-item">
        <div class="field">
            <label class="label" for="delName">Delete a layout from storage</label>
            <div class="control">
                <div class="select">
                    <select id="delName" bind:value={delID}>
                    {#each $savedLayouts as l}
                        <option id="{l.id}" value="{l.id}">{l.name}</option>
                    {/each}
                    </select>
                </div>
                <button class="button" on:click="{delLocal}">DELETE Layout</button>
            </div>
        </div>
    </div>
</div>


<section class="section">
    <h2 class="subtitle">SSD Builder</h2>


{#if selectedLayout === "_create"}
    <CustomLayout on:message="{handleMessage}" />
{:else if editingLayout !== undefined}
    <CustomLayout
        newLayout={editingLayout}
        on:message="{handleMessage}"
    />
{:else}
{#key $ship}
    <h2 class="subtitle">Arrange Systems</h2>
    {#if (selected !== undefined) }
        {#key layout}
            <SystemArranger />
        {/key}
    {/if}

    <h2 class="subtitle">Assembled SSD</h2>
    {#if (selected !== undefined) }
        {#key layout}
        <Assembled
            on:message
        />
        {/key}
    {/if}
{/key}
{/if}
</section>

<div class="modal {modalLoadJSON}" id="loadJSON">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Load Layout from JSON</p>
        </header>
        <section class="modal-card-body">
            <div class="field">
                <div class="control">
                  <textarea class="textarea" id="guessTxt" placeholder="Paste JSON here" bind:value="{layoutJSON}"></textarea>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" on:click="{loadJSON}">Load Layout</button>
            <button class="button" on:click="{() => modalLoadJSON = ""}">Cancel</button>
        </footer>
    </div>
</div>
