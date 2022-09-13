<script lang="ts">
    import { ship } from "../../stores/writeShip";

    interface ISystem {
        name: string;
        heavy: boolean;
        highIntensity: boolean
        [k: string]: unknown;
    };

    export let prop: string;
    export let idx: number;

    let sys: ISystem;
    $: sys = $ship[prop][idx];
</script>

<div class="control">
    <label class="checkbox">
        <input type="checkbox" bind:checked="{sys.heavy}" on:change="{() => $ship = $ship}">
        Heavy
    </label>
{#if sys.heavy}
    <label class="checkbox">
        <input type="checkbox" bind:checked="{sys.highIntensity}" on:change="{() => $ship = $ship}">
        High Intensity
    </label>
{/if}
</div>
