<script>
    import GameDetailsonHover from './GameDetailsonHover.svelte'
    import Fa from 'svelte-fa'
    import { createEventDispatcher } from 'svelte'
    import { fly, fade } from 'svelte/transition'
    import { getData } from '../utils.js'
    import { faHeart } from '@fortawesome/free-solid-svg-icons'
    import { faHeart as farFaHeart} from '@fortawesome/free-regular-svg-icons'
    import { db } from '../firebase.js'
    import { uid } from '../stores/stores.js'
    import { toggleHeartIcon, checkIfExists } from '../utils.js'
    
    export let games

    const dispatch = createEventDispatcher()
    const users = db.collection('users')
    let added
    let usersData
    let usersWishlist
    $: wishlistReady = usersWishlist ? true : false
    $: if($uid != '')getWishlist()

    const getWishlist = async() => {
        users.doc($uid).onSnapshot(snap => {
            usersWishlist = snap.data().wishlist
        })
    }
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
        {#if game.background_image && game.short_screenshots.length > 3 }<!-- arguments for å bli lagt til -->
            <article class="pointer"
                in:fly="{{y:700, duration:500}}" 
                out:fade
                on:click={(e)=>openGame(e,game.id)} 
                style="background-image:url({game.image_background || game.background_image})">
                {#if wishlistReady}
                    <div class="wishlistIcon" >
                        <div transition:fade class='{checkIfExists(usersWishlist,game.id) ? 'fill' : ''}' 
                            on:click|stopPropagation={(e)=>toggleHeartIcon(usersWishlist, $uid, game, e)}>
                            <span class="tooltiptext">{checkIfExists(usersWishlist,game.id) ? 'Remove from' : 'Add to'} Wishlist</span>
                            <Fa style="pointer-events: none" icon={faHeart} size='1.5x'/>
                        </div>
                    </div>
                {/if}
                <div class="detailsBox">
                    <div>
                        <h1>{game.name}</h1>
                    </div>
                    <div class="details">
                        <GameDetailsonHover on:route game={game}/>
                    </div>
                </div>
            </article>
        {/if}
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
    .details{
        display: none;
        transition: 1s
    }

</style>