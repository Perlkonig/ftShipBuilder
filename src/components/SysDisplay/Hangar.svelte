<script lang="ts">
    import { ship } from "../../stores/writeShip";

    interface ISystem {
        name: string;
        isRack: boolean;
        critRules: boolean
        [k: string]: unknown;
    };

    export let prop: string;
    export let idx: number;

    let sys: ISystem;
    $: sys = $ship[prop][idx];
</script>

<div class="control">
    <label class="checkbox">
        <input type="checkbox" bind:checked="{sys.isRack}" on:change="{() => $ship = $ship}">
        Is this a robot rack?
    </label>
{#if ! sys.isRack}
    <label class="checkbox">
        <input type="checkbox" bind:checked="{sys.critRules}" on:change="{() => $ship = $ship}">
        Playing with hangar bay critical rules (p.83)?
    </label>
{/if}
</div>
