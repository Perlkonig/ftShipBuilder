<script lang="ts">
  import Builder from "./lib/Builder.svelte";
  import Status from "./lib/Status.svelte";
  import SSD from "./lib/SSD.svelte";
</script>

<main class="container p-6">
  <h1 class="title">Full Thrust Ship Builder</h1>
  <!-- svelte-ignore missing-declaration -->
  <p class="version subtitle">Version: {__APP_VERSION__}</p>
  <div class="columns">
    <div class="column is-three-quarters">
      <Builder/>
    </div>
    <div class="column">
      <div class="sticky">
        <Status/>
      </div>
    </div>
  </div>
  <div class="container">
    <SSD/>
  </div>
</main>

<style>
  .sticky {
    position: sticky;
    top: 0;
  }
</style>