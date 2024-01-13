<script lang="ts">
  import NavBar from "../components/NavBar.svelte";
  import Footer from "../components/Footer.svelte";
  import Base from "./Base.svelte";
</script>

<Base>
  <div class="l-c app-fh">
    <NavBar />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</Base>

<style global>
  .l-c {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .l-c main {
    width: 100%;
    max-width: var(--width);
    margin: calc(var(--padding) * 2) auto;
  }
</style>
