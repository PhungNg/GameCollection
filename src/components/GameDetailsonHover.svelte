<script>
    import { getData, inList, getIcon } from '../utils.js'
    import { createEventDispatcher } from 'svelte';
    import { currentSearch } from '../stores/stores.js'

    import Fa from 'svelte-fa'
    export let game
    const dispatch = createEventDispatcher()
    let games = []

    const getGames = async(param, slug, search) => {
        $currentSearch = search
        games = await getData(`games?${param}=${slug}`)

        dispatch('route', {
            route: 'browse',
            data: games
        })
        scroll(0,0)
    }
</script>
    <div class="column">
        <p>Platforms</p>
        <div class="flex right">
            {#each game.parent_platforms as platform}
                {#if inList(platform.platform.name, platform.platform.id)}<!-- Sjekker om jeg vil ha platformen -->
                    <div class="icons pointer"
                        on:click|stopPropagation={()=>
                        getGames('parent_platforms', platform.platform.id, platform.platform.name)}>
                        <Fa icon={getIcon(platform.platform.name)} />
                    </div>
                {/if}
            {/each}
        </div>
    </div>
    <div class="column">
        <p>Genres:</p>
        <div class="right">
            {#each game.genres as genre}<!-- Henter sjangere -->
                <p on:click|stopPropagation={()=>
                    getGames('genres', genre.slug, genre.name)} 
                    class="genreName pointer">
                    {genre.name}
                </p>
            {/each}
        </div>
    </div>
    <div class="column">
        <p>Release date:</p>
        <p class="right">{game.released}</p>
    </div>

<style>
    .right{
        justify-self: end;
        align-self: center;
        color: #eee
    }   
    .column{
        color: #999;
        display: grid;
        grid-template-columns: 2fr 3fr;
        border-bottom: 1px solid #999
    }
    .column p{
        font-size: .8rem
    }
    .column:last-of-type{
        border-bottom: none
    }
    .icons{
        margin-left: .5rem;
    }
    .icons:hover{
        color: #777;
        transform: scale(1.2)
    }
    .genreName{
        text-decoration: underline;
        display: inline-block;
        text-align: end;
        margin: .2rem    
    }
    .genreName:hover{
        color: #777;
        transform: scale(1.1)
    }
</style>