<script lang="ts">
    import { nanoid } from "nanoid";
    // import pako from "pako";
    // import { Buffer } from "buffer";
    import { ship } from "../stores/writeShip";
    import { savedShips } from "../stores/writeStoredShips";
    import SysDisplay from "./SysDisplay.svelte";
    import MassPts from "./MassPts.svelte";
    import { systemList, ordnanceList, weaponList, getSpecial, getSystem, sortNames } from "./systems";

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
            if (shipSystem === "mineLayer") {
                $ship.systems.push({name: "mineLayer", capacity: 2});
            } else if (shipSystem === "bay") {
                $ship.systems.push({name: "bay", id: nanoid(5), capacity: 1, type: "cargo"});
            } else if (shipSystem === "magazine") {
                $ship.systems.push({name: "magazine", capacity: 2, id: nanoid(5)});
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
            } else if (["phaser", "transporter", "needle", "beam", "emp", "plasmaCannon"].includes(shipWeapon)) {
                $ship.weapons.push({name: shipWeapon, class: 1, leftArc: "F", numArcs: 1});
            } else if (shipWeapon === "graser") {
                $ship.weapons.push({name: "graser", class: 1, leftArc: "F", numArcs: 3, heavy: false, highIntensity: false});
            } else if (shipWeapon === "mkp") {
                $ship.weapons.push({name: "mkp", arc: "F"});
            } else {
                $ship.weapons.push({name: shipWeapon});
                $ship = $ship;
            }
        }
        $ship = $ship;
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
    let replacedString: string;
    // let encodedShip: string;
    $: {
        // Remove the embedded SVG glyphs, but keep the x,y coordinates and ids
        replacedString = JSON.stringify($ship, (k, v) => {
            if (k === "glyph") {
                return undefined;
            } else {
                return v;
            }
        });
        jsonDataStr = "data:text/json;charset=utf-8," + encodeURIComponent(replacedString);
        // const compressed = pako.deflate(JSON.stringify($ship));
        // encodedShip = "data:text/plain;charset=utf-8," + encodeURIComponent(Buffer.from(compressed).toString("base64"));
    }

    // const systemList = ["suicide", "adfc", "damageControl", "ecm", "holofield", "marines", "fireControl", "bay", "mineLayer", "mineSweeper", "magazine", "screen", "stealthField"];
    // const ordnanceList = ["amt", "missile", "mkp", "rocketPod", "salvo", "salvoLauncher"];
    // const weaponList = ["ads", "pds", "scatterGun"];

    let saveName: string;
    let duplicated: boolean = true;
    $: if ( (saveName !== undefined) && (saveName !== "") ) {
        const idx = $savedShips.findIndex(x => x.name === saveName);
        if (idx !== -1) {
            duplicated = true;
        } else {
            duplicated = false;
        }
    }

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
                <div class="control">
                <input id="rows" class="input" type="number" placeholder="Hull rows" min="3" max="6" bind:value={$ship.hull.rows}>
                </div>
                <p class="help">4 is the default. 3 means advanced tech. 5 and 6 increases your odds of critical damage, but reduces the point cost.</p>
            </div>
            <MassPts
                obj={getSpecial("hull", $ship)}
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
                obj={getSpecial("armour", $ship)}
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
                obj={getSpecial("stealth", $ship)}
            />

            <div class="field">
                <label class="label" for="streamlining">Atmospheric streamlining</label>
                <div class="control">
                    <div class="select">
                        <select id="streamlining" bind:value={$ship.hull.streamlining} on:change="{() => $ship = $ship}">
                            <option value="none">None</option>
                            <option value="partial">Partial</option>
                            <option value="full">Full</option>
                        </select>
                    </div>
                    <p class="help">Not indicated on the SSD.</p>
                </div>
            </div>
            <MassPts
                obj={getSpecial("streamlining", $ship)}
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
                    obj={getSystem($ship.systems.find(x => x.name === "drive"), $ship)}
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
                        obj={getSystem($ship.systems.find(x => x.name === "ftl"), $ship)}
                    />
                {/if}
                </div>
            </div>
        </section>
    </div> <!-- Column -->

    <div class="column">
        <section class="section">
            <h2 class="subtitle" title="Systems that appear on your SSD but that aren't triggered in the ordnance or firing phases">General Systems</h2>
            <div class="field">
                <label class="label" for="shipSystems">Select a system to add</label>
                <div class="control">
                <div class="select">
                    <select id="shipSystems" bind:value={shipSystem}>
                    {#each systemList as sysname}
                        <option value="{sysname}">{sortNames.get(sysname)}</option>
                    {/each}
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
                {#if systemList.includes(sys.name) }
                <SysDisplay
                    prop="systems"
                    idx={i}
                />
                {/if}
            {/each}
            </section>
        </section>

        <section class="section">
            <h2 class="subtitle" title="Systems that are triggered during the ordnance phase">Ordnance</h2>
            <div class="field">
                <label class="label" for="ordnanceSystems">Select a system to add</label>
                <div class="control">
                <div class="select">
                    <select id="ordnanceSystems" bind:value={shipOrdnance}>
                    {#each ordnanceList as ordname}
                        <option value="{ordname}">{sortNames.get(ordname)}</option>
                    {/each}
                    </select>
                </div>
                </div>
                <p class="help">Some systems have additional options available once equipped.</p>
                <div class="control">
                    <button class="button is-primary" on:click="{addOrdnance}">Load Ordnance</button>
                </div>
            </div>
            <section class="container">
            {#each $ship.ordnance as sys, i}
                {#if ordnanceList.includes(sys.name) }
                <SysDisplay
                    prop="ordnance"
                    idx={i}
                />
                {/if}
            {/each}
            </section>
        </section>

        <section class="section">
            <h2 class="subtitle" title="Systems that are triggered during the firing phase">Weapons (Offensive and Defensive)</h2>
            <div class="field">
                <label class="label" for="weaponSystems">Select a system to add</label>
                <div class="control">
                <div class="select">
                    <select id="weaponSystems" bind:value={shipWeapon}>
                    {#each weaponList as weaponName}
                        <option value="{weaponName}">{sortNames.get(weaponName)}</option>
                    {/each}
                    </select>
                </div>
                </div>
                <p class="help">Some systems have additional options available once equipped.</p>
                <div class="control">
                    <button class="button is-primary" on:click="{addWeapon}">Add weapon</button>
                </div>
            </div>
            <section class="container">
            {#each $ship.weapons as sys, i}
                {#if weaponList.includes(sys.name) }
                <SysDisplay
                    prop="weapons"
                    idx={i}
                />
                {/if}
            {/each}
            </section>
        </section>

    </div> <!-- Column -->
</div> <!-- Columns -->
<div class="level">
    <div class="level-item">
        <a href="{jsonDataStr}" download="SSD.json">
            <button class="button">Download Ship JSON</button>
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
    <!--
    <div class="level-item">
        <a href="{encodedShip}" download="SSD.txt">
            <button class="button">Download Compressed Ship Code</button>
        </a>
    </div>
    -->
</div>
