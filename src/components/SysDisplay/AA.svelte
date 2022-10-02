<script lang="ts">
    import { ship } from "../../stores/writeShip";

    interface ISystem {
        name: string;
        [k: string]: unknown;
    };

    export let prop: string;
    export let idx: number;
    let sys: ISystem;
    $: sys = $ship[prop][idx];

    const toggleAdvanced = () => {
        if (! sys.hasOwnProperty("advanced")) {
            sys.advanced = false;
        }
        sys.advanced = ! sys.advanced;
        $ship = $ship;
    };

    const toggleArea = () => {
        if (! sys.hasOwnProperty("area")) {
            sys.area = false;
        }
        sys.area = ! sys.area;
        $ship = $ship;
    };

    const toggleLevel = () => {
        if (! sys.hasOwnProperty("level")) {
            sys.level = 1;
        }
        console.log(sys)
        sys.level = (sys.level == 1 ? 2 : 1);
        $ship = $ship;
    };
</script>

<nav class="level is-mobile">
    <div class="level-left">
      <button class="button level-item is-small" on:click="{toggleAdvanced}">
        {#if ( (sys.hasOwnProperty("advanced")) && (sys.advanced) ) }
            <span class="icon is-small" title="Toggle Advanced"><i class="fa-solid fa-arrow-down"></i></span>
        {:else}
            <span class="icon is-small" title="Toggle Advanced"><i class="fa-solid fa-arrow-up"></i></span>
        {/if}
      </button>
      <button class="button level-item is-small" on:click="{toggleArea}">
        {#if ( (sys.hasOwnProperty("area")) && (sys.area) ) }
            <span class="icon is-small" title="Toggle Area Mode"><i class="fa-solid fa-minimize"></i></span>
        {:else}
            <span class="icon is-small" title="Toggle Area Mode"><i class="fa-solid fa-maximize"></i></span>
        {/if}
      </button>
      <button class="button level-item is-small" on:click="{toggleLevel}">
        {#if ( (sys.hasOwnProperty("level")) && (sys.level) ) }
            <span class="icon is-small" title="Toggle Screen Level">L{sys.level}</span>
        {:else}
            <span class="icon is-small" title="Toggle Screen Level">(LM)</span>
        {/if}
      </button>
    </div>
</nav>
