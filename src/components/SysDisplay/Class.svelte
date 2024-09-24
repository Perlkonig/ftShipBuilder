<script lang="ts">
    import { ship } from "../../stores/writeShip";

    interface ISystem {
        name: string;
        class: number;
        [k: string]: unknown;
    }

    export let prop: string;
    export let idx: number;
    export let min = 0;
    export let max = 0;

    let sys: ISystem;
    $: sys = $ship[prop][idx];
</script>

<div class="field">
    <label class="label" for="class">Weapon class</label>
    <div class="control">
        {#if max > 0}
            <input
                id="class"
                class="input"
                type="number"
                placeholder="Weapon class"
                min="{min}"
                max="{max}"
                bind:value="{sys.class}"
                on:change="{() => ($ship = $ship)}"
            />
        {:else}
            <input
                id="class"
                class="input"
                type="number"
                placeholder="Weapon class"
                min="{min}"
                bind:value="{sys.class}"
                on:change="{() => ($ship = $ship)}"
            />
        {/if}
    </div>
</div>
