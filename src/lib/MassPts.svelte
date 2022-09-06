<script lang="ts">
    import type { System, SpecialSystem } from "./systems";

    export let obj: System | SpecialSystem;
</script>

<div class="container">
    <span class="tag is-success is-light">{obj.mass()} mass</span>
    <span class="tag is-info is-light">{obj.points()} points</span>
</div>
