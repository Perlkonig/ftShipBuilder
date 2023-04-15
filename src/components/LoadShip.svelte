<script lang="ts">
    import { ship } from "../stores/writeShip";
    import { savedShips } from "../stores/writeStoredShips";
    import { presets } from "../stores/readPresets";
    import type { IPresetFleet } from "../stores/readPresets";

    let modalLoadJSON: string;
    let modalDelShip: string;
    let shipJSON: string;

    const loadJSON = () => {
        $ship = JSON.parse(shipJSON);
        modalLoadJSON = undefined;
        compatCheck();
    }

    let shipID: string;

    const loadLocal = () => {
        const entry = $savedShips.find(x => x.name === shipID);
        if (entry !== undefined) {
            $ship = JSON.parse(entry.json);
            compatCheck();
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
                compatCheck();
            }
        }
    }

    const delLocal = () => {
        const idx = $savedShips.findIndex(x => x.name === shipID);
        if (idx !== -1) {
            $savedShips.splice(idx, 1);
            $savedShips = $savedShips;
        }
    }

    const compatCheck = () => {
        // Transform old `armour` to new
        if ( ($ship.hasOwnProperty("armour")) && ($ship.armour !== undefined) ) {
            for (let i = 0; i < $ship.armour.length; i++) {
                if (typeof $ship.armour[i] === "number") {
                    $ship.armour[i] = [($ship.armour[i] as unknown) as number, 0];
                }
            }
        }
    }
</script>

<div class="level">
    <div class="level-item">
        <button class="button" on:click="{() => modalLoadJSON = "is-active"}">Load a Ship from JSON</button>
    </div>
    <div class="level-item">
        <div class="field">
            <label class="label" for="saveName">Stored ships</label>
            <div class="control">
                <div class="select">
                    <select id="saveName" bind:value={shipID}>
                    {#each $savedShips as s}
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
                <button class="button is-success" on:click="{loadPreset}">Load</button>
            </div>
        {/if}
        </div>
    </div>
</div>

<div class="modal {modalLoadJSON}" id="loadJSON">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Load Ship from JSON</p>
        </header>
        <section class="modal-card-body">
            <div class="field">
                <div class="control">
                  <textarea class="textarea" id="guessTxt" placeholder="Paste JSON here" bind:value="{shipJSON}"></textarea>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" on:click="{loadJSON}">Load Ship</button>
            <button class="button" on:click="{() => modalLoadJSON = ""}">Cancel</button>
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
