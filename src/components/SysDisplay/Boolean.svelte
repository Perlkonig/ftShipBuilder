<script lang="ts">
    import { afterUpdate } from "svelte";
    import { ship } from "../../stores/writeShip";

    interface ISystem {
        name: string;
        [k: string]: unknown;
    };

    export let prop: string;
    export let idx: number;
    export let flagName: string;
    export let flagText: string;
    export let defaultVal = false;

    let sys: ISystem;
    $: sys = $ship[prop][idx];

    afterUpdate(() => {
        if (! sys.hasOwnProperty(flagName)) {
        sys[flagName] = defaultVal as boolean;
        }
    });
</script>

<div class="control">
    <label class="checkbox">
        <input type="checkbox" bind:checked="{sys[flagName]}" on:change="{() => $ship = $ship}">
        {flagText}
    </label>
</div>
