<script lang="ts">
    import type { IMassPts } from "./massPts";

    export let results: IMassPts;
</script>

<div class="container">
    <span class="tag is-success is-light">{results.mass} mass</span>
    <span class="tag is-info is-light">{results.points} points</span>
</div>
