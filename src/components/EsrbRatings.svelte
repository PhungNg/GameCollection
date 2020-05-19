<script>
    export let esrb
</script>
    {#if esrb}
        <img src={'icons/esrb-' + esrb.slug+'.png'} alt="esrb rating icon">
    {:else}
        <img src="icons/esrb-rp.png" alt="esrb rating icon">
    {/if}
<style>
</style>