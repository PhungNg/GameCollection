<script>
    import { createEventDispatcher } from 'svelte';
    import {fly, fade, slide} from 'svelte/transition'
    import { getData, inList, getIcon } from '../utils.js'
    import Fa from 'svelte-fa'
    export let games

    const dispatch = createEventDispatcher()

    /* Åpner spill article */
    const openGame = (e,id) => {
        getData(`games/${id}`)
            .then( gameInfo => {
                dispatch('route',{
                    route:'gameArticle',
                    data: gameInfo
                })
            })
    }
    /* Filtrerer */
    const getGames = async(param, slug) => {
        games = await getData(`games?${param}=${slug}`)
        dispatch('route', {
            route: 'browse',
            data: games
        })
    }
</script>

{#each games as game}<!-- Looper gjennom spilliste -->
    {#if game.background_image && game.short_screenshots.length > 3 }<!-- statements for å bli lagt til -->
        <article class="pointer"
            in:fly="{{y:700, duration:500}}" 
            out:fade
            on:click={(e)=>openGame(e,game.id)} 
            style="background-image:url({game.image_background || game.background_image})">
            <div class="detailsBox">
                <div>
                    <h1>{game.name}</h1>
                </div>
                <div class="details"><!-- Infoboks ved hover av article --> 
                    <div class="column">
                        <p>Platforms</p>
                        <div class="flex right">
                            {#each game.parent_platforms as platform}
                                {#if inList(platform.platform.name)}<!-- Sjekker om jeg vil ha platformen -->
                                    <div class="icons pointer"
                                        on:click={()=>
                                        getGames('platforms', platform.platform.id)}>
                                        <Fa icon={getIcon(platform.platform.name)}  />
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    </div>
                    <div class="column">
                        <p>Genres:</p>
                        <div class="right">
                            {#each game.genres as genre}<!-- Henter sjangere -->
                                <p on:click={()=>
                                    getGames('genres', genre.id)} 
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
                </div>
            </div>
        </article>
    {/if}
{:else}
    <h2>Loading</h2>
{/each}

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
    article{
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        min-height: 270px;
        min-width: 270px;
        border-radius: 10px;
        box-shadow: 0 10px 10px #111;
        display: grid;
        overflow: hidden;
    }
    article:hover .details{
        display: block;
    }
    article:hover .detailsBox{
        max-height: 100%;
    }
    .detailsBox{
        background-color: rgba(31, 31, 31, 0.908);
        align-self: end;
        padding-left: .5rem;
        padding-right: .5rem;
        cursor: default;
        max-height: 30px;
        transition: 1s;
    }
    .column p{
        font-size: .8rem
    }
    h1{
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
        cursor: pointer;
        padding: 0;
    }
    h2{
        margin: auto
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
    .details{
        display: none;
        transition: 1s
    }

</style>