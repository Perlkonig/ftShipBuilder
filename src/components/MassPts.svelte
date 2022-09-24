<script lang="ts">
    import type { systems } from "ftlibship";

    export let obj: systems.System | systems.SpecialSystem;
</script>

<div class="container">
    <span class="tag is-success is-light">{obj.mass()} mass</span>
    <span class="tag is-info is-light">{obj.points()} NPV</span>
    <span class="tag is-info is-light">{obj.cpv()} CPV</span>
</div>
