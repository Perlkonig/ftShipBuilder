<script lang="ts">
    import { afterUpdate } from "svelte";
    import { ship } from "../../stores/writeShip";
    import { systems } from "ftlibship";
    import { nanoid } from "nanoid";

    export let prop: string;
    export let idx: number;

    type Arc = "F" | "FS" | "FP" | "A" | "AS" | "AP";

    type Turret = {
        name: "turret";
        leftArc: Arc;
        numArcs: 1 | 2 | 3 | 4 | 5 | 6;
        weapons?: string[];
        size?: number;
        [k: string]: unknown;
    };

    let sys: Turret;
    $: {
        sys = $ship[prop][idx];
        if (! sys.hasOwnProperty("weapons")) {
            sys.weapons = [];
        }
        if (! sys.hasOwnProperty("size")) {
            sys.size = 4;
        }
        // Force leftArcs
        switch (sys.numArcs) {
            case 1:
            case 2:
                sys.leftArc = "F";
                break;
            case 3:
            case 4:
                sys.leftArc = "FP";
                break;
            case 5:
            case 6:
                sys.leftArc = "AP";
                break;
        }
    }

    interface ISystemID {
        id: string;
        name: string;
    }
    let availableWeapons: ISystemID[] = [];
    afterUpdate(() => {
        availableWeapons = [];
        for (const s of $ship.ordnance) {
            if (! s.hasOwnProperty("id")) {
                s.id = nanoid(5);
            }
            const obj: systems.System = systems.getSystem(s, $ship);
            availableWeapons.push({id: s.id as string, name: obj.fullName()});
        }
        for (const s of $ship.weapons) {
            if (! s.hasOwnProperty("id")) {
                s.id = nanoid(5);
            }
            if (! s.name.startsWith("spinal")) {
                const obj: systems.System = systems.getSystem(s, $ship);
                availableWeapons.push({id: s.id as string, name: obj.fullName()});
            }
        }
        $ship = $ship;
    });
</script>

<div class="field">
    <label class="label" for="numArcs">Number of open arcs</label>
    <div class="control">
        <input class="input" type="number" id="numArcs" min="1" max="6" bind:value="{sys.numArcs}" on:change="{() => $ship = $ship}">
    </div>
</div>

<div class="field">
    <label class="label" for="ssdSize">Size on display</label>
    <div class="control">
        <input class="input" type="number" id="ssdSize" min="4" bind:value="{sys.size}" on:change="{() => $ship = $ship}">
    </div>
    <p class="help">You will have to manually arrange your systems within the turret. The turret glyph will always be square.</p>
</div>

<div class="control">
    <p class="label">Select housed weapons</p>
{#each availableWeapons as pair}
    <label class="checkbox">
        <input type="checkbox" bind:group="{sys.weapons}" name="mods" value="{pair.id}" on:change="{() => $ship = $ship}">
        {pair.name}
    </label><br>
{/each}
</div>
