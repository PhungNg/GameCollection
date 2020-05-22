<script>
    import Fa from 'svelte-fa'
    import { createEventDispatcher } from 'svelte'
    import {fly, fade, slide} from 'svelte/transition'
    import { getData, inList, getIcon } from '../utils.js'
    import GameDetailsonHover from './GameDetailsonHover.svelte'
    import { faHeart } from '@fortawesome/free-solid-svg-icons'
    import { faHeart as farFaHeart} from '@fortawesome/free-regular-svg-icons'
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
            <div class="wishlistIcon">
                <Fa icon={farFaHeart} />
            </div>
            <div class="detailsBox">
                <div>
                    <h1>{game.name}</h1>
                </div>
                <div class="details">
                    <GameDetailsonHover game={game}/>
                </div>
            </div>
        </article>
    {/if}
{:else}
    <h2>Loading</h2>
{/each}

<style>
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
    .wishlistIcon{
        position: relative;
        top: 10%;
        left: 90%;
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
    h1{
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
        cursor: pointer;
        padding: 0;
    }
    h2{
        margin: auto
    }
    .details{
        display: none;
        transition: 1s
    }

</style>