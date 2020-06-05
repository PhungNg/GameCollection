<script>
    import { onMount } from 'svelte'
    import { fade } from 'svelte/transition'
    import { loaded } from '../stores/stores.js'
    import { getData } from '../utils.js'
    import { createEventDispatcher } from 'svelte';
    import Fa from 'svelte-fa'
    import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
    
    const dispatch = createEventDispatcher()
    
    export let newReleases
    let val = 0
    let ready = false
    let maxLength = window.innerWidth/4
    let gameDetails = []
    let description
    $: {newReleases.map(game => {
        getGameInfo(game.id)
    })}
    
    const changeBanner = (btn) => {
        if(btn === "next" && val != 9){ 
            val++
        }else if(btn === "next" && val == 9){
            val = 0 
        }   

        if(btn === "prev" && val != 0){
            val--
        }else if(btn === "prev" && val == 0){
            val = 10
        }

        if(btn === "prev" && val != 0)val--
        description = cutTitle()
    }
    
    const getGameInfo = (gameId) =>{
        getData(`games/${gameId}`)
            .then(json => {
                gameDetails.push(json)
                ready = true
                $loaded = true
                description = cutTitle()
            })
            .catch(err => {
                console.log(err);
        });
    }
    
    window.onresize = () => description = cutTitle()
    /* Kutter ned på desription hvis den er for lang */
    const cutTitle = () => {
        let string = gameDetails[val].description_raw
        let minLength = 250
        maxLength = window.innerWidth/4
            
        if(maxLength < minLength)maxLength = minLength
    
        if(string.length > maxLength){
           return string.substring(0, maxLength) + '...'
        }else{ 
           return string
        }
    };
    const route = (array) => {
        dispatch('route',{
            route: 'gameArticle',
            data: array,
            gamesData: newReleases[val]
        })
    }
    
</script>

    {#if ready}<!-- Hvis banner når alt er klart -->
        <div 
            in:fade="{{duration:1200}}"
            class="banner" 
            style="background-image:url({gameDetails[val].background_image})">
            
            <div class="wrapper">
                <div class="content boxShadow">
                    <h2 class="textShadow">{gameDetails[val].name}</h2><!-- Titel på spill -->
                    <p class="textShadow descriptionText">{description}</p><!-- Besrkivelse på spill -->
                    <div 
                        class="readMore pointer flex"
                        on:click={()=>route(gameDetails[val])}>
                        <p>Read more</p><!-- Les mer knapp -->
                        <p>→</p>
                    </div>
                </div>
                <div class="btnContainer centered flex">
                    <div class="next boxShadow btn" on:click={()=>changeBanner("prev")}><!-- Forrige bilde -->
                        <Fa icon={faAngleLeft} size="2x"/>
                    </div>
                    <div class="prev boxShadow btn"on:click={()=>changeBanner("next")}><!-- Neste bilde -->
                        <Fa icon={faAngleRight} size="2x"/>
                    </div>
                </div>
            </div>   
        </div>
    {/if}
<style>
    .readMore{
        justify-self: end;
    }
    .readMore p{
        margin-bottom: 0;
    }
    .readMore:hover{
        transform: scale(1.1);
    }
    .wrapper{
        align-self: center
    }
    .content{
        padding: .7rem;
        padding-left: 2.45rem;
        width: 20vw;
        overflow-wrap: break-word;
        display: grid;
        align-content: center;
        align-self: center;
        min-height: 350px;
        min-width: 220px;
        background-color: rgba(0, 0, 0, 0.5);
        transition: .3s;
    }
    .content:hover{
        background-color:  rgba(0, 0, 0, 0.8);
        padding-left: 6rem
    }
    .descriptionText{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: 300;
        font-size: 20px;
        line-height: 1.5rem;
        color: #eee;
        margin-bottom: 0;

    }
    .next:hover{
        transform: scale(1.1);
        opacity: .8;
    }
    .prev:hover{
        transform: scale(1.1);
        opacity: .8;
    }
    .btn{
        background-color: black;
        opacity: .5;
        color: white;
        padding: .2rem .7rem;
        transition: .1s;
        cursor: pointer;
    }
    .btn:active{
        transform: scale(1)
    }
    .banner{
        width: 100vw;
        height: 85vh;
        min-height: 600px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        display: grid
    }
</style>