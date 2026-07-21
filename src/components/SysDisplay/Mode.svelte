<script lang="ts">
    import { ship } from "@/stores/writeShip";

    interface ISystem {
        name: string;
        mode?: string;
        [k: string]: unknown;
    }

    export let prop: string;
    export let idx: number;
    export let choices: string[][];

    let sys: ISystem;
    $: sys = $ship[prop][idx];

    $: modeIsSet =
        sys.mode === "flare" || sys.mode === "torpedo";

    const reset = () => {
        delete sys.mode;
        $ship = $ship;
    };

    const set = (mode: string) => {
        sys.mode = mode;
        $ship = $ship;
    };
</script>

<div class="level">
    <div class="level-left">
        {#if modeIsSet}
            <div class="level-item">
                <button class="button" on:click="{reset}"
                    >Reset to Undefined</button
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
