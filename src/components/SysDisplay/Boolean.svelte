<script lang="ts">
    import { afterUpdate } from "svelte";
    import { ship } from "../../stores/writeShip";

    interface ISystem {
        name: string;
        [k: string]: unknown;
    }

    export let prop: string;
    export let idx: number;
    export let flagName: string;
    export let flagText: string;
    export let defaultVal = false;

    let sys: ISystem;
    let checked = false;

    $: sys = $ship[prop][idx];
    $: {
        if (sys && !sys.hasOwnProperty(flagName)) {
            sys[flagName] = defaultVal;
        }
        checked = Boolean(sys?.[flagName]);
    }

    const onCheckChange = () => {
        sys[flagName] = checked;
        $ship = $ship;
    };

    afterUpdate(() => {
        if (!sys.hasOwnProperty(flagName)) {
            sys[flagName] = defaultVal;
        }
    });
</script>

<div class="control">
    <label class="checkbox">
        <input
            type="checkbox"
            bind:checked="{checked}"
            on:change="{onCheckChange}"
        />
        {flagText}
    </label>
</div>
