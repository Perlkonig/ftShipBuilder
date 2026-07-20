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
    export let magazineType: "magazine" | "boardingTorpedoMagazine" =
        "magazine";

    let sys: ISystem;
    $: sys = $ship[prop][idx];

    const labels: Record<typeof magazineType, string> = {
        magazine: "salvo missile magazine",
        boardingTorpedoMagazine: "boarding torpedo magazine",
    };

    let allMags: IMag[] = [];
    afterUpdate(() => {
        allMags = [];
        for (const s of $ship.systems) {
            if (s.name === magazineType) {
                allMags.push(s as IMag);
            }
        }
    });
</script>

<div class="field">
    <label class="label" for="magazine"
        >Select an equipped {labels[magazineType]}</label
    >
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
