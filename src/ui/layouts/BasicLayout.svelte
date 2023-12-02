<script lang="ts">
  import NavBar from '../components/NavBar.svelte';
  import Footer from '../components/Footer.svelte';
  import Base from './Base.svelte';
</script>

<Base>
  <NavBar />
  <main>
    <slot />
  </main>
  <Footer />
</Base>

<style global>

</style>
