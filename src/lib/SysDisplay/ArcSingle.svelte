<script lang="ts">
    import { ship } from "@/stores/writeShip";
    import type {Arcs} from "@/schemas/ship";

    interface ISystem {
        name: string;
        type: string;
        [k: string]: unknown;
    };

    export let prop: string;
    export let idx: number;

    let sys: ISystem;
    $: sys = $ship[prop][idx];

</script>

<div class="field">
    <label class="label" for="type">Choose a single arc</label>
    <div class="control">
        <div class="select" id="type">
            <select bind:value={sys.arc} on:change="{() => $ship = $ship}">
                <option value="F">Forward</option>
                <option value="FP">Forward Port</option>
                <option value="FS">Forward Starboard</option>
                <option value="AP">Aft Port</option>
                <option value="AS">Aft Starboard</option>
            </select>
        </div>
    </div>
</div>
