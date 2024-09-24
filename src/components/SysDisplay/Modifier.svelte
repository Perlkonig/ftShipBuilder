<script lang="ts">
    import { ship } from "@/stores/writeShip";

    interface ISystem {
        name: string;
        [k: string]: unknown;
    }

    export let prop: string;
    export let idx: number;
    export let choices: string[][];

    let sys: ISystem;
    $: sys = $ship[prop][idx];

    const reset = () => {
        delete sys.modifier;
        $ship = $ship;
    };

    const set = (mod: string) => {
        sys.modifier = mod;
        $ship = $ship;
    };
</script>

<div class="level">
    <div class="level-left">
        {#if sys.hasOwnProperty("modifier")}
            <div class="level-item">
                <button class="button" on:click="{reset}"
                    >Reset to Standard</button
                >
            </div>
        {:else}
            {#each choices as choice}
                <div class="level-item">
                    <button class="button" on:click="{() => set(choice[0])}"
                        >{choice[1]}</button
                    >
                </div>
            {/each}
        {/if}
    </div>
</div>
