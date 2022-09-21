<script lang="ts">
    import type { FullThrustShip } from "@/schemas/ship";
    import { savedShips } from "@/stores/writeStoredShips";
    import { afterUpdate } from "svelte";

    export let ship: FullThrustShip;

    let jsonDataStr: string;
    let jsonDataStrNoLayout: string;
    let replacedString: string;
    let saveName: string;
    let duplicated: boolean = true;

    afterUpdate(() => {
        // Remove the embedded SVG glyphs, but keep the x,y coordinates and ids
        replacedString = JSON.stringify(ship, (k, v) => {
            if (k === "glyph") {
                return undefined;
            } else {
                return v;
            }
        });
        jsonDataStr = "data:text/json;charset=utf-8," + encodeURIComponent(replacedString);

        const noLayoutString = JSON.stringify(ship, (k, v) => {
            if (k === "glyph") {
                return undefined;
            } else if (k === "layout") {
                return undefined;
            } else {
                return v;
            }
        });
        jsonDataStrNoLayout = "data:text/json;charset=utf-8," + encodeURIComponent(noLayoutString);

        if ( (saveName === undefined) || (saveName.length === 0) ) {
            saveName = ship.name;
        }
        if ( (saveName !== undefined) && (saveName !== "") ) {
            const idx = $savedShips.findIndex(x => x.name === saveName);
            if (idx !== -1) {
                duplicated = true;
            } else {
                duplicated = false;
            }
        }
    });

    const saveStorage = () => {
        const idx = $savedShips.findIndex(x => x.name === saveName);
        if (idx !== -1) {
            $savedShips.splice(idx, 1);
        }
        $savedShips.push({name: saveName, json: replacedString});
        alert("Ship saved");
        saveName = "";
        $savedShips = $savedShips;
    }
</script>

<div class="level">
    <div class="level-item">
        <a href="{jsonDataStr}" download="SSD.json">
            <button class="button">Download Ship + SSD as JSON</button>
        </a>
    </div>
    <div class="level-item">
        <a href="{jsonDataStrNoLayout}" download="SSD.json">
            <button class="button">Download Just Ship as JSON</button>
        </a>
    </div>
    <div class="level-item">
        <div class="field">
            <label class="label" for="saveName">Save name</label>
            <div class="control">
                <input id="saveName" class="input" type="text" placeholder="Save name" bind:value="{saveName}">
                <button class="button" on:click="{saveStorage}">Save Ship to Local Storage</button>
            </div>
        {#if ( (saveName !== undefined) && (saveName.length > 0) )}
        {#if duplicated}
            <p class="help is-danger">A ship is already saved with that name. Saving will overwrite it.</p>
        {:else}
            <p class="help is-success">That name is unique.</p>
        {/if}
        {/if}
        </div>
    </div>
</div>
