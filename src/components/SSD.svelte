<script lang="ts">
    import { ship } from "@/stores/writeShip";
    import ParadigmFreeform from "./SSD/ParadigmFreeform.svelte";
    import ParadigmBlocks from "./SSD/ParadigmBlocks.svelte";
    import ParadigmLinear from "./SSD/ParadigmLinear.svelte";
    import SaveShip from "./SaveShip.svelte";
    let paradigm = "linear";
    let modalSvg: string;
    const handleMessage = (e) => {
        if (e.detail.msg === "showSvg") {
            modalSvg = "is-active";
        }
    };
</script>

<div class="tabs is-medium is-boxed is-centered paddingBottom">
    <ul>
        <li
            class="{paradigm === "linear" ? "is-active" : ""}"
            on:click="{() => paradigm = "linear"}"
            title="A simple, no-intervention-needed layout that should be appropriate for most uses"
        >
            <a>
                Linear Layout
            </a>
        </li>
        <li
            class="{paradigm === "blocks" ? "is-active" : ""}"
            on:click="{() => paradigm = "blocks"}"
            title="A middle-ground approach where you arrange the systems and blocks of other elements"
        >
            <a>
                Block-Based Layout
            </a>
        </li>
        <li
            class="{paradigm === "freeform" ? "is-active" : ""}"
            on:click="{() => paradigm = "freeform"}"
            title="A fully freeform approach where you manually arrange everything"
        >
            <a>
                Freeform Layout
            </a>
        </li>
    </ul>
</div>

{#if paradigm === "linear"}
    {#key $ship}
        <ParadigmLinear
            ship={$ship}
            on:message="{handleMessage}"
        />
    {/key}
{:else if paradigm === "freeform"}
    {#key $ship}
        <ParadigmFreeform
            on:message="{handleMessage}"
        />
    {/key}
{:else if paradigm === "blocks"}
    {#key $ship}
        <ParadigmBlocks
            on:message="{handleMessage}"
        />
    {/key}
{/if}

<SaveShip ship={$ship} />

<div class="modal {modalSvg}" id="modalFeedback">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">About SVG Support</p>
        </header>
        <section class="modal-card-body">
            <div class="content">
                <p>While scalable vector graphics (SVG) are ostensibly <a href="https://www.w3.org/Graphics/SVG/" target="_NEW">a standard</a>, not all SVG viewers are created equal. This app is designed for the web, and the SVG it produces is (to my knowledge) standards compliant and will work as expected in all major browsers. (Report any issues related to browser support on <a href="https://github.com/Perlkonig/ftShipBuilder/issues" target="_NEW">GitHub</a>.)</p>
                <p>But support in image editing apps like Adobe Illustrator and Inkscape are more problematic. If your app will not open the default SVG, then you can try checking the "Adjust for apps" box before exporting. It will strip any style tag and change all <code>href</code>s to <code>xlink:href</code>s. But even then, your mileage may vary. Reports of rendering issues in other apps should be directed to those app makers. If you discover an issue with the SVG I produce, then please let me know. If there is something simple I can do to make the SVG work well, I am certainly happy to look into it.</p>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button" on:click="{() => modalSvg = undefined}">Close</button>
        </footer>
    </div>
</div>

<style>
    .paddingBottom {
        padding-bottom: 1rem;
    }
    .modal {
        z-index: 200;
    }
</style>