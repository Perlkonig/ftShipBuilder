<script lang="ts">
    import pako from "pako";
    import { Buffer } from "buffer";
    import { ship } from "../stores/writeShip";
    import { str2name } from "./sysNames";
    import Display from "./SysDisplay.svelte";
    import MassPts from "./MassPts.svelte";
    import { calcArmourMassPts, calcHullMassPts, calcSysMassPts } from "./massPts";

    const addArmour = () => {
        $ship.armour.push(1);
        $ship = $ship;
    };

    const delArmour = () => {
        $ship.armour.splice($ship.armour.length - 1);
        $ship = $ship;
    };

    let thrust = 0;
    let driveAdvanced = false;
    $: {
        const drive = $ship.systems.find(x => x.name === "drive");
        if (drive !== undefined) {
            drive.thrust = thrust;
            drive.advanced = driveAdvanced;
        }
        $ship = $ship;
    }
    let ftl = true;
    let ftlAdvanced = false;
    $: {
        const idx = $ship.systems.findIndex(x => x.name === "ftl");
        if (idx === -1) {
            if (ftl) {
                $ship.systems.push({
                name: "ftl",
                advanced: ftlAdvanced
                });
            }
        } else {
            if (ftl) {
                $ship.systems[idx].advanced = ftlAdvanced;
            } else {
                $ship.systems.splice(idx, 1);
            }
        }
        $ship = $ship;
    }

    let shipSystem: string;
    const addSystem = () => {
        if (shipSystem !== undefined) {
            if (shipSystem === "suicide") {
                $ship.systems.push({name: "suicide"});
            } else if (shipSystem === "adfc") {
                $ship.systems.push({name: "adfc"});
            } else if (shipSystem === "fireControl") {
                $ship.systems.push({name: "fireControl"});
            } else if (shipSystem === "mineLayer") {
                $ship.systems.push({name: "mineLayer", capacity: 2});
            } else if (shipSystem === "mineSweeper") {
                $ship.systems.push({name: "mineSweeper"});
            } else if (shipSystem === "screen") {
                $ship.systems.push({name: "screen"});
            }
            $ship = $ship;
        }
    };
    let shipWeapon: string;
    const addWeapon = () => {
        if (shipWeapon !== undefined) {
            if (shipWeapon === "mineLayer") {
                $ship.systems.push({name: "mineLayer", capacity: 2});
            }
            $ship = $ship;
        }
    };

    const setClass = () => {
        const m = $ship.mass;
        if (m <= 10) {
            $ship.class = "Scout";
        } else if (m <= 16) {
            $ship.class = "Corvette";
        } else if (m <= 28) {
            $ship.class = "Frigate";
        } else if (m <= 36) {
            $ship.class = "Destroyer";
        } else if (m <= 44) {
            $ship.class = "Heavy Destroyer";
        } else if (m <= 60) {
            $ship.class = "Light Cruiser";
        } else if (m <= 70) {
            $ship.class = "Patrol Cruiser";
        } else if (m <= 90) {
            $ship.class = "Heavy Cruiser";
        } else if (m <= 110) {
            $ship.class = "Battlecruiser";
        } else if (m <= 140) {
            $ship.class = "Battleship";
        } else if (m <= 160) {
            $ship.class = "Heavy Battleship";
        } else if (m <= 180) {
            $ship.class = "Dreadnought";
        } else {
            $ship.class = "Superdreadnought"
        }
    };

    let jsonDataStr: string;
    let encodedShip: string;
    $: {
        jsonDataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify($ship));
        const compressed = pako.deflate(JSON.stringify($ship));
        encodedShip = Buffer.from(compressed).toString("base64");
    }
</script>

<section class="section">
    <h2 class="subtitle">Structure</h2>

    <div class="field">
        <label class="label" for="mass">Mass</label>
        <div class="control">
            <input id="mass" class="input" type="number" placeholder="Mass" min="4" max="300" step="2" bind:value={$ship.mass} on:change="{setClass}">
        </div>
    {#if ($ship.mass < 4)}
        <p class="help is-danger">The minimum mass is 4.</p>
    {:else if ($ship.mass > 300)}
        <p class="help is-danger">The maximum mass is 300.</p>
    {:else if ( ($ship.mass > 10) && ($ship.mass % 2 !== 0) )}
        <p class="help is-danger">The mass of ships larger than 9 must be an even number.</p>
    {/if}
    </div>

    {#if ( ($ship.hasOwnProperty("mass")) && ($ship.mass >= 4) )}
    <div class="field">
        <label class="label" for="class">Ship class</label>
        <div class="control">
            <input id="class" class="input" type="text" placeholder="Ship class" bind:value="{$ship.class}">
        </div>
        <p class="help">Is overwritten by the system if the mass changes.</p>
    </div>

    <div class="field">
        <label class="label" for="shipName">Ship name</label>
        <div class="control">
            <input id="shipName" class="input" type="text" placeholder="Ship name" bind:value="{$ship.name}">
        </div>
        <p class="help">Appears on the SSD in quotes.</p>
    </div>

    <div class="field">
        <label class="label" for="hull">Hull strength</label>
        <div class="control">
        <input id="hull" class="input" type="number" placeholder="Hull strength" bind:value={$ship.hull.points}>
        </div>
        {#if $ship.hull.points < ($ship.mass * 0.1)}
            <p class="help is-danger">Hull strength must be at least 10% of total mass.</p>
        {:else if $ship.hull.points > $ship.mass}
            <p class="help is-danger">Hull strength may not exceed the total mass.</p>
        {:else if $ship.hull.points < ($ship.mass * 0.2)}
            <p class="help is-danger">Hull rating: FRAGILE</p>
        {:else if $ship.hull.points < ($ship.mass * 0.3)}
            <p class="help is-warning">Hull rating: WEAK</p>
        {:else if $ship.hull.points < ($ship.mass * 0.4)}
            <p class="help is-success">Hull rating: AVERAGE</p>
        {:else if $ship.hull.points < ($ship.mass * 0.5)}
            <p class="help is-success">Hull rating: STRONG</p>
        {:else if $ship.hull.points >= ($ship.mass * 0.5)}
            <p class="help is-warning">Hull rating: SUPER</p>
        {/if}
    </div>

    <div class="field">
        <label class="label" for="rows">Hull rows</label>
        <div class="control">
        <input id="rows" class="input" type="number" placeholder="Hull rows" min="3" max="6" bind:value={$ship.hull.rows}>
        </div>
        <p class="help">4 is the default. 3 means advanced tech. 5 and 6 increases your odds of critical damage, but reduces the point cost.</p>
    </div>
    <MassPts
        results={calcHullMassPts($ship.hull)}
    />

    <div class="field is-grouped">
        <div class="control">
        {#if $ship.armour.length < 5}
            <button class="button is-primary" on:click="{addArmour}">
                Add armour row
            </button>
        {:else}
            <button class="button is-primary" disabled>
                Add armour row
            </button>
        {/if}
        </div>
        <div class="control">
            <button class="button is-danger" on:click="{delArmour}">
                Remove armour row
            </button>
        </div>
    </div>

    {#each $ship.armour as row, i }
    <div class="field">
        <label class="label" for="armour{i}">Armour: Row {i + 1}</label>
        <div class="control">
        <input id="armour{i}" class="input" type="number" placeholder="Armour points" min="1" max="{Math.ceil($ship.hull.points / $ship.hull.rows)}" bind:value={$ship.armour[i]}>
        </div>
    {#if $ship.armour[i] > Math.ceil($ship.hull.points / $ship.hull.rows)}
        <p class="help is-danger">You can only have as much armour per row as hull boxes on your first row ({Math.ceil($ship.hull.points / $ship.hull.rows)}).</p>
    {/if}
    </div>
{/each}
    <MassPts
        results={calcArmourMassPts($ship.armour)}
    />
{/if}
</section>

{#if ( ($ship.hasOwnProperty("mass")) && ($ship.mass >= 4) )}
<section class="section">
    <h2 class="subtitle">Drive Systems</h2>

    <div class="field">
        <label class="label" for="thrust">Thrust</label>
        <div class="control">
            <input id="thrust" class="input" type="number" placeholder="Thrust" min="0" bind:value={thrust}>
        </div>
        <div class="control">
            <label class="checkbox">
                <input type="checkbox" bind:checked="{driveAdvanced}">
                Advanced drive
            </label>
        </div>
        <MassPts
            results={calcSysMassPts($ship.systems.find(x => x.name === "drive"), $ship.mass)}
        />
        <div class="control">
            <label class="checkbox">
                <input type="checkbox" bind:checked="{ftl}">
                FTL enabled
            </label>
        {#if ftl}
            <label class="checkbox">
                <input type="checkbox" bind:checked="{ftlAdvanced}">
                Advanced FTL
            </label>
            <MassPts
                results={calcSysMassPts($ship.systems.find(x => x.name === "ftl"), $ship.mass)}
            />
        {/if}
        </div>
    </div>
</section>

<section class="section">
    <h2 class="subtitle">General Systems</h2>
    <div class="field">
        <label class="label" for="shipSystems">Select a system to add</label>
        <div class="control">
          <div class="select">
            <select id="shipSystems" bind:value={shipSystem}>
                <option value="suicide">{str2name("suicide")}</option>
                <option value="adfc">{str2name("adfc")}</option>
                <option value="fireControl">{str2name("fireControl")}</option>
                <option value="mineLayer">{str2name("mineLayer")}</option>
                <option value="mineSweeper">{str2name("mineSweeper")}</option>
                <option value="screen">{str2name("screen")}</option>
            </select>
          </div>
        </div>
        <p class="help">Some systems have additional options available once equipped.</p>
        <div class="control">
            <button class="button is-primary" on:click="{addSystem}">Add System</button>
        </div>
    </div>
    <section class="container">
    {#each $ship.systems as sys, i}
        {#if ["suicide", "adfc", "fireControl", "mineLayer", "mineSweeper", "screen"].includes(sys.name) }
        <Display
            prop="systems"
            idx={i}
        />
        {/if}
    {/each}
    </section>
</section>
<!--
<div class="level">
    <div class="level-item">
        <a href="{jsonDataStr}" download="SSD.json">
            <button class="button">Download Ship JSON</button>
        </a>
    </div>
</div>
-->
{/if}