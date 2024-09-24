<script lang="ts">
    import { ship } from "../../stores/writeShip";

    interface ISystem {
        name: string;
        [k: string]: unknown;
    }

    export let prop: string;
    export let idx: number;

    let sys: ISystem;
    $: sys = $ship[prop][idx];
</script>

<div class="field">
    <label class="label" for="identifier">Unique identifier</label>
    <div class="control">
        <input
            id="identifier"
            class="input"
            type="text"
            placeholder="Unique identifier"
            bind:value="{sys.id}"
            on:change="{() => ($ship = $ship)}"
        />
    </div>
    <p class="help">
        This ID is used primarly to link launchers to magazines and fighters to
        hangars and will be used in later tools. For now, feel free to accept
        the default or enter your own. It must be unique across your entire
        ship.
    </p>
</div>
