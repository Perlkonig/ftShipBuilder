<script lang="ts">
    import { ship } from "../../stores/writeShip";
    import type {Arcs} from "../../schemas/ship";
    import { getSystem } from "../systems";
    import type { System } from "../systems";

    interface ISystem {
        name: string;
        leftArc: Arcs;
        numArcs: number;
        [k: string]: unknown;
    };

    export let prop: string;
    export let idx: number;
    export let minArcs = 1;
    export let maxArcs = 6;
    export let arcBlacklist: Arcs[] = [];

    let sys: ISystem;
    $: sys = $ship[prop][idx];

    const arcList: [Arcs, string][] = [["F", "Fore"], ["FP", "Fore Port"], ["FS", "Fore Starboard"], ["A", "Aft"], ["AP", "Aft Port"], ["AS", "Aft Starboard"]];
</script>

<div class="field">
    <label class="label" for="type">Choose the "left-hand" starting arc</label>
    <div class="control">
        <div class="select" id="type">
            <select bind:value={sys.leftArc} on:change="{() => $ship = $ship}">
            {#each arcList as pair}
                {#if (! arcBlacklist.includes(pair[0]))}
                    <option value="{pair[0]}">{pair[1]}</option>
                {/if}
            {/each}
            </select>
        </div>
    </div>
</div>

<div class="field">
    <label class="label" for="arcnum">Choose the number of arcs to span</label>
    <div class="control">
        <input id="arcnum" class="input" type="number" min="{minArcs}" max="{maxArcs}" bind:value="{sys.numArcs}" on:change="{() => $ship = $ship}">
    </div>
</div>
