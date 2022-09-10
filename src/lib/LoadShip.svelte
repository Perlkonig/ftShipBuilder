<script lang="ts">
    import { ship } from "../stores/writeShip";
    import { savedShips } from "../stores/writeStoredShips";

    let modalLoadJSON: string;
    let shipJSON: string;

    const loadJSON = () => {
        $ship = JSON.parse(shipJSON);
        modalLoadJSON = undefined;
        alert("Ship loaded");
    }

    let shipID: string;
    let delShip: string;

    const loadLocal = () => {
        const entry = $savedShips.find(x => x.name === shipID);
        if (entry !== undefined) {
            $ship = JSON.parse(entry.json);
            alert("Ship loaded");
        }
    }

    const delLocal = () => {
        const idx = $savedShips.findIndex(x => x.name === delShip);
        if (idx !== -1) {
            $savedShips.splice(idx, 1);
            alert("Ship deleted");
            $savedShips = $savedShips;
        }
    }
</script>

<div class="level">
    <div class="level-item">
        <button class="button" on:click="{() => modalLoadJSON = "is-active"}">Load a Ship from JSON</button>
    </div>
    <div class="level-item">
        <div class="field">
            <label class="label" for="saveName">Load a ship from storage</label>
            <div class="control">
                <div class="select">
                    <select id="saveName" bind:value={shipID}>
                    {#each $savedShips as s}
                        <option id="{s.name}" value="{s.name}">{s.name}</option>
                    {/each}
                    </select>
                </div>
                <button class="button" on:click="{loadLocal}">Load Ship</button>
            </div>
        </div>
    </div>
    <div class="level-item">
        <div class="field">
            <label class="label" for="delName">Delete a ship from storage</label>
            <div class="control">
                <div class="select">
                    <select id="delName" bind:value={delShip}>
                    {#each $savedShips as s}
                        <option id="{s.name}" value="{s.name}">{s.name}</option>
                    {/each}
                    </select>
                </div>
                <button class="button" on:click="{delLocal}">DELETE Ship</button>
            </div>
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

<style></style>
