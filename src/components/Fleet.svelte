<script lang="ts">
    import { savedFleet } from "@/stores/writeFleet";
    import { ship } from "@/stores/writeShip";
    import { renderSvg } from "ftlibship";
    import { compatCheck } from "@/lib/compatCheck";
    import { toast } from '@zerodevx/svelte-toast';
    import { evaluate, type FullThrustShip } from "ftlibship";

    const hasErrors = (ship: FullThrustShip): boolean => {
        const results = evaluate(ship);
        if (results.errors.length > 0) {
            return true;
        }
        return false;
    }

    let modalLoadJSON: string;
    let fleetJSON: string;
    let fileInput: HTMLInputElement;
    let fleetName = $savedFleet.name;
    let htmlExport = "";
    let sumMass: number;
    let sumNpv: number;
    let sumCpv: number;
    savedFleet.subscribe((fleet) => {
        htmlExport = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Full Thrust Fleet View - ${fleet.name}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  </head>
  <body>
    <main class="container p-6">
      <h1 class="title">${fleet.name}</h1>
`;
        sumMass = 0;
        sumNpv = 0;
        sumCpv = 0;
        for (const ship of fleet.ships) {
            sumMass += ship.mass;
            sumNpv += ship.points;
            sumCpv += ship.cpv;
        }
        htmlExport += `
      <h2 class="subtitle">${sumMass} total mass, ${sumNpv} total NPV, ${sumCpv} total CPV</h2>
      <div class="columns is-multiline" style="align-items: start;">
        `;
        htmlExport += fleet.ships.map(ship => {
            const svg = renderSvg(ship);
                if (svg !== undefined) {
                const match = svg.match(/viewBox="(\-?\d+) (\-?\d+) (\d+) (\d+)"/);
                if (match === null) {
                    return "";
                }
                const width = parseFloat(match[3]);
                return `<div class="column" style="${width !== undefined && !isNaN(width) ? `min-width: ${width/2}px;` : ""}${hasErrors(ship) ? "background-color: red;" : ""}">${svg}</div>`;
            } else {
                return "";
            }
        }).join("");
        htmlExport += `
      </div>
    </main>
  </body>
</html>
`;
    });

    const loadShip = (idx: number) => {
        let newship = $savedFleet.ships[idx];
        if (newship !== undefined) {
            newship = JSON.parse(JSON.stringify(newship));
            compatCheck(newship);
            $ship = newship;
        }
    }

    const dupeShip = (idx: number) => {
        savedFleet.update(val => ({...val, ships: [...val.ships, JSON.parse(JSON.stringify(val.ships[idx]))].sort((a,b) => a.mass - b.mass)}));
    }

    const delShip = (idx: number) => {
        savedFleet.update(val => ({...val, ships: [...val.ships.slice(0, idx), ...val.ships.slice(idx+1)]}))
    }

    const loadJSON = () => {
        // strip leading whitespace
        const cleaned = fleetJSON.trim();
        try {
            $savedFleet = JSON.parse(cleaned);
            modalLoadJSON = undefined;
            toast.push("Fleet loaded");
            clearLoadJSON();
        } catch (e) {
            toast.push("Invalid JSON provided", {});
        }
    }

    const clearLoadJSON = () => {
        modalLoadJSON = undefined;
        fleetJSON = null;
        fileInput.value = null;
    }

    const readConfigJson = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => { fleetJSON = reader.result.toString(); }
        reader.onerror = (e) => { toast.push("Error loading provided file. (Not JSON?)", {});  }
    }

</script>
<a id="anchorFleet" />

<div class="content">
    <h1>Fleet Manager</h1>
    <p>For best results, export to HTML. Titles will format properly, and there won't be any buttons. If any of the ships have a red background, it means that the ship is not valid. Load it for details.</p>
</div>
<div class="level">
    <div class="level-item">
        <div class="field">
            <label class="label" for="fleetName">Name the fleet</label>
            <div class="control">
                <input name="fleetName" class="input" type="text" placeholder="Fleet name" bind:value="{fleetName}" on:change="{(e) => savedFleet.update((v) => ({...v, name: fleetName}))}">
            </div>
        </div>
    </div>
    {#if sumMass !== undefined && sumNpv !== undefined && sumCpv !== undefined}
    <div class="level-item">
        <div class="container">
            <span class="tag is-success is-light">{sumMass} mass</span>
            <span class="tag is-info is-light">{sumNpv} NPV</span>
            <span class="tag is-info is-light">{sumCpv} CPV</span>
        </div>
    </div>
    {/if}
    <div class="level-item">
        <div class="control">
            <button class="button is-small is-danger" on:click="{() => savedFleet.update(() => ({name: fleetName, ships: []}))}">Clear fleet</button>
        </div>
    </div>
    <div class="level-item">
        <div class="control">
            <a href="{"data:text/html;charset=utf-8," + encodeURIComponent(htmlExport)}" download="{`fleet-${new Date().toISOString()}.html`}">
                <button class="button is-small is-info" disabled={$savedFleet.ships.length === 0}>Export to HTML</button>
            </a>
        </div>
    </div>
    <div class="level-item">
        <div class="control">
            <a href="{"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($savedFleet))}" download="{`fleet-${new Date().toISOString()}.json`}">
                <button class="button is-small" disabled={$savedFleet.ships.length === 0}>Export to JSON</button>
            </a>
        </div>
    </div>
    <div class="level-item">
        <div class="control">
            <button class="button is-small" on:click="{() => modalLoadJSON = "is-active"}">Import from JSON</button>
        </div>
    </div>
</div>

<div class="columns is-multiline flexAlignVertical">
    {#each $savedFleet.ships as ship, idx}
        <div class="column is-one-quarter alignVertical" style="{hasErrors(ship) ? "background-color: red;" : ""}">
            {@html renderSvg(ship)}
            <div class="level">
                <div class="level-item">
                    <a href="#anchorBuilder">
                    <button class="button is-small is-info" on:click="{() => loadShip(idx)}">Load</button>
                    </a>
                </div>
                <div class="level-item">
                    <button class="button is-small is-info" on:click="{() => dupeShip(idx)}">Duplicate</button>
                </div>
                <div class="level-item">
                    <button class="button is-small is-danger" on:click="{() => delShip(idx)}">Delete</button>
                </div>
            </div>
        </div>
    {/each}
</div>

<div class="modal {modalLoadJSON}" id="loadJSON">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Load Fleet from JSON</p>
        </header>
        <section class="modal-card-body">
            <div class="field">
                <div class="control">
                  <textarea class="textarea" id="guessTxt" placeholder="Paste JSON here" bind:value="{fleetJSON}"></textarea>
                </div>
                <p> Select JSON File </p>
                <div class="control">
                    <input type="file" accept="application/json" class="input" placeholder="Select JSON Fleet File" bind:this={fileInput} on:change={readConfigJson} on:click={() => { fileInput.value = null; }}/>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" on:click="{loadJSON}">Load Fleet</button>
            <button class="button" on:click="{clearLoadJSON}">Cancel</button>
        </footer>
    </div>
</div>

<style>
    .flexAlignVertical {
        align-items: start;
    }
</style>