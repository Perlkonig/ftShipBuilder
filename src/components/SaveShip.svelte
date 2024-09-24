<script lang="ts">
    import type { FullThrustShip } from "ftlibship";
    import { savedShips } from "@/stores/writeStoredShips";
    import { afterUpdate } from "svelte";
    import LZString from "lz-string";
    import { toast } from "@zerodevx/svelte-toast";
    import { savedFleet } from "@/stores/writeFleet";

    export let ship: FullThrustShip;

    let jsonDataStr: string;
    let jsonDataCode: string;
    let jsonDataStrNoLayout: string;
    let jsonDataCodeNoLayout: string;
    let replacedString: string;

    let duplicated: boolean = true;

    //this seems to work, but feels pretty hacky
    //makes it so the save name matches the ship name untill the user clicks into the save name, then it no longer stays in sync
    $: saveNameDirty = false;
    $: saveName = !saveNameDirty ? ship.name : saveName;

    const setSaveNameDirty = () => {
        saveNameDirty = true;
    };

    afterUpdate(() => {
        // Remove the embedded SVG glyphs, but keep the x,y coordinates and ids
        replacedString = JSON.stringify(ship, (k, v) => {
            if (k === "glyph") {
                return undefined;
            } else {
                return v;
            }
        });
        jsonDataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(replacedString);
        jsonDataCode = LZString.compressToEncodedURIComponent(replacedString);

        const noLayoutString = JSON.stringify(ship, (k, v) => {
            if (k === "glyph") {
                return undefined;
            } else if (k === "layout" || k === "x" || k === "y") {
                return undefined;
            } else {
                return v;
            }
        });
        jsonDataStrNoLayout =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(noLayoutString);
        jsonDataCodeNoLayout =
            LZString.compressToEncodedURIComponent(noLayoutString);

        // if ( (saveName === undefined) || (saveName.length === 0) ) {
        //     saveName = ship.name;
        // }
        if (saveName !== undefined && saveName !== "") {
            const idx = $savedShips.findIndex((x) => x.name === saveName);
            if (idx !== -1) {
                duplicated = true;
            } else {
                duplicated = false;
            }
        }
    });

    const saveStorage = () => {
        const idx = $savedShips.findIndex((x) => x.name === saveName);
        if (idx !== -1) {
            $savedShips.splice(idx, 1);
        }
        $savedShips.push({ name: saveName, json: replacedString });
        toast.push("Ship saved");
        saveName = "";
        $savedShips = $savedShips;
    };

    const saveToFleet = () => {
        savedFleet.update((val) => ({
            ...val,
            ships: [...val.ships, JSON.parse(JSON.stringify(ship))].sort(
                (a, b) => a.mass - b.mass
            ),
        }));
    };
</script>

<div class="level">
    <div class="level-item">
        <div>
            <p style="text-align: center">
                <a href="{jsonDataStr}" download="SSD.json">
                    <button class="button">Download Ship + SSD as JSON</button>
                </a>
            </p>
            <p style="text-align: center">
                <a href="?ship={jsonDataCode}" target="_NEW"
                    >Ship + SSD: Shareable link</a
                >
            </p>
        </div>
    </div>
    <div class="level-item">
        <div>
            <p style="text-align: center">
                <a href="{jsonDataStrNoLayout}" download="SSD.json">
                    <button class="button">Download Just Ship as JSON</button>
                </a>
            </p>
            <p style="text-align: center">
                <a href="?ship={jsonDataCodeNoLayout}" target="_NEW"
                    >Ship Only: Shareable link</a
                >
            </p>
        </div>
    </div>
    <div class="level-item">
        <div class="field">
            <label class="label" for="saveName">Save name</label>
            <div class="control">
                <input
                    id="saveName"
                    class="input"
                    type="text"
                    placeholder="Save name"
                    on:focus="{setSaveNameDirty}"
                    bind:value="{saveName}"
                />
                <button class="button" on:click="{saveStorage}"
                    >Save Ship to Local Storage</button
                >
            </div>
            {#if saveName !== undefined && saveName.length > 0}
                {#if duplicated}
                    <p class="help is-danger">
                        A ship is already saved with that name. Saving will
                        overwrite it.
                    </p>
                {:else}
                    <p class="help is-success">That name is unique.</p>
                {/if}
            {/if}
        </div>
    </div>
    <div class="level-item">
        <button class="button" on:click="{saveToFleet}"
            >Add ship to fleet</button
        >
    </div>
</div>
