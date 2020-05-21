<script>
    import Gallery from './Gallery.svelte'
    import { getData } from '../utils.js'
    import {fade, fly} from 'svelte/transition'

    export let gameInfo
    let screenshots = []
    let clip = []
    let duration
    let time = 0
    let volume = 0
    let paused = true
    let showControls = true
    let showControlsTimeout
    let showImg = false
    let imgSrc
    $: if(gameInfo.id){/* Kjøres hvis nytt spill har blitt klikket på */
        showImg = false
        getScreenshots()
    }
    $: if(gameInfo.clip){/* Kjøres hvis nytt spill har blitt klikket på */
        clip = {
            clipPre: gameInfo.clip.preview,
            clipFull: gameInfo.clip.clips.full
        }
        }else{
            clip = []
        }

    /* Spørr etter screenshots */
    const getScreenshots = async() => {
        screenshots = await getData(`games/${gameInfo.id}/screenshots`).then(e=>e.results)
    }

    /* ! Fiks video controller ! */
    /* Spiller av video ved hover */
    const handlemouseover = (e) => {
        if(paused) e.target.play();
    }
    /* pauser video når musa forlater */
    const handlemouseleave = (e) => {
        if(!paused) e.target.pause()
    }

    /* Henter bilde src for banner */
    const getSrc = (src) => {
        showImg = true
        imgSrc = src
    }
</script>
    {#if gameInfo.clip != null && showImg == false}<!-- Kjøres hvis spillet video -->
        <video
            in:fly="{{x:-700,delay:300, duration:1200}}"
            out:fade
            class="gameClip" 
            src="{clip.clipFull}"
            on:mouseover={handlemouseover}
            on:mouseleave={handlemouseleave}
            bind:volume
            bind:paused>
        </video>
    {:else if showImg == true}<!-- Bilder som klikkes på fra galleriet -->
        <div class="gameClip">
            <img src={imgSrc} alt="galleryImg">
        </div>
    {:else}<!-- Hvis video ikke finnes -->
        <div transition:fade style="background-image:url({gameInfo.background_image})" class="gameClip"/>
    {/if}
    <div 
        in:fly="{{x:700, delay:300, duration:1200}}" 
        out:fade
        class="gallery">
        {#if screenshots}
            <Gallery clip={clip} getSrc={getSrc} screenshots={screenshots}/><!-- Gallery component -->
        {:else}
            <h1>Loading</h1>
        {/if}
    </div>

<style>
    @media (min-width: 1060px){
       
        .gallery{
            display: grid;
            gap: 10px;
        }

    }
    @media (max-width: 1060px){
        .gallery{
            display:flex;
            padding: .5rem 0;
        }
    }
    img{
        width: 100%;
        align-self: center
    }
    .gameClip{
        width: 100%;
        border-radius: 5px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        display: grid;
        background-color: black;
    }
    .gallery{
        border-radius: 5px;
        overflow: scroll;
    }
</style>