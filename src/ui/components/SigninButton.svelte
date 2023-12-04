<script lang="ts">
  import Button, { Modifier } from './Button.svelte';

  import {
    getAuth,
    inMemoryPersistence,
    signInWithPopup,
    GithubAuthProvider
  } from "firebase/auth";
  import { app } from "../../logic/auth/firebase";

  export let modifier: Modifier | undefined = undefined;

  const auth = getAuth(app);
  // This will prevent the browser from storing session data
  auth.setPersistence(inMemoryPersistence);

  const signinBtns = document.querySelectorAll('[data-signin-btn]');
  for (const b of signinBtns) {
    b.addEventListener('click', async (e) => {
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
    });
  }
</script>
<Button modifier={modifier}>Sign In</Button>
