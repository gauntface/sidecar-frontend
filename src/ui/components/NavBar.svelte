<script lang="ts">
  import flatText from '../../../public/logos/flat-text.svg';
  import SigninButton from './SigninButton.svelte';
</script>

<nav>
  <a href="/">
    <img src={flatText} alt="Sidecars Logo" />
  </a>
  <div class="c-menu">
    <SigninButton />
  </div>
</nav>

<style>
  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: var(--width);
    margin: calc(var(--padding)*2) auto;
  }

  a {
    max-width: 50%;
  }

  img {
    width: 100%;
    max-width: 200px;
    height: auto;
  }

  .c-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
	  gap: var(--padding);
  }
</style>
