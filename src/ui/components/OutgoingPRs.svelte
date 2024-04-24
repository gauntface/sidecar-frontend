<script lang="ts">
  console.log(`OutgoingPRs`);
  async function go() {
    const response = await fetch(
      `${import.meta.env.VITE_API_SERVER}/github/outgoing-prs`,
      {
        headers: {
          Authorization: "test",
        },
      }
    );
    if (!response.ok) {
      console.error(
        `Response is not ok: `,
        response.statusText,
        response.status
      );
      console.error(await response.text());
    }
    console.log(`Response ok: `, await response.text());
  }
  go();
</script>

<p>Outgoing PRs</p>
