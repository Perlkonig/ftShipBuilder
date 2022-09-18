<script lang="ts">
    import type { System, SpecialSystem } from "../lib/systems";

    export let obj: System | SpecialSystem;
</script>

<div class="container">
    <span class="tag is-success is-light">{obj.mass()} mass</span>
    <span class="tag is-info is-light">{obj.points()} NPV</span>
    <span class="tag is-info is-light">{obj.cpv()} CPV</span>
</div>
