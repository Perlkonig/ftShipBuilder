<script lang="ts">
    import { ship } from "../../stores/writeShip";

    interface ISystem {
        name: string;
        magazine: string;
        [k: string]: unknown;
    };

    export let prop: string;
    export let idx: number;

    let sys: ISystem;
    $: sys = $ship[prop][idx];
</script>

<div class="field">
    <label class="label" for="magid">Magazine ID</label>
    <div class="control">
        <input id="magid" class="input" type="text" placeholder="Magazine ID" bind:value={sys.magazine} on:change="{() => $ship = $ship}">
    </div>
    <p class="help">Launchers not tied to a magazine are useless. Magazines are equipped under General Systems.</p>
</div>
