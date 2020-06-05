<script>
    export let stores
    import Fa from 'svelte-fa'
    import { faGamepad } from '@fortawesome/free-solid-svg-icons'
    import { faPlaystation, faXbox, faApple, faSteam, faItchIo, faGooglePlay } from '@fortawesome/free-brands-svg-icons'
</script>
<!-- img skal byttes ut med iconer fra font-awsome -->
<div class="container">
   {#each stores as store}<!-- Henter alle stores --> 
        <a href={store.url} target="_blank">
            <div class="storeBox">
                <p>{store.store.name}</p>
                {#if store.store.id == 1}<!-- plukker kun ut enkelte stores -->
                    <Fa icon={faSteam} size='1.2x'/>
                {:else if store.store.id == 2 || store.store.id == 7}
                    <Fa icon={faXbox} size='1.2x'/>
                {:else if store.store.id == 3}
                    <Fa icon={faPlaystation} size='1.2x'/>
                {:else if store.store.id == 4}
                    <Fa icon={faApple} size='1.2x'/>
                {:else if store.store.id == 5}
                    <img src='icons/gog-black.png' alt="icon">
                {:else if store.store.id == 6}
                    <Fa icon={faGamepad} size='1.2x'/>
                {:else if store.store.id == 8}
                    <Fa icon={faGooglePlay} size='1.2x'/>    
                {:else if store.store.id == 9}
                    <Fa icon={faItchIo} size='1.2x'/>
                {:else}
                    <img src='icons/epicGames-black.png' alt="icon">
                {/if}
            </div>
        </a>
   {/each}
</div>

<style>
    .container{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(165px, 1fr));
        align-items: start;
        gap: .5rem;
        margin: 1rem 0
    }
    .storeBox{
        display: flex;
        justify-content: center;
        background-color: #eee;
        color: black;
        border-radius: 8px;
        align-items: center;
        margin-right: .5rem;
    }
    p{
        font-size: 15px;
        margin-right: 5px;
    }
    img{
        height: 25px;
        width: 25px;
    }
</style>