<script lang="ts">
    import { ship } from "../../stores/writeShip";

    interface ISystem {
        name: string;
        type: string;
        [k: string]: unknown;
    }

    export let prop: string;
    export let idx: number;
    export let choices: string[][];

    let sys: ISystem;
    $: sys = $ship[prop][idx];
</script>

<div class="field">
    <label class="label" for="type">Type</label>
    <div class="control">
        <div class="select">
            <select
                id="type"
                bind:value="{sys.type}"
                on:change="{() => ($ship = $ship)}"
            >
                <option hidden disabled selected value>
                    -- select a type --
                </option>
                {#each choices as c}
                    <option value="{c[0]}">{c[1]}</option>
                {/each}
            </select>
        </div>
    </div>
</div>
