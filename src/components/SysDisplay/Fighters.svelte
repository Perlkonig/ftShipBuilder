<script lang="ts">
    import { afterUpdate } from "svelte";
    import { ship } from "../../stores/writeShip";
    import { type2name, mod2name } from "../../lib/systems/fighters";

    type Fighter = {
        type: "standard" | "interceptor" | "attack" | "torpedo" | "graser" | "plasma" | "MKP" | "missile" | "light";
        mods?: ("heavy" | "fast" | "longRange" | "ftl" | "robot")[];
        hangar?: string;
    }

    type Hangar = {
        name: "hangar";
        isRack?: boolean;
        id: string;
        [k: string]: unknown;
    }

    export let prop: string;
    export let idx: number;

    let fighter: Fighter;
    $: {
        fighter = $ship[prop][idx];
        if (! fighter.hasOwnProperty("mods")) {
            fighter.mods = [];
        }
    }

    let allHangars: Hangar[] = [];
    let assignedHangarIds: string[] = [];
    afterUpdate(() => {
        // Get list of available hangars
        assignedHangarIds = $ship.fighters.map(x => x.hangar);
        allHangars = [];
        for (const s of $ship.systems) {
            if (s.name === "hangar") {
                allHangars.push(s)
            }
        }

        //Force the fighter to have `robot` mod if equipped to a rack
        if (fighter.hangar !== undefined) {
            const h = $ship.systems.find(x => (x.name === "hangar") && (x.id === fighter.hangar));
            if ( (h !== undefined) && (h.isRack) && (! fighter.mods.includes("robot")) ) {
                fighter.mods.push("robot");
            }
        }
        $ship = $ship;
    });

    let fighterTypes = [...type2name.entries()].sort((a, b) => {return a[1].localeCompare(b[1]);});
    let fighterMods = [...mod2name.entries()].sort((a, b) => {return a[1].localeCompare(b[1]);});
</script>

<div class="field">
    <label class="label" for="type">Select fighter type</label>
    <div class="control">
        <div class="select" id="type">
            <select bind:value={fighter.type} on:change="{() => $ship = $ship}">
            {#each fighterTypes as pair}
                <option value="{pair[0]}">{pair[1]}</option>
            {/each}
            </select>
        </div>
    </div>
</div>

<div class="control">
    <p class="label">Select zero or more mods:</p>
{#each fighterMods as pair}
    <label class="checkbox">
        <input type="checkbox" bind:group="{fighter.mods}" name="mods" value="{pair[0]}" on:change="{() => $ship = $ship}">
        {pair[1]}
    </label><br>
{/each}
</div>

<div class="field">
    <label class="label" for="hangar">Select an empty hangar</label>
    <div class="control">
        <div class="select" id="hangar">
            <select bind:value={fighter.hangar} on:change="{() => $ship = $ship}">
            {#each allHangars as h}
                <option value="{h.id}">{assignedHangarIds.includes(h.id) ? "(ASSIGNED) " : ""}{h.id}{h.isRack ? " (robot rack)" : ""}</option>
            {/each}
            </select>
        </div>
    </div>
</div>
