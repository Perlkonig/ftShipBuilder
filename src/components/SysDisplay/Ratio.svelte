<script lang="ts">
    import { ship } from "../../stores/writeShip";

    interface ISystem {
        name: string;
        ratio: number|undefined;
        type: string;
        [k: string]: unknown;
    };

    export let prop: string;
    export let idx: number;

    let sys: ISystem;
    let placeholder = 1;
    $: {
        sys = $ship[prop][idx];
        if (sys.ratio === null) {
            sys.ratio = undefined;
        }
        if (sys.ratio === undefined) {
            if (sys.type === "boat") {
                placeholder = 1.5;
            } else if (sys.type === "passenger") {
                placeholder = 1/4;
            } else if (sys.type === "troop") {
                placeholder = 1/3;
            } else {
                placeholder = 1;
            }
        }
    }
</script>

<div class="field">
    <label class="label" for="capacity">Capacity-to-Mass Ratio</label>
    <div class="control">
        <input id="capacity" class="input" type="number" placeholder="{placeholder.toString()}" bind:value={sys.ratio} on:change="{() => $ship = $ship}">
    </div>
{#if sys.name === "bay"}
    <p class="help"><em>For most ships, you do not need to enter anything in this field!</em> Only enter a number here if you wish to use a different capacity-to-mass ratio than is defined in the rules.</p>
{/if}
</div>
