<script lang="ts">
  import NavBar from "../components/NavBar.svelte";
  import Footer from "../components/Footer.svelte";
  import Base from "./Base.svelte";
</script>

<Base>
  <NavBar />
  <main>
    <slot />
  </main>
  <Footer />
</Base>

<style global>
  main {
    flex: 1;
    width: 100%;
    max-width: var(--width);
    margin: calc(var(--padding) * 2) auto;
  }
</style>
