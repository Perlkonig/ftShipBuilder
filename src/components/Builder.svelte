<script lang="ts">
    import { nanoid } from "nanoid";
    import { ship } from "../stores/writeShip";
    import { systems } from "ftlibship";
    import SysDisplay from "./SysDisplay.svelte";
    import MassPts from "./MassPts.svelte";
    import SaveShip from "./SaveShip.svelte";

    const addArmour = () => {
        $ship.armour.push([1,0]);
        $ship = $ship;
    };

    const delArmour = () => {
        $ship.armour.splice($ship.armour.length - 1);
        $ship = $ship;
    };

    let thrust: number;
    let driveAdvanced: boolean;
    ship.subscribe((obj) => {
        const drive = obj.systems.find(x => x.name === "drive");
        if (drive !== undefined) {
            thrust = drive.thrust as number;
            driveAdvanced = drive.advanced as boolean;
        } else {
            thrust = 0;
            driveAdvanced = false;
        }
    });
    $: {
        const drive = $ship.systems.find(x => x.name === "drive");
        if (drive !== undefined) {
            drive.thrust = thrust;
            drive.advanced = driveAdvanced;
        }
        $ship = $ship;
    }

    let ftl: boolean;
    let ftlAdvanced: boolean;
    ship.subscribe((obj) => {
        const idx = obj.systems.findIndex(x => x.name === "ftl");
        if (idx === -1) {
            ftl = false;
            ftlAdvanced = false;
        } else {
            ftl = true;
            ftlAdvanced = obj.systems[idx].advanced as boolean;
        }
    });
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
            if (shipSystem === "mineLayer") {
                $ship.systems.push({name: "mineLayer", capacity: 2});
            } else if (shipSystem === "bay") {
                $ship.systems.push({name: "bay", id: nanoid(5), capacity: 1, type: "cargo"});
            } else if (shipSystem === "hangar") {
                $ship.systems.push({name: "hangar", id: nanoid(5), isRack: false, critRules: false});
            } else if (shipSystem === "magazine") {
                // @ts-ignore
                $ship.systems.push({name: "magazine", capacity: 2, id: nanoid(5)});
            } else if (shipSystem === "launchTube") {
                $ship.systems.push({name: "launchTube", catapult: false});
            } else if (shipSystem === "turret") {
                $ship.systems.push({name: "turret", leftArc: "F", numArcs: 1});
            } else if (shipSystem === "decoy") {
                $ship.systems.push({name: "decoy", type: "cruiser"});
            } else if (shipSystem === "screen") {
                $ship.systems.push({name: "screen", level: undefined, area: false, advanced: false});
            } else {
                // @ts-ignore
                $ship.systems.push({name: shipSystem});
            }
            $ship = $ship;
        }
    };
    let shipOrdnance: string;
    const addOrdnance = () => {
        if (shipOrdnance !== undefined) {
            if ( (shipOrdnance === "salvoLauncher") || (shipOrdnance === "rocketPod") ) {
                $ship.ordnance.push({name: shipOrdnance, leftArc: "FP", numArcs: 3});
            } else {
                // @ts-ignore
                $ship.ordnance.push({name: shipOrdnance});
            }
            $ship = $ship;
        }
    };
    let shipWeapon: string;
    const addWeapon = () => {
        if (shipWeapon !== undefined) {
            if (shipWeapon === "ads") {
                $ship.weapons.push({name: shipWeapon, leftArc: "FP", numArcs: 3});
            } else if (["phaser", "transporter", "needle", "beam", "emp", "plasmaCannon", "kgun", "gravitic", "pbl"].includes(shipWeapon)) {
                // @ts-ignore
                $ship.weapons.push({name: shipWeapon, class: 1, leftArc: "F", numArcs: 1});
            } else if (["gatling", "particle", "meson", "fusion", "torpedoPulse", "pulser"].includes(shipWeapon)) {
                // @ts-ignore
                $ship.weapons.push({name: shipWeapon, leftArc: "F", numArcs: 1});
            } else if (shipWeapon === "submunition") {
                $ship.weapons.push({name: "submunition", leftArc: "FP", numArcs: 3});
            } else if (shipWeapon === "graser") {
                $ship.weapons.push({name: "graser", class: 1, leftArc: "F", numArcs: 3, heavy: false, highIntensity: false});
            } else if (shipWeapon === "mkp") {
                $ship.weapons.push({name: "mkp", arc: "F"});
            } else {
                // @ts-ignore
                $ship.weapons.push({name: shipWeapon});
                $ship = $ship;
            }
        }
        $ship = $ship;
    };

    const addFighter = () => {
        $ship.fighters.push({name: "fighters", type: "standard"});
        $ship = $ship;
    };

    let emptyHangars: number;
    let duplicateHangars = false;
    $: {
        const numHangars = $ship.systems.reduce((a, v) => {return v.name === "hangar" ? a + 1 : a}, 0);
        const numFighters = $ship.fighters.length;
        emptyHangars = numHangars - numFighters;
        const unique: Set<string> = new Set([...$ship.fighters.map(x => x.hangar)]);
        if (unique.size !== $ship.fighters.length) {
            duplicateHangars = true;
        }
    }

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

    let showSystems = true;
    let showOrdnance = true;
    let showWeapons = true;
    let showFighters = true;
    const toggle = (flag: string) => {
        switch (flag) {
            case "systems":
                showSystems = ! showSystems;
                break;
            case "ordnance":
                showOrdnance = ! showOrdnance;
                break;
            case "weapons":
                showWeapons = ! showWeapons;
                break;
            case "fighters":
                showFighters = ! showFighters;
                break;
        }
    }
</script>

<div class="columns">
    <div class="column">
        <section class="section">
            <h2 class="subtitle" title="All things hull">Structure</h2>

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

            <div class="field">
                <label class="label" for="class">Ship class</label>
                <p class="help">Is overwritten by the system if the mass changes.</p>
                <div class="control">
                    <input id="class" class="input" type="text" placeholder="Ship class" bind:value="{$ship.class}">
                </div>

            </div>

            <div class="field">
                <label class="label" for="shipName">Ship name</label>
                <p class="help">Appears on the SSD in quotes.</p>
                <div class="control">
                    <input id="shipName" class="input" type="text" placeholder="Ship name" bind:value="{$ship.name}">
                </div>

            </div>

            <div class="field">
                <label class="label" for="hull">Hull strength</label>
                <div class="control">
                <input id="hull" class="input" type="number" placeholder="Hull strength" bind:value={$ship.hull.points} max="{$ship.mass}">
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
                <p class="help">4 is the default. 3 means advanced tech. 5 and 6 increases your odds of critical damage, but reduces the point cost.</p>
                <div class="control">
                <input id="rows" class="input" type="number" placeholder="Hull rows" min="3" max="6" bind:value={$ship.hull.rows}>
                </div>
            </div>
            <MassPts
                obj={systems.getSpecial("hull", $ship)}
            />

            <div class="field is-grouped topPadding">
                <div class="control">
                    <button class="button is-primary is-small" on:click="{addArmour}" disabled="{$ship.armour.length >= 5}">
                        Add armour row
                    </button>
                </div>
                <div class="control">
                    <button class="button is-danger is-small" on:click="{delArmour}" disabled="{$ship.armour.length === 0}">
                        Remove armour row
                    </button>
                </div>
            </div>

            {#each $ship.armour as row, i }
            <div class="columns">
                <div class="column">
                    <div class="field">
                        <label class="label" for="armour{i}">Armour: Row {i + 1}</label>
                        <div class="control">
                        <input id="armour{i}" class="input" type="number" placeholder="Armour points" min="1" max="{Math.ceil($ship.hull.points / $ship.hull.rows)}" bind:value={$ship.armour[i][0]}>
                        </div>
                    {#if ($ship.armour[i][0] + $ship.armour[i][1]) > Math.ceil($ship.hull.points / $ship.hull.rows)}
                        <p class="help is-danger">You can only have as much armour per row as hull boxes on your first row ({Math.ceil($ship.hull.points / $ship.hull.rows)}).</p>
                    {/if}
                    </div>
                </div>
                <div class="column">
                    <div class="field">
                        <label class="label" for="regenArmour{i}">Regenerative: Row {i + 1}</label>
                        <div class="control">
                        <input id="regenArmour{i}" class="input" type="number" placeholder="Regenerative armour points" min="0" max="{Math.ceil($ship.hull.points / $ship.hull.rows)}" bind:value={$ship.armour[i][1]}>
                        </div>
                    </div>
                </div>
            </div>
            {/each}
            <MassPts
                obj={systems.getSpecial("armour", $ship)}
            />

            <div class="field">
                <label class="label" for="stealth">Stealth level</label>
                <div class="control">
                    <div class="select">
                        <select id="stealth" bind:value={$ship.hull.stealth} on:change="{() => $ship = $ship}">
                            <option value="0">No stealth</option>
                            <option value="1">Stealth level 1</option>
                            <option value="2">Stealth level 2</option>
                        </select>
                    </div>
                </div>
            </div>
            <MassPts
                obj={systems.getSpecial("stealth", $ship)}
            />

            <div class="field">
                <label class="label" for="streamlining">Atmospheric streamlining</label>
                <p class="help">Not indicated on the SSD.</p>
                <div class="control">
                    <div class="select">
                        <select id="streamlining" bind:value={$ship.hull.streamlining} on:change="{() => $ship = $ship}">
                            <option value="none">None</option>
                            <option value="partial">Partial</option>
                            <option value="full">Full</option>
                        </select>
                    </div>

                </div>
            </div>
            <MassPts
                obj={systems.getSpecial("streamlining", $ship)}
            />
        </section>

        <section class="section">
            <h2 class="subtitle" title="How you make it go">Drive Systems</h2>

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
                    obj={systems.getSystem($ship.systems.find(x => x.name === "drive"), $ship)}
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
                        obj={systems.getSystem($ship.systems.find(x => x.name === "ftl"), $ship)}
                    />
                {/if}
                </div>
            </div>
        </section>

        <!--
        <section class="section">
            <h2 class="subtitle">Ship Notes</h2>

            <div class="field">
                <label class="label" for="notes">Add any narrative notes you may wish to add to your SSD. Use <a href="https://www.markdownguide.org/">Markdown</a> for formatting.</label>
                <div class="control">
                    <textarea id="notes" class="textarea" placeholder="Enter Markdown-encoded text here" bind:value="{$ship.notes}" rows="3"></textarea>
                </div>
            </div>

        {#if $ship.notes !== undefined}
            <div class="notesPreview content">
                <SvelteMarkdown source={$ship.notes} />
            </div>
        {/if}
        </section>
        -->

    </div> <!-- Column -->

    <div class="column">
        <section class="section">
            <div class ="level">
                <div class="level-left">
                    <div class="level-item">
                        <span class="icon" on:click="{() => toggle("systems")}">
                        {#if showSystems}
                            <i class="fa-solid fa-chevron-down"></i>
                        {:else}
                            <i class="fa-solid fa-chevron-right"></i>
                        {/if}
                          </span>
                    </div>
                    <div class="level-item">
                        <h2 class="subtitle" title="Systems that appear on your SSD but that aren't triggered in the ordnance or firing phases">General Systems</h2>
                    </div>
                </div>
            </div>
        {#if showSystems}
            <label class="label" for="shipSystems">Select a system to add</label>
            <p class="help">Some systems have additional options available once equipped.</p>
            <div class="field has-addons">

                <div class="control is-expanded">
                    <div class="select is-fullwidth">
                        <select id="shipSystems" bind:value={shipSystem}>
                        {#each systems.systemList as sysname}
                            <option value="{sysname}">{systems.sortNames.get(sysname)}</option>
                        {/each}
                        </select>
                    </div>
                </div>

                <div class="control">
                    <button class="button is-primary" on:click="{addSystem}">Add System</button>
                </div>
            </div>

            <section class="container">
            {#each $ship.systems as sys, i}
                {#if systems.systemList.includes(sys.name) }
                <SysDisplay
                    prop="systems"
                    idx={i}
                />
                {/if}
            {/each}
            </section>
        {/if}
        </section>

        <section class="section">
            <div class ="level">
                <div class="level-left">
                    <div class="level-item">
                        <span class="icon" on:click="{() => toggle("ordnance")}">
                        {#if showOrdnance}
                            <i class="fa-solid fa-chevron-down"></i>
                        {:else}
                            <i class="fa-solid fa-chevron-right"></i>
                        {/if}
                          </span>
                    </div>
                    <div class="level-item">
                        <h2 class="subtitle" title="Systems that are triggered during the ordnance phase">Ordnance</h2>
                    </div>
                </div>
            </div>

        {#if showOrdnance}
            <label class="label" for="ordnanceSystems">Select a system to add</label>
            <p class="help">Some systems have additional options available once equipped.</p>
            <div class="field has-addons">
                <div class="control is-expanded">
                    <div class="select is-fullwidth">
                        <select id="ordnanceSystems" bind:value={shipOrdnance}>
                        {#each systems.ordnanceList as ordname}
                            <option value="{ordname}">{systems.sortNames.get(ordname)}</option>
                        {/each}
                        </select>
                    </div>
                </div>
                <div class="control">
                    <button class="button is-primary" on:click="{addOrdnance}">Load Ordnance</button>
                </div>
            </div>
            <section class="container">
            {#each $ship.ordnance as sys, i}
                {#if systems.ordnanceList.includes(sys.name) }
                <SysDisplay
                    prop="ordnance"
                    idx={i}
                />
                {/if}
            {/each}
            </section>
        {/if}
        </section>

        <section class="section">
            <div class ="level">
                <div class="level-left">
                    <div class="level-item">
                        <span class="icon" on:click="{() => toggle("weapons")}">
                        {#if showWeapons}
                            <i class="fa-solid fa-chevron-down"></i>
                        {:else}
                            <i class="fa-solid fa-chevron-right"></i>
                        {/if}
                          </span>
                    </div>
                    <div class="level-item">
                        <h2 class="subtitle" title="Systems that are triggered during the firing phase">Weapons (Offensive and Defensive)</h2>
                    </div>
                </div>
            </div>

        {#if showWeapons}
            <label class="label" for="weaponSystems">Select a system to add</label>
            <p class="help">Some systems have additional options available once equipped.</p>
            <div class="field has-addons">
                <div class="control is-expanded">
                    <div class="select is-fullwidth">
                        <select id="weaponSystems" bind:value={shipWeapon}>
                        {#each systems.weaponList as weaponName}
                            <option value="{weaponName}">{systems.sortNames.get(weaponName)}</option>
                        {/each}
                        </select>
                    </div>
                </div>

                <div class="control">
                    <button class="button is-primary" on:click="{addWeapon}">Add weapon</button>
                </div>
            </div>
            <section class="container">
            {#each $ship.weapons as sys, i}
                {#if systems.weaponList.includes(sys.name) }
                <SysDisplay
                    prop="weapons"
                    idx={i}
                />
                {/if}
            {/each}
            </section>
        {/if}
        </section>

    {#if ( (emptyHangars > 0) || ($ship.fighters.length > 0) )}
        <section class="section">
            <div class ="level">
                <div class="level-left">
                    <div class="level-item">
                        <span class="icon" on:click="{() => toggle("fighters")}">
                        {#if showFighters}
                            <i class="fa-solid fa-chevron-down"></i>
                        {:else}
                            <i class="fa-solid fa-chevron-right"></i>
                        {/if}
                          </span>
                    </div>
                    <div class="level-item">
                        <h2 class="subtitle">Fighters</h2>
                    </div>
                </div>
            </div>

        {#if showFighters}
            <div class="content">
                <p>
                    You have {emptyHangars} empty hangar{emptyHangars != 1 ? "s" : ""} awaiting fighters.
                </p>
            {#if duplicateHangars}
                <p class="alert">
                    You have multiple fighters assigned to the same hangar.
                </p>
            {/if}
            </div>
            <div class="field">
                <div class="control">
                {#if emptyHangars > 0}
                    <button class="button is-primary" on:click="{addFighter}">Add fighter wing</button>
                {:else}
                    <button class="button is-primary" disabled>Add fighter wing</button>
                {/if}
                </div>
            </div>
            <section class="container">
            {#each $ship.fighters as sys, i}
                <SysDisplay
                    prop="fighters"
                    idx={i}
                />
            {/each}
            </section>
        {/if}
        </section>
    {/if}

    </div> <!-- Column -->
</div> <!-- Columns -->

<SaveShip
    ship={$ship}
/>

<style>
    .alert {
        color: red;
        font-style: italic;
    }
    .topPadding {
        padding-top: 1em;
    }
    /* .notesPreview {
        border: 1px solid black;
        padding: 1rem;
    } */
</style>