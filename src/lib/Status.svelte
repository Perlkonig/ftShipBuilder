<script lang="ts">
    import { ship } from "../stores/writeShip";
    import { calcAllMassPts } from "./massPts";
    import type { IMassPts } from "./massPts";
    import MassPts from "./MassPts.svelte";

    let results: IMassPts;
    $: results = calcAllMassPts($ship);
    let delta: number;
    $: if ( ($ship.hasOwnProperty("mass")) && ($ship.mass !== undefined) ) {
        delta = $ship.mass - results.mass;
    }
</script>

{#if ( ($ship.hasOwnProperty("mass")) && ($ship.mass !== undefined) )}
<section class="section">
    <h2 class="subtitle">Status</h2>

    {#if results !== undefined}
        <MassPts
            results={results}
        />
        <div class="container">
        {#if delta > 0}
            <span class="tag is-warning">{delta} mass remaining</span>
        {:else if delta === 0}
            <span class="tag is-success">{delta} mass remaining</span>
        {:else}
            <span class="tag is-danger">Overallocated by {delta} mass!</span>
        {/if}
        </div>
    {/if}
</section>
{/if}
