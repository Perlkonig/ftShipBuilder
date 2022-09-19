<script lang="ts">
  import Builder from "./components/Builder.svelte";
  import Status from "./components/Status.svelte";
  import SSD from "./components/SSD.svelte";
  import LoadShip from "./components/LoadShip.svelte";
  import Nav from "./components/Nav.svelte";
</script>

<main class="container p-6">
  <Nav />
  <h1 class="title">Full Thrust Ship Builder</h1>
  <!-- svelte-ignore missing-declaration -->
  <p class="version subtitle">Version: {__APP_VERSION__}</p>
  <div class="sticky">
    <Status/>
  </div>
  <LoadShip/>
  <div class="container">
    <Builder/>
  </div>
  <hr>
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
      I believe in the "value for value" model. If you find this tool valuable, consider a donation proportional to that value: <a href="https://paypal.me/abstractplay">paypal.me/abstractplay</a>. Thank you!
    </p>
  </div>
</footer>

<style>
  .sticky {
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    background: white;
  }
</style>