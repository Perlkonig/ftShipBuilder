<script lang="ts">
    import { ship, starterShip } from "../stores/writeShip";
    import { evaluate } from "ftlibship";
    import type { IEvaluation } from "ftlibship";
    import { afterUpdate } from "svelte";
    import { formatEvalError } from "@/lib/statusErrors";

    interface ISystem {
        name: string;
        [k: string]: unknown;
    }

    let results: IEvaluation = evaluate(starterShip);
    let delta: number | undefined;
    afterUpdate(() => {
        results = evaluate($ship);
        $ship.points = results.points;
        $ship.cpv = results.cpv;
        delta =
            $ship.mass !== undefined ? $ship.mass - results.mass : undefined;
    });

    let modalClearShip: string;
    const clearShip = () => {
        if (window.location.href.includes("?")) {
            const idx = window.location.href.indexOf("?");
            if (idx !== -1) {
                window.location.href = window.location.href.substring(0, idx);
            }
        } else {
            window.location.reload();
        }
    };
</script>

<div class="status">
    {#if results !== undefined}
        <div class="level">
            <div class="level-left">
                {#if $ship.mass !== undefined}
                    <div class="level-item">
                        <div>
                            <div class="container">
                                <span class="tag is-success is-light"
                                    >{results.mass} mass</span
                                >
                                <span class="tag is-info is-light"
                                    >{results.points} NPV</span
                                >
                                <span class="tag is-info is-light"
                                    >{results.cpv} CPV</span
                                >
                            </div>

                            <div class="container">
                                {#if delta > 0}
                                    <span class="tag is-warning"
                                        >{delta} mass remaining</span
                                    >
                                {:else if delta === 0}
                                    <span class="tag is-success"
                                        >{delta} mass remaining</span
                                    >
                                {:else}
                                    <span class="tag is-danger"
                                        >Overallocated by {Math.abs(delta)} mass!</span
                                    >
                                {/if}
                            </div>
                        </div>
                    </div>
                {/if}
                <div class="level-item">
                    <button
                        class="button is-small is-light is-danger is-rounded"
                        on:click="{() => (modalClearShip = 'is-active')}"
                        >Clear Ship</button
                    >
                </div>
                <div class="level-item">
                    <a href="#anchorSSD" style="font-size: smaller"
                        >Jump to SSD</a
                    >
                </div>
                <div class="level-item">
                    <a href="#anchorFleet" style="font-size: smaller"
                        >Jump to Fleet</a
                    >
                </div>
                <div class="level-item">
                    <a href="#anchorBuilder" style="font-size: smaller"
                        >Jump to Top</a
                    >
                </div>
            </div>
        </div>
        <div class="content">
            {#each results.errors as e}
                <p>{formatEvalError(e)}</p>
            {/each}
        </div>
    {/if}
</div>

<div class="modal {modalClearShip}" id="delShip">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Clear Current Ship</p>
        </header>
        <section class="modal-card-body">
            <p>This cannot be undone! Are you sure?</p>
        </section>
        <footer class="modal-card-foot">
            <button
                class="button is-success"
                on:click="{() => {
                    modalClearShip = '';
                    clearShip();
                }}">Yes! Clear Ship</button
            >
            <button
                class="button"
                on:click="{() => (modalClearShip = undefined)}"
                >No! Cancel</button
            >
        </footer>
    </div>
</div>

<style>
    .status {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
</style>
