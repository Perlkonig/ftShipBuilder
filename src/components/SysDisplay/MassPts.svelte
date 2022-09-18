<script lang="ts">
    import { ship } from "../../stores/writeShip";
    import { getSystem } from "../../lib/systems";
    import type { System } from "../../lib/systems";

    interface ISystem {
        name: string;
        [k: string]: unknown;
    };

    export let prop: string;
    export let idx: number;
    let sys: ISystem;
    $: sys = $ship[prop][idx];
    let obj: System;
    $: obj = getSystem(sys, $ship);
</script>

<div class="container">
    <span class="tag is-success is-light">{obj.mass()} mass</span>
    <span class="tag is-info is-light">{obj.points()} NPV</span>
    <span class="tag is-info is-light">{obj.cpv()} CPV</span>
</div>
