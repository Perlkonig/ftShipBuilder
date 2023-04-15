<script lang="ts">
    import { Canvg } from "canvg";
    import { createEventDispatcher, onMount } from "svelte";
    import { fontRoboto, fontZen } from "@/lib/css";

    export let svgDisplay: SVGSVGElement;
    export let footerRect: SVGRectElement|undefined = undefined;
    export let width: number;
    export let height: number;

    const dispatch = createEventDispatcher();

    let injectXlink: boolean;
    let svgDataStr: string;
    let pngDataStr: string;
    let pngCanvas: HTMLCanvasElement;
    onMount(() => {
        if (svgDisplay !== undefined) {
            if (footerRect !== undefined) {
                footerRect.setAttribute("fill", "white")
            }
            const ctx = pngCanvas.getContext("2d");
            let text = svgDisplay.outerHTML;
            text = text.replace(`<svg `, `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" `);
            text = text.replace(`<defs>`, `<defs><st` + `yle type="text/css"><![CDATA[ ${fontZen} ${fontRoboto} text { font-family: "Roboto" } .futureFont { font-family: "Zen Dots" } ]]></style>`);
            const v = Canvg.fromString(ctx, text);
            v.render();
            pngDataStr = pngCanvas.toDataURL("image/png");
            if (footerRect !== undefined) {
                footerRect.setAttribute("fill", "black")
            }

            // let text: string;
            if (injectXlink) {
                footerRect.setAttribute("fill", "white")
                text = svgDisplay.outerHTML;
                text = text.replaceAll(`href=`, `xlink:href=`);
                footerRect.setAttribute("fill", "black")
            } else {
                text = svgDisplay.outerHTML;
                text = text.replace(`<svg `, `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" `);
                text = text.replace(`<defs>`, `<defs><st` + `yle type="text/css"><![CDATA[ @import url('https://fonts.googleapis.com/css2?family=Roboto&family=Zen+Dots&display=swap'); text { font-family: "Roboto"} .futureFont { font-family: "Zen Dots" } .svgInvert { filter: invert(1); } ]]></style>`);
            }
            svgDataStr = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(text);
        }
    });
</script>

<div class="level paddingTop">
    <div class="level-item">
        <div class="field">
            <div class="control">
            <a href="{svgDataStr}" download="SSD.svg">
                <button class="button">Download SVG</button>
            </a>
            </div>
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox" bind:checked="{injectXlink}">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    Adjust for apps (<a on:click="{() => dispatch("message", {msg: "showSvg"})
                    }">read more</a>)
                  </label>
            </div>
        </div>
    </div>
    <div class="level-item">
    {#if ( (pngDataStr !== undefined) && (pngDataStr !== "") )}
        <a href="{pngDataStr}" download="SSD.png">
            <button class="button">Download PNG</button>
        </a>
    {:else}
        <button class="button" disabled>Download PNG</button>
    {/if}
    </div>
</div>

<div class="hidden">
    <canvas width="{width + 2}" height="{height + 2}" bind:this="{pngCanvas}"></canvas>
</div>

<style>
    .hidden {
        display: none;
    }
    .paddingTop {
        padding-top: 1rem;
    }
</style>