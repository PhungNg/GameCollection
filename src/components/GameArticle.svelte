<script>
    import { getData } from '../utils.js'
    import { onMount } from 'svelte'
    import {fly, fade} from 'svelte/transition'
    import Fa from 'svelte-fa'
    import { faStar, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
    import { faStar as farFaStar} from '@fortawesome/free-regular-svg-icons'
    import Gallery from './Gallery.svelte'
    import Games from './Games.svelte'
    import Results from './Results.svelte'
    import Requirements from './Requirements.svelte'
    import Specifications from './Specifications.svelte'
    import EsrbRatings from './EsrbRatings.svelte'
    import Stores from './Stores.svelte'
    import GameArticleTopContent from './GameArticleTopContent.svelte'
    export let gameInfo
    /* 
        show/hide desc....
        Fikse video ui - play/pause/volum knapp
    */
    let suggestedGames = []
    let lessDescription = true
    let lessMinimum = true
    let fillStar = Math.round(gameInfo.rating)
    let regularStar = 5-fillStar
    let lessText = true
    $: showFullBox = lessText ? '' : 'showFullBox'
    $: if(gameInfo.id){
        scroll(0,0)
        getSuggested()
    }

    onMount(()=>{
        scroll(0,0)
        getSuggested()
    })
    const getSuggested = async() => {
        suggestedGames = await getData(`games/${gameInfo.id}/suggested`).then(e=>e.results)
    }
    
    const dateToString = (date) => {
        let string = date.toString()
        let newDate = string.slice(0,10)
        return newDate
    }
   
    const showHideText = () => {
        lessText = !lessText
    }
    
</script>

<main class="centered">

    <div class="top">
        <div class="cover">
            <div class="coverWrap">
                <GameArticleTopContent gameInfo={gameInfo} />
            </div>
        </div>
    </div>
    <div 
        in:fly="{{y:700, delay:300, duration:1200}}" 
        out:fade
        class="full" 
        style="background-image:url({gameInfo.background_image})">
        <div class="container" >
            <div class="left">
                <div class="about">
                    <div class="flex">
                        <h1>{gameInfo.name}</h1>
                        <div class="ratings flex">
                            {#each Array(fillStar) as _}
                                <Fa icon={faStar} />
                            {/each}
                            {#each Array(regularStar) as _}
                                <Fa icon={farFaStar} />
                            {/each}
                            <h5> ({gameInfo.ratings_count})</h5>
                        </div>
                    </div>
                </div>
                <div class="descriptionContainer">
                    <div on:click={showHideText} class="description pointer {showFullBox}">
                        <div class="plusIcon textShadow">
                            {#if lessText}
                                <Fa icon={faPlusSquare} size="1.2x"/>
                            {:else}
                                <Fa icon={faMinusSquare} size="1.2x"/>
                            {/if}
                        </div>
                        <div>
                            {@html gameInfo.description}
                        </div>
                    </div>
                </div>
                <Specifications gameInfo={gameInfo} on:route />
            </div>
            <div class="right">
                <div class="bottomBorder">
                    <h4>Buy at </h4>
                    <Stores stores={gameInfo.stores}/>
                </div>
                <div class="requierContainer">
                    <Requirements gameInfo={gameInfo}/>
                </div>
            </div>
        </div>
    </div>
    {#if suggestedGames}
        <div>
            <h3>Suggested games</h3>
            <div class="grid">
                <Games on:route games={suggestedGames} />
            </div>
        </div>
    {/if}

</main>

<style>
    @media (min-width: 1060px){
        .container{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5rem
        }
        main{
            display: grid;
            gap: 1rem;
        }
        .top{
            padding-top: 37%;
            position: relative;
        }
        .cover{
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            top: 0;
        }
        .coverWrap{
            display: grid;
            grid-template-columns: 4fr 2fr;
            height: 100%;
            gap: 1rem;
        }
    }
    h3{
        margin-bottom: 1rem
    }
    .full{
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top center
    }
    .container{
        border-bottom: 1px solid #444;
        background-image: radial-gradient(rgba(71, 71, 71, 0.45), #111 70%)
    }
    main{
        padding-bottom: 25rem;
    }
    
    .titleContainer{
        justify-content: space-between;
        align-items: center;
        color: black;
        padding: .5rem 0;
        background-color: white;
        border-radius: 5px;
    }
    .ratings {
        align-items: center;
        margin-left: 1rem;
    }
    .ratings h5{
        color: #777
    }
    .plusIcon{
        padding-top: 1rem
    }
    .descriptionContainer{
        display: grid;
    }
    .description{
        height: 70px;
        transition: 1s;
        display: flex;
        overflow:hidden;
    }
    .showFullBox{
        height: 100%;
    }
    
</style>

<!-- 

platform
esrb_rating

 -->