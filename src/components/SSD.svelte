<script lang="ts">
    import { ship } from "@/stores/writeShip";
    import ParadigmFreeform from "./SSD/ParadigmFreeform.svelte";
    import ParadigmBlocks from "./SSD/ParadigmBlocks.svelte";
    import ParadigmLinear from "./SSD/ParadigmLinear.svelte";
    import SaveShip from "./SaveShip.svelte";
    let paradigm = "linear";
</script>

<div class="tabs is-medium is-boxed paddingBottom">
    <ul>
        <li
            class="{paradigm === "linear" ? "is-active" : ""}"
            on:click="{() => paradigm = "linear"}"
            title="A simple, no-intervention-needed layout that should be appropriate for most uses"
        >
            <a>
                Linear Layout
            </a>
        </li>
        <li
            class="{paradigm === "blocks" ? "is-active" : ""}"
            on:click="{() => paradigm = "blocks"}"
            title="A middle-ground approach where you arrange the systems and blocks of other elements"
        >
            <a>
                Block-Based Layout
            </a>
        </li>
        <li
            class="{paradigm === "freeform" ? "is-active" : ""}"
            on:click="{() => paradigm = "freeform"}"
            title="A fully freeform approach where you manually arrange everything"
        >
            <a>
                Freeform Layout
            </a>
        </li>
    </ul>
</div>

{#if paradigm === "linear"}
    {#key $ship}
        <ParadigmLinear
            ship={$ship}
        />
    {/key}
{:else if paradigm === "freeform"}
    {#key $ship}
        <ParadigmFreeform />
    {/key}
{:else if paradigm === "blocks"}
    {#key $ship}
        <ParadigmBlocks />
    {/key}
{/if}

<SaveShip ship={$ship} />

<style>
    .paddingBottom {
        padding-bottom: 1rem;
    }
</style>