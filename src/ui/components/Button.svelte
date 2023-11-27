<script lang="ts" context="module">
  export enum Modifier {
    Highlight = "highlight",
    Subtle = "subtle",
  }
</script>

<script lang="ts">
  export let href: string | undefined = undefined;
  export let modifier: Modifier | undefined = undefined;

  const classes = ['btn'];
  if (modifier) {
    classes.push(modifier);
  }

</script>

{#if href}
<a class={classes.join(' ')} href={href}><slot /></a>
{:else}
<button class={classes.join(' ')}><slot /></button>
{/if}

<style>
  .btn {
    border: none;
    background-color: var(--color-primary);
    color: var(--color-background);
    text-decoration: none;
    padding: var(--padding);
    border-radius: calc(var(--padding) / 2);
    cursor: pointer;
  }

  .btn.highlight {
    color: var(--color-text);
    background-color: var(--color-background);
  }

  .btn.subtle {
    background-color: transparent;
    color: var(--color-text);
  }
</style>
