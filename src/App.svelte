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

<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <a href="https://github.com/Perlkonig/ftShipBuilder">Fork me on GitHub!</a>
    </p>
    <p>
      Buy me a coffee at <a href="https://paypal.me/abstractplay">paypal.me/abstractplay</a>. Thank you!
    </p>
  </div>
</footer>

<style>
  .sticky {
    position: sticky;
    top: 0;
  }
</style>