<script>
    import { getData } from '../utils.js'
    import { createEventDispatcher } from 'svelte';
    import { currentSearch } from '../stores/stores.js'
    export let gameInfo
    
    const dispatch = createEventDispatcher()
    let games
    const getGames = async(param, slug, title) => {
        games = await getData(`games?${param}=${slug}`)/* Henter data */
        $currentSearch = title
        dispatch('route', {
            route: 'browse',
            data: games
        })
    }
</script> 

<div class="specification"><!-- Spesifikasjons grid -->
    <div>
        <h5>Platforms</h5>
        {#each gameInfo.platforms as platform}
            <p class="several" on:click={()=>getGames('platforms', platform.platform.id, platform.platform.name)}>{platform.platform.name}</p>
        {/each}
    </div>
    <div>
        <h5>Genre</h5>
        {#each gameInfo.genres as genre}
            <p class="several" on:click={()=>getGames('genres', genre.id, genre.name)}>{genre.name}</p>
        {/each}
    </div>
    <div>
        <h5>Metascore</h5>
        {#if gameInfo.metacritic}
            <a href="{gameInfo.metacritic_url}" target='_blank'>
                <p>{gameInfo.metacritic}</p>
            </a>
        {:else}
            <p class="noStyle">NoRating</p>
        {/if}
    </div>
    <div>
        <h5>Release date</h5>
        <p class="noStyle">{gameInfo.released}</p>
    </div>
    <div>
        <h5>Age rating</h5>
        <p class="noStyle">
            {#if gameInfo.esrb_rating != null}
                {gameInfo.esrb_rating.name}
            {:else}
                No rating
            {/if}
        </p>
    </div>
    <div>
        <h5>Last updated</h5>
        <p class="noStyle">{gameInfo.updated.slice(0,10)}</p>
    </div>
    <div>
        <h5>Developer</h5>
        {#each gameInfo.developers as developer}
            <p class="several" on:click={()=>getGames('developers', developer.id, developer.name)}>{developer.name}</p>
        {/each}
    </div>
    <div>
        <h5>Publisher</h5>
        {#each gameInfo.publishers as publisher}
            <p class="several" on:click={()=>getGames('publisher', publisher.id, publisher.name)}>{publisher.name}</p>
        {:else}
            <p>No publishers</p>
        {/each}
    </div>
    <div>
        <h5>Website</h5>
        <a style="text-decoration: none" href="{gameInfo.website}" target='_blank'>
            <p>{gameInfo.name_original}</p>
        </a>
    </div>
    <div>
        <h5>Tags</h5>
        {#each gameInfo.tags as tag}
            <p class="several" on:click={()=>getGames('tags', tag.slug, tag.name)}>{tag.name}</p>
        {/each}
    </div>
</div>

<style>
    .specification{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
        gap: 2rem;
        margin: .5rem 0;
        border-top: 1px solid #444;
        padding-top: 1rem;
        transition: 1s
    }
    .specification div{
        justify-content: space-around
    }
    h5{
        color: #999;
        text-shadow: 0 0 10px black
    }
    div:nth-last-child(1){
        grid-column: 1/4
    }
    p{
        display: inline-block;
        margin: 2px;
        text-decoration: underline;
        cursor: pointer;
        text-shadow: 0 0 10px black
    }
    a{
        color: white
    }
    .noStyle{
        text-decoration: none;
        cursor: default
    }
    @media(max-width: 500px){
        .specification{
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        }
    
    }
</style>