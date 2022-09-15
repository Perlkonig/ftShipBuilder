<script lang="ts">
    import { ship } from "../stores/writeShip";
    import { afterUpdate } from "svelte";
    import type { FullThrustShip } from "../schemas/ship";
    import { specialsList, allRegSystems, getSystem, getSpecial } from "../lib/systems";

    interface ISystem {
        name: string;
        [k: string]: unknown;
    };

    interface IMassPts {
        mass: number;
        points: number;
    };

    let results: IMassPts;
    $: results = calcAllMassPts($ship);
    let delta: number;
    $: if ( ($ship.hasOwnProperty("mass")) && ($ship.mass !== undefined) ) {
        delta = $ship.mass - results.mass;
    }

    const calcAllMassPts = (shipObj: FullThrustShip): IMassPts => {
        let mass = 0;
        let points = 0;

        if (! shipObj.hasOwnProperty("mass")) {
            return undefined;
        }

        for (const id of specialsList) {
            const obj = getSpecial(id, shipObj);
            mass += obj.mass();
            points += obj.points();
        }

        for (const group of ["systems", "ordnance", "weapons"]) {
            if (shipObj.hasOwnProperty(group)) {
                for (const sys of shipObj[group] as ISystem[]) {
                    const obj = getSystem(sys, shipObj);
                    mass += obj.mass();
                    points += obj.points()
                }
            }
        }

        shipObj.points = points;
        return {mass, points};
    }

    let errors: string[];
    afterUpdate(() => {
        errors = findErrors();
    });

    const findErrors = (): string[] | undefined => {
        const errors: string[] = [];

        // Mass out of range
        if ( ($ship.mass === undefined) || ($ship.mass < 5) || ($ship.mass > 300) ) {
            errors.push("The ship's mass must be between 5 and 300.");
        }
        // Hull strength out of range
        if ( ($ship.hull.points === undefined) || ($ship.hull.points < ($ship.mass * 0.1)) ) {
            errors.push("The ship's hull must be at least 10% of total mass.")
        }
        // Any armour rows out of range
        const maxArmour = Math.ceil($ship.hull.points / $ship.hull.rows);
        if ( ($ship.hasOwnProperty("armour")) && ($ship.armour.length > 0) ) {
            for (let i = 0; i < $ship.armour.length; i++) {
                if ($ship.armour[i] > maxArmour) {
                    errors.push(`Armour row ${i + 1} is too long. Based on your hull configuration, no armour row can contain more than ${maxArmour} points.`);
                }
            }
        }
        // Sufficient room for DCPs and marines?
        const cf = Math.ceil($ship.mass / 20);
        let baysPassengers = 0;
        let baysTroops = 0;
        let addMarines = 0;
        let addDamage = 0;
        for (let i = 0; i < $ship.systems.length; i++) {
            if ($ship.systems[i].name === "damageControl") {
                addDamage++;
            } else if ($ship.systems[i].name === "marines") {
                addMarines++;
            } else if ($ship.systems[i].name === "bay") {
                if ($ship.systems[i].type === "passenger") {
                    baysPassengers++;
                } else if ($ship.systems[i].type === "troop") {
                    baysTroops++;
                }
            }
        }
        const maxBerthedPassengers = baysPassengers * 4;
        const maxBerthedTroops = baysTroops * 3;
        const maxAdds = cf + maxBerthedPassengers + maxBerthedTroops;
        if ((addMarines + addDamage) > maxAdds) {
            errors.push(`You have overallocated your crew! You have ${cf} crew you can freely allocate between damage control and marines. Based on equipped berths, you can also allocate no more than ${maxBerthedPassengers} additional damage control and ${maxBerthedTroops} additional marines.`);
        } else if (addDamage > (cf + maxBerthedPassengers)) {
            errors.push(`You have allocated too many damage control parties. You can have at most ${cf} plus ${maxBerthedPassengers} from purchased berths.`);
        } else if (addMarines > (cf + maxBerthedTroops)) {
            errors.push(`You have allocated too many marines. You can have at most ${cf} plus ${maxBerthedTroops} from purchased berths.`);
        }

        // Sufficient room for spinal mounts
        const maxSpinalMass = 16 * Math.ceil($ship.mass / 50);
        let spinalMass = 0;
        for (const sys of $ship.weapons) {
            if (sys.name.startsWith("spinal")) {
                const obj = getSystem(sys, $ship);
                spinalMass += obj.mass();
            }
        }
        if (spinalMass > maxSpinalMass) {
            errors.push(`Your spinal-mounted weapons are too heavy. You can only equip 16 mass of spinal weapons for every 50 total ship mass (rounded up).`);
        }

        // Sufficient room for turrets
        const maxTurrets = Math.ceil($ship.mass / 50);
        let turrets = 0;
        for (const sys of $ship.systems) {
            if (sys.name === "turret") {
                turrets++;
            }
        }
        if (turrets > maxTurrets) {
            errors.push(`You have too many turrets. You can only have one turret for every 50 total ship mass (rounded up).`);
        }

        if (errors.length > 0) {
            return errors;
        } else {
            return undefined;
        }
    }
</script>

{#if ( ($ship.hasOwnProperty("mass")) && ($ship.mass !== undefined) )}
<div class="status">
    {#if results !== undefined}
        <div class="container">
            <span class="tag is-success is-light">{results.mass} mass</span>
            <span class="tag is-info is-light">{results.points} points</span>
        </div>

        <div class="container">
        {#if delta > 0}
            <span class="tag is-warning">{delta} mass remaining</span>
        {:else if delta === 0}
            <span class="tag is-success">{delta} mass remaining</span>
        {:else}
            <span class="tag is-danger">Overallocated by {delta} mass!</span>
        {/if}
        </div>
        <div class="content">
    {#if errors !== undefined}
        {#each errors as e}
            <p>{e}</p>
        {/each}
    {/if}
        </div>
    {/if}
</div>
{/if}

<style>
    .status {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
</style>
