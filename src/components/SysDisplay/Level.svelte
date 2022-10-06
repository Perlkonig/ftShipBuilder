<script lang="ts">
    import { ship } from "@/stores/writeShip";

    interface ISystem {
        name: string;
        level: number | undefined;
        [k: string]: unknown;
    };

    export let prop: string;
    export let idx: number;
    export let choices: [number,string][];

    let sys: ISystem;
    $: sys = $ship[prop][idx];

    const reset = () => {
        sys.level = undefined;
        $ship = $ship;
    }

    const set = (lvl: number) => {
        sys.level = lvl
        $ship = $ship;
    }
</script>

<div class="level"><div class="level-left">
{#if ( (sys.hasOwnProperty("level")) && (sys.level !== undefined) )}
    <div class="level-item">
        <button class="button" on:click="{reset}">Reset to Unleveled</button>
    </div>
{:else}
{#each choices as choice}
    <div class="level-item">
        <button class="button" on:click="{() => set(choice[0])}">{choice[1]}</button>
    </div>
{/each}
{/if}
</div></div>
