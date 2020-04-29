<script>
import { onMount } from 'svelte'

export let newReleases

let val = 0
let ready = false
$: newReleases.map(game => {
    getGameInfo(game.id)
})
let gameDetails = []
const changeBanner = (btn) => {
    if(btn === "next" && val != 5)val++
    if(btn === "prev" && val != 0)val--


    console.log(1 === '1')
    console.log(1 !== '1')


}

const getGameInfo = (gameId) =>{
    fetch(`https://rawg-video-games-database.p.rapidapi.com/games/${gameId}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
		"x-rapidapi-key": "685908fbf0msh9d953169c3a8c84p100cddjsne623eb4f7700"
	}
})
.then(response => response.json())
.then(json => {
    gameDetails.push(json)
    ready = true

})
.catch(err => {
	console.log(err);
});
}

</script>

    {#if ready}
        <div class="banner" style="background-image:url({gameDetails[val].background_image})">
            <div class="centered">
                <div class="content">
                    <h1>{gameDetails[val].name}</h1>
                    <p>{gameDetails[val].description_raw}</p>
                    <div class="btnContainer">
                        <button on:click={()=>changeBanner("prev")}>Prev</button>
                        <button on:click={()=>changeBanner("next")}>Next</button>
                    </div>
                </div>
            </div>   
        </div>
    {:else}
        <h1>Loading</h1>
    {/if}
<style>
    .centered{
        height: 100%;
        display: grid
    }
    .content{
        height: 50%;
        width: 30vw;
        align-self: center;
        display: grid;
        /* 
        display: flex;
        flex-direction: column;
        justify-content: center; */
        background-color: rgba(163, 163, 163, 0.623);
    }
    .banner{
        width: 100vw;
        height: 75vh;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center
    }
    .btnContainer{

    }
</style>