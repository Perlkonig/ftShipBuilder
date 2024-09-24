<script lang="ts">
    import { ship } from "../../stores/writeShip";

    interface ISystem {
        name: string;
        [k: string]: unknown;
    }

    export let prop: string;
    export let idx: number;
    let sys: ISystem;
    $: sys = $ship[prop][idx];

    const toggleArea = () => {
        if (!sys.hasOwnProperty("area")) {
            sys.area = false;
        }
        sys.area = !sys.area;
        $ship = $ship;
    };
</script>

<nav class="level is-mobile">
    <div class="level-left">
        <button class="button level-item is-small" on:click="{toggleArea}">
            {#if sys.hasOwnProperty("area") && sys.area}
                <span class="icon is-small" title="Toggle Area"
                    ><i class="fa-solid fa-minimize"></i></span
                >
            {:else}
                <span class="icon is-small" title="Toggle Area"
                    ><i class="fa-solid fa-maximize"></i></span
                >
            {/if}
        </button>
    </div>
</nav>
