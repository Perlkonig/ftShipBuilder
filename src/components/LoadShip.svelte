<script lang="ts">
    import { ship } from "../stores/writeShip";
    import { savedShips } from "../stores/writeStoredShips";
    import { savedFleet } from "../stores/writeFleet";
    import { presets } from "../stores/readPresets";
    import type { IPresetFleet } from "../stores/readPresets";
    import LZString from "lz-string";
    import { toast } from '@zerodevx/svelte-toast';
    import { onMount } from "svelte";
    import { compatCheck } from "@/lib/compatCheck";

    export let incomingParam: string|undefined = undefined;

    // I DON'T KNOW WHY I NEED THIS!
    // The assignment that happens in `onMount` is not triggering a refresh of `<Status/>`
    // and I don't know why! This kludge will have to hold me over.
    const wait = () => new Promise(() => setTimeout(() => {$ship = $ship}, 500));

    onMount(() => {
        if (incomingParam !== undefined) {
            try {
                const json = LZString.decompressFromEncodedURIComponent(incomingParam);
                $ship = JSON.parse(json);
                compatCheck($ship);
                toast.push("Ship loaded");
            } catch (e) {
                toast.push("Invalid code provided");
            }
            wait();
        }
    });

    let modalLoadJSON: string;
    let modalDelShip: string;
    let shipJSON: string;
    let fileInput: HTMLInputElement;

    const loadJSON = () => {
        // strip leading whitespace
        const cleaned = shipJSON.trim();
        if (cleaned.startsWith("{")) {
            try {
                $ship = JSON.parse(cleaned);
                modalLoadJSON = undefined;
                compatCheck($ship);
                toast.push("Ship loaded");
                clearLoadJSON();
            } catch (e) {
                toast.push("Invalid JSON provided", {});
            }
        } else {
            try {
                const json = LZString.decompressFromEncodedURIComponent(cleaned);
                $ship = JSON.parse(json);
                modalLoadJSON = undefined;
                compatCheck($ship);
                toast.push("Ship loaded");
                clearLoadJSON();
            } catch (e) {
                toast.push("Invalid code provided");
            }
        }
    }

    const clearLoadJSON = () => {
        modalLoadJSON = "";
        shipJSON = null;
        fileInput.value = null;
    }

    const readConfigJson = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => { shipJSON = reader.result.toString(); }
        reader.onerror = (e) => { toast.push("Error loading provided file. (Not JSON?)", {});  }
    }

    let shipID: string;

    const loadLocal = () => {
        const entry = $savedShips.find(x => x.name === shipID);
        if (entry !== undefined) {
            $ship = JSON.parse(entry.json);
            compatCheck($ship);
        }
    }

    let presetFleetName: string;
    let presetFleet: IPresetFleet;
    $: {
        if ( (presetFleetName !== undefined) && (presetFleetName !== "") ) {
            presetFleet = $presets.find(f => f.name === presetFleetName);
        }
    }
    let presetShipName: string;
    const loadPreset = () => {
        const fleet = $presets.find(f => f.name === presetFleetName);
        if (fleet !== undefined) {
            const entry = fleet.ships.find(x => x.name === presetShipName);
            if (entry !== undefined) {
                $ship = entry;
                compatCheck($ship);
            }
        }
    }

    const loadFaction = () => {
        savedFleet.update(v => ({...v, ships: [...v.ships, ...(JSON.parse(JSON.stringify(presetFleet.ships)))].sort((a,b) => a.mass - b.mass)}));
    }

    const delLocal = () => {
        const idx = $savedShips.findIndex(x => x.name === shipID);
        if (idx !== -1) {
            $savedShips.splice(idx, 1);
            $savedShips = $savedShips;
        }
    }
</script>

<div class="level">
    <div class="level-item">
        <button class="button" on:click="{() => modalLoadJSON = "is-active"}">Load a Ship from JSON or Code</button>
    </div>
    <div class="level-item">
        <div class="field">
            <label class="label" for="saveName">Stored ships</label>
            <div class="control">
                <div class="select">
                    <select id="saveName" bind:value={shipID}>
                    {#each $savedShips.sort((a, b) => a.name.localeCompare(b.name)) as s}
                        <option id="{s.name}" value="{s.name}">{s.name}</option>
                    {/each}
                    </select>
                </div>
                <button class="button is-success" on:click="{loadLocal}">Load</button>
                <button class="button is-danger" on:click="{() => modalDelShip = "is-active"}">DELETE</button>
            </div>
        </div>
    </div>
    <div class="level-item">
        <div class="field">
            <label class="label" for="fleetName">Presets</label>
            <div class="control">
                <div class="select">
                    <select id="fleetName" bind:value={presetFleetName}>
                        <option id="" value=""></option>
                    {#each $presets.sort((a, b) => a.name.localeCompare(b.name)) as fleet}
                        <option id="{fleet.name}" value="{fleet.name}">{fleet.name}</option>
                    {/each}
                    </select>
                </div>
            </div>
        {#if ( (presetFleetName !== undefined) && (presetFleetName !== "") ) }
            <div class="control">
                <div class="select">
                    <select id="shipName" bind:value={presetShipName}>
                    {#each presetFleet.ships.sort((a, b) => a.mass - b.mass) as ship}
                        <option id="{ship.name}" value="{ship.name}">{ship.name} (Mass: {ship.mass}, NPV: {ship.points})</option>
                    {/each}
                    </select>
                </div>
                <button class="button is-success" on:click="{loadPreset}">Load ship</button>
            </div>
            <div class="control">
                <a href="#anchorFleet">
                    <button class="button is-info is-small" on:click="{loadFaction}">Load entire faction into fleet</button>
                </a>
            </div>
        {/if}
        </div>
    </div>
</div>

<div class="modal {modalLoadJSON}" id="loadJSON">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Load Ship from JSON or Code</p>
        </header>
        <section class="modal-card-body">
            <div class="field">
                <div class="control">
                  <textarea class="textarea" id="guessTxt" placeholder="Paste JSON or shareable code here" bind:value="{shipJSON}"></textarea>
                </div>
                <p> Select JSON File </p>
                <div class="control">
                    <input type="file" accept="application/json" class="input" placeholder="Select JSON Ship Config File" bind:this={fileInput} on:change={readConfigJson} on:click={() => { fileInput.value = null; }}/>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" on:click="{loadJSON}">Load Ship</button>
            <button class="button" on:click="{clearLoadJSON}">Cancel</button>
        </footer>
    </div>
</div>

<div class="modal {modalDelShip}" id="delShip">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Delete Ship from Local Storage</p>
        </header>
        <section class="modal-card-body">
            <p>This cannot be undone! Are you sure?</p>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" on:click="{() => {modalDelShip = ""; delLocal();}}">Yes! Delete Ship</button>
            <button class="button" on:click="{() => modalDelShip = ""}">No! Cancel</button>
        </footer>
    </div>
</div>

<style>
    .modal {
        z-index: 200;
    }
</style>
