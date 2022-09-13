<script lang="ts">
    import { ship } from "../stores/writeShip";
    import { savedLayouts } from "../stores/writeStoredLayouts";
    import { layouts } from "../lib/layouts";
    import type { ILayout } from "../lib/layouts";
    import Assembled from "./SSD/Assembled.svelte";
    import SystemArranger from "./SSD/SystemArranger.svelte";
    import CustomLayout from "./SSD/CustomLayout.svelte";

    let allLayouts: ILayout[];
    $: allLayouts = [...layouts, ...$savedLayouts];

    let selected: ILayout;
    $: if ($ship.layout !== undefined) {
        selected = allLayouts.find(x => x.id === $ship.layout);
    }

    let modalLoadJSON: string;
    let layoutJSON: string;
    let loadID: string;
    let delID: string;
    let editingLayout: ILayout;

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
            if (e.detail.hasOwnProperty("apply")) {
                $ship.layout = e.detail.apply;
            } else {
                $ship.layout = undefined;
            }
            $ship = $ship;
        }
    }
</script>

<div class="level">
    <div class="level-item">
        <div class="field">
            <label class="label" for="layouts">Apply a layout</label>
            <div class="control">
                <div class="select">
                    <select id="layouts" bind:value={$ship.layout}>
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


{#if $ship.layout === "_create"}
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
        {#key $ship.layout}
            <SystemArranger
                layoutID={$ship.layout}
            />
        {/key}
    {/if}

    <h2 class="subtitle">Assembled SSD</h2>
    {#if (selected !== undefined) }
        {#key $ship.layout}
        <Assembled
            layoutID={$ship.layout}
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

