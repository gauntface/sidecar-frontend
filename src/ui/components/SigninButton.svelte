<script lang="ts">
  import Button, { Modifier } from "./Button.svelte";

  import { auth } from "../../logic/auth/firebase";

  export let modifier: Modifier | undefined = undefined;
  export let redirect: string | undefined = undefined;

  let isLoggedIn = !!auth.user;
  auth.addEventListener("user-change", () => {
    isLoggedIn = !!auth.user;
  });

  async function signIn(redirect: string | undefined) {
    try {
      await auth.signIn();
      if (redirect) {
        window.location.assign(redirect);
      }
    } catch (err) {
      console.error("Failed to sign in user: ", err);
    }
  }

  async function signOut() {
    await auth.signOut();
    window.location.assign("/");
  }
</script>

{#if isLoggedIn}
  <Button {modifier} on:click={() => signOut()}>Sign Out</Button>
{:else}
  <Button {modifier} on:click={() => signIn(redirect)}>Sign In</Button>
{/if}
