<script>
    export let stores
</script>
<!-- img skal byttes ut med iconer fra font-awsome -->
<div class="container">
   {#each stores as store}<!-- Henter alle stores --> 
        <a href={store.url} target="_blank">
            <div class="storeBox">
                <p>{store.store.name}</p>
                {#if store.store.id == 1}<!-- plukker kun ut enkelte stores -->
                    <img src='icons/steam-black.png' alt="icon">
                {:else if store.store.id == 2 || store.store.id == 7}
                    <img src='icons/xbox-black.png' alt="icon">
                {:else if store.store.id == 3}
                    <img src='icons/ps-black.png' alt="icon">
                {:else if store.store.id == 4}
                    <img src='icons/apple-black.png' alt="icon">
                {:else if store.store.id == 5}
                    <img src='icons/gog-black.png' alt="icon">
                {:else if store.store.id == 6}
                    <img src='icons/nintendo-black.png' alt="icon">
                {:else if store.store.id == 8}
                    <img src='icons/google-black.png' alt="icon">
                {:else if store.store.id == 9}
                    <img src='icons/itch-black.png' alt="icon">
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
        grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
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
        padding: 0.3rem .5rem;
        margin-right: .5rem;
        /* min-width */
    }
    p{
        font-size: 15px
    }
    img{
        height: 30px;
        width: 30px;
    }
</style>