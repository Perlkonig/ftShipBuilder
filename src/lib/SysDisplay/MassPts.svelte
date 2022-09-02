<script lang="ts">
    import { ship } from "../../stores/writeShip";
    import { calcSysMassPts } from "../massPts";
    import type { IMassPts } from "../massPts";

    interface ISystem {
        name: string;
        [k: string]: unknown;
    };

    export let prop: string;
    export let idx: number;
    let sys: ISystem;
    $: sys = $ship[prop][idx];
    let massPts: IMassPts;
    $: massPts = calcSysMassPts(sys, $ship.mass);
</script>

<div class="container">
    <span class="tag is-success is-light">{massPts.mass} mass</span>
    <span class="tag is-info is-light">{massPts.points} points</span>
</div>
