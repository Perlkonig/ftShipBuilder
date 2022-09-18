<script lang="ts">
    import { ship } from "@/stores/writeShip";
    import ParadigmLayout from "./SSD/ParadigmLayout.svelte";
    import ParadigmLinear from "./SSD/ParadigmLinear.svelte";
    let paradigm = "layout";
</script>

<div class="control paddingBottom">
    <div class="level">
        <div class="level-item">
            <label class="radio">
                <input type="radio" bind:group="{paradigm}" name="paradigm" value="linear">
                Simple, linear layout
              </label>
        </div>
        <div class="level-item">
            <label class="radio">
                <input type="radio" bind:group="{paradigm}" name="paradigm" value="layout">
                Block-based customizable layout
              </label>
        </div>
        <!--
        <div class="level-item">
            <label class="radio">
                <input type="radio" bind:group="{paradigm}" name="paradigm" value="freeform">
                Fully free-form design, with silhouette
            </label>
        </div>
        -->
    </div>
</div>

{#if paradigm === "linear"}
    {#key $ship}
        <ParadigmLinear
            ship={$ship}
        />
    {/key}
{:else if paradigm === "layout"}
    <ParadigmLayout

    />
{:else if paradigm === "freeform"}
    <p>Freeform</p>
{/if}

<style>
    .paddingBottom {
        padding-bottom: 1rem;
    }
</style>