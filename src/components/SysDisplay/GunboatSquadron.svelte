<script lang="ts">
    import { nanoid } from "nanoid";
    import { ship } from "../../stores/writeShip";
    import {
        gunboatType2Name,
        squadronPoints,
        type GunboatType,
    } from "ftlibship";

    type Squadron = NonNullable<
        import("ftlibship").FullThrustShip["gunboatSquadrons"]
    >[number];

    type Rack = {
        name: "gunboatRack";
        id: string;
        [k: string]: unknown;
    };

    const SLOT_COUNT = 6;
    const boatSlotIndices = Array.from({ length: SLOT_COUNT }, (_, i) => i);

    export let idx: number;
    export let onRemove: () => void;

    let squadron: Squadron;
    $: {
        squadron = $ship.gunboatSquadrons![idx];
        if (squadron.boats === undefined || squadron.boats.length === 0) {
            squadron.boats = [{ type: "beam" }];
        }
        if (squadron.boats.length > SLOT_COUNT) {
            squadron.boats = squadron.boats.slice(0, SLOT_COUNT);
        }
    }

    $: squadronCost = squadronPoints(squadron);

    let allRacks: Rack[] = [];
    let assignedRackIds: string[] = [];
    $: {
        assignedRackIds = ($ship.gunboatSquadrons ?? [])
            .map((x) => x.rack)
            .filter((x): x is string => x !== undefined);
        allRacks = [];
        for (const s of $ship.systems) {
            if (s.name === "gunboatRack") {
                allRacks.push(s as Rack);
            }
        }
    }

    $: isFtl = squadron.mods?.includes("ftl") ?? false;

    const gunboatTypes = [...gunboatType2Name.entries()].sort((a, b) =>
        a[1].localeCompare(b[1])
    );

    const touch = () => {
        $ship = $ship;
    };

    const slotType = (slot: number): string => {
        if (slot >= squadron.boats.length) {
            return "";
        }
        return squadron.boats[slot].type;
    };

    const canClearSlot = (slot: number): boolean => {
        return squadron.boats.length > 1 && slot > 0 && slot < squadron.boats.length;
    };

    const setBoatSlot = (slot: number, value: string) => {
        if (value === "") {
            if (!canClearSlot(slot)) {
                return;
            }
            squadron.boats = squadron.boats.slice(0, slot);
        } else {
            const type = value as GunboatType;
            while (squadron.boats.length < slot) {
                squadron.boats.push({ type: "beam" });
            }
            if (squadron.boats.length === slot) {
                squadron.boats.push({ type });
            } else {
                squadron.boats[slot] = {
                    ...squadron.boats[slot],
                    type,
                };
            }
        }
        touch();
    };

    const setFtl = (enabled: boolean) => {
        if (enabled) {
            squadron.mods = ["ftl"];
            delete squadron.rack;
            if (squadron.id === undefined) {
                squadron.id = nanoid(5);
            }
        } else {
            delete squadron.mods;
            delete squadron.id;
        }
        touch();
    };

    const setProtection = (value: string) => {
        if (value === "") {
            delete squadron.protection;
        } else {
            squadron.protection = value as "heavy" | "screened";
        }
        touch();
    };

    const setEcm = (value: number) => {
        if (value <= 0) {
            delete squadron.ecm;
        } else {
            squadron.ecm = value;
        }
        touch();
    };

    const onRackChange = (value: string) => {
        if (value === "") {
            delete squadron.rack;
        } else {
            squadron.rack = value;
        }
        touch();
    };
</script>

<article class="media gunboat-squadron">
    <div class="media-content">
        <div class="content">
            <p class="label">Gunboat squadron</p>
            <div class="tags">
                <span class="tag is-success is-light">0 mass</span>
                <span class="tag is-info is-light">{squadronCost} NPV</span>
                <span class="tag is-info is-light">{squadronCost} CPV</span>
            </div>
        </div>

        <div class="field">
            <label class="checkbox">
                <input
                    type="checkbox"
                    checked="{isFtl}"
                    on:change="{(e) => setFtl(e.currentTarget.checked)}"
                />
                FTL squadron (cannot use a rack)
            </label>
        </div>

        <div class="columns is-multiline">
            {#if !isFtl}
                <div class="column is-12 is-6-tablet">
                    <div class="field">
                        <label class="label" for="rack-{idx}">Gunboat rack</label>
                        <div class="control">
                            <div class="select is-fullwidth" id="rack-{idx}">
                                <select
                                    value="{squadron.rack ?? ''}"
                                    on:change="{(e) =>
                                        onRackChange(e.currentTarget.value)}"
                                >
                                    <option value="">— select rack —</option>
                                    {#each allRacks as r}
                                        <option value="{r.id}"
                                            >{assignedRackIds.includes(r.id)
                                                ? "(ASSIGNED) "
                                                : ""}{r.id}</option
                                        >
                                    {/each}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            {:else}
                <div class="column is-12 is-6-tablet">
                    <div class="field">
                        <label class="label" for="sqid-{idx}">Squadron id</label>
                        <div class="control">
                            <input
                                id="sqid-{idx}"
                                class="input"
                                type="text"
                                bind:value="{squadron.id}"
                                on:change="{touch}"
                            />
                        </div>
                        <p class="help">
                            Used by play tools for FTL squadrons without a rack.
                        </p>
                    </div>
                </div>
            {/if}

            <div class="column is-12 is-6-tablet">
                <div class="field">
                    <label class="label" for="protection-{idx}">Protection</label>
                    <div class="control">
                        <div class="select is-fullwidth" id="protection-{idx}">
                            <select
                                value="{squadron.protection ?? ''}"
                                on:change="{(e) =>
                                    setProtection(e.currentTarget.value)}"
                            >
                                <option value="">None</option>
                                <option value="heavy"
                                    >Heavy (+12 pts squadron)</option
                                >
                                <option value="screened"
                                    >Screened (+12 pts squadron)</option
                                >
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column is-12 is-6-tablet">
                <div class="field">
                    <label class="label" for="ecm-{idx}">ECM levels</label>
                    <div class="control">
                        <div class="select is-fullwidth" id="ecm-{idx}">
                            <select
                                value="{squadron.ecm ?? 0}"
                                on:change="{(e) =>
                                    setEcm(Number(e.currentTarget.value))}"
                            >
                                {#each [0, 1, 2, 3] as n}
                                    <option value="{n}"
                                        >{n} (+{n * 3} pts)</option
                                    >
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p class="label">Boats (up to 6)</p>
        <p class="help">
            Choosing None on a slot removes that boat and any higher-numbered
            slots. At least one boat is required.
        </p>
        <div class="columns is-multiline">
            {#each boatSlotIndices as slot}
                <div class="column is-12 is-6-tablet is-4-desktop">
                    <div class="field">
                        <label class="label" for="boat-{idx}-{slot}"
                            >Boat {slot + 1}</label
                        >
                        <div class="control">
                            <div
                                class="select is-fullwidth"
                                id="boat-{idx}-{slot}"
                            >
                                <select
                                    value="{slotType(slot)}"
                                    on:change="{(e) =>
                                        setBoatSlot(
                                            slot,
                                            e.currentTarget.value
                                        )}"
                                >
                                    {#if canClearSlot(slot)}
                                        <option value="">— None —</option>
                                    {/if}
                                    {#each gunboatTypes as pair}
                                        <option value="{pair[0]}"
                                            >{pair[1]}</option
                                        >
                                    {/each}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="media-right">
        <button class="delete" on:click="{onRemove}"></button>
    </div>
</article>

<style>
    .gunboat-squadron {
        max-width: 100%;
    }
    .gunboat-squadron .select,
    .gunboat-squadron .control {
        max-width: 100%;
    }
</style>
