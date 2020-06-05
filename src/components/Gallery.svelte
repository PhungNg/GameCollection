<script>
    import {fade} from 'svelte/transition'
    export let screenshots
    export let getSrc
    export let clip
</script>
<!-- Preview av video -->
{#if clip != 0}
    <img 
        src={clip.clipPre} 
        on:click={()=>getSrc(clip.clipFull, false)}
        alt="preview of clip">
{/if}
<!-- Går gjennom alle screenshots og legger til click event -->
{#each screenshots as screenshot}
        <img 
            class="pointer" 
            transition:fade 
            on:click={(e)=>getSrc(e.target.src, true)} 
            src={screenshot.image} 
            alt="screenshot">
{:else}
    <h1>Loading</h1>
{/each}

<style>
    img{
        width: 100%;
        border-radius: 10px;
    }
    @media(max-width: 1060px){
        img{
            max-height: 70px;
            margin-right: .5rem
        }
    }
</style>