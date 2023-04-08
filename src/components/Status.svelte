<script lang="ts">
    import { ship } from "../stores/writeShip";
    import { evaluate, EvalErrorCode } from "ftlibship";
    import type { IEvaluation } from "ftlibship";
    import { afterUpdate } from "svelte";

    interface ISystem {
        name: string;
        [k: string]: unknown;
    };

    let results: IEvaluation;
    let delta: number;
    afterUpdate(() => {
        results = evaluate($ship);
        $ship.points = results.points;
        $ship.cpv = results.cpv;
        delta = $ship.mass - results.mass;
    });

    const errorMsgs: Map<EvalErrorCode, string> = new Map([
        [EvalErrorCode.NoMass, "You haven't specified a mass for your ship."],
        [EvalErrorCode.BadMass, "The ship's mass must be between 5 and 300."],
        [EvalErrorCode.OverMass, "You have equipped more systems than your ship's mass can accommodate."],
        [EvalErrorCode.LowHull, "The ship's hull must be at least 10% of total mass."],
        [EvalErrorCode.OverShell, "You have too many rows of shell armour. You cannot have more than 5."],
        [EvalErrorCode.OverArmour, "One of your rows of armour is too long. You can't have more armour than you have hull in your top row."],
        [EvalErrorCode.OverDCP, "You have allocated too many damage control parties."],
        [EvalErrorCode.OverMarine, "You have allocated too many onboard marines."],
        [EvalErrorCode.OverCrew, "You have overallocated your crew. You may need to add some berths."],
        [EvalErrorCode.OverSpinal, "Your spinal-mounted weapons are too heavy. You can only equip 16 mass of spinal weapons for every 50 total ship mass (rounded up)."],
        [EvalErrorCode.OverTurret, "You have too many turrets. You can only have one turret for every 50 total ship mass (rounded up)."],
        [EvalErrorCode.DblUID, "At least one of your systems shares a UUID with another. This should not happen in the normal course of using the builder. Did you modify a JSON file?"],
        [EvalErrorCode.OverPBL, "You have equipped more plasma bolt launchers than your ship's mass can accommodate."],
        [EvalErrorCode.OverSpinal, "You have equipped more spinal mount weapons than your ship's mass can accommodate."],
        [EvalErrorCode.OverTurret, "You have equipped more turrets than your ship's mass can accommodate."],
    ]);
</script>

{#if ( ($ship.hasOwnProperty("mass")) && ($ship.mass !== undefined) )}
<div class="status">
    {#if results !== undefined}
        <div class="container">
            <span class="tag is-success is-light">{results.mass} mass</span>
            <span class="tag is-info is-light">{results.points} NPV</span>
            <span class="tag is-info is-light">{results.cpv} CPV</span>
        </div>

        <div class="container">
        {#if delta > 0}
            <span class="tag is-warning">{delta} mass remaining</span>
        {:else if delta === 0}
            <span class="tag is-success">{delta} mass remaining</span>
        {:else}
            <span class="tag is-danger">Overallocated by {Math.abs(delta)} mass!</span>
        {/if}
        </div>
        <div class="content">
        {#each results.errors as e}
            <p>{errorMsgs.get(e)}</p>
        {/each}
        </div>
    {/if}
</div>
{/if}

<style>
    .status {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
</style>
