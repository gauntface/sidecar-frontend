<script lang="ts">
  import Layout from "../../ui/layouts/BasicLayout.svelte";
  import { auth } from "../../logic/auth/firebase";

  let user = auth.user;
  auth.addEventListener("user-change", () => {
    user = auth.user;
  });
</script>

<Layout>
  <h1>Welcome {user?.displayName}</h1>
  <p>We are happy to see you here</p>
</Layout>
