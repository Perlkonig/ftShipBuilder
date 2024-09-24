<script lang="ts">
    import { ship } from "../../stores/writeShip";
    import { afterUpdate } from "svelte";

    interface ISystem {
        name: string;
        magazine: string;
        [k: string]: unknown;
    }

    interface IMag {
        id: string;
        name: string;
        capacity: number;
        [k: string]: unknown;
    }

    export let prop: string;
    export let idx: number;

    let sys: ISystem;
    $: sys = $ship[prop][idx];

    let allMags: IMag[] = [];
    afterUpdate(() => {
        // Get list of available magazines
        allMags = [];
        for (const s of $ship.systems) {
            if (s.name === "magazine") {
                allMags.push(s as IMag);
            }
        }
    });
</script>

<div class="field">
    <label class="label" for="magazine">Select an equipped magazine</label>
    <div class="control">
        <div class="select" id="magazine">
            <select
                bind:value="{sys.magazine}"
                on:change="{() => ($ship = $ship)}"
            >
                {#each allMags as mag}
                    <option value="{mag.id}"
                        >{mag.id}, Capacity: {mag.capacity}</option
                    >
                {/each}
            </select>
        </div>
    </div>
    <p class="help">
        Launchers not tied to a magazine are useless. Magazines are equipped
        under General Systems.
    </p>
</div>
