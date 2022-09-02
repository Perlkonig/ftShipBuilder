<script lang="ts">
    import { ship } from "../stores/writeShip";
    import { layoutList } from "./layouts";
    import type { ILayoutDesc } from "./layouts";
    import Skeleton from "./SSD/Skeleton.svelte";
    import SystemArranger from "./SSD/SystemArranger.svelte";

    let selectedID: string;
    let selected: ILayoutDesc;
    $: if (selectedID !== undefined) {
        selected = layoutList.find(x => x.id === selectedID);
    }
</script>

<section class="section">
    <h2 class="subtitle">SSD Builder</h2>

    <div class="field">
        <label class="label" for="layouts">Select a layout</label>
        <div class="control">
            <div class="select">
                <select id="layouts" bind:value={selectedID}>
                    <option hidden disabled selected value> -- select a layout -- </option>
                {#each layoutList as l}
                    <option id="{l.id}" value="{l.id}">{l.name}</option>
                {/each}
                </select>
            </div>
        </div>
    </div>

{#key $ship}
    <h2 class="subtitle">Arrange Systems</h2>
    {#if (selected !== undefined) }
        {#key selectedID}
            <SystemArranger
                layoutID={selectedID}
            />
        {/key}
    {/if}


    <h2 class="subtitle">Assembled SSD</h2>
    {#if (selected !== undefined) }
        {#key selectedID}
        <Skeleton
            layoutID={selectedID}
        />
        {/key}
    {/if}
{/key}

</section>

