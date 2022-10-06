<script lang="ts">
    import { ship } from "@/stores/writeShip";

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
    </div>
</nav>
