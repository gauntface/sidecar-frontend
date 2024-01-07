<script lang="ts">
  import Button, { Modifier } from "./Button.svelte";

  import {
    getAuth,
    inMemoryPersistence,
    signInWithPopup,
    GithubAuthProvider,
  } from "firebase/auth";
  import { app } from "../../logic/auth/firebase";

  export let modifier: Modifier | undefined = undefined;

  const auth = getAuth(app);
  // This will prevent the browser from storing session data
  auth.setPersistence(inMemoryPersistence);

  async function signIn() {
    console.log("Sign In <--------------");
    const provider = new GithubAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const idToken = await userCredential.user.getIdToken();
    const res = await fetch("/api/auth/signin", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (res.redirected) {
      window.location.assign(res.url);
    }
  }
</script>

<Button {modifier} on:click={signIn}>Sign In</Button>
