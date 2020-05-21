<script>
    import Games from './Games.svelte'
    import { createEventDispatcher } from 'svelte';
    import { getData } from '../utils.js'
    export let results
    const dispatch = createEventDispatcher()
    let loading = false
    let moreGames = true
    let filterQuery = results.next ? results.next.split('api/')[1] : moreGames = false
    let nextPageQuery = filterQuery
    let nextPage
    $: gameList = results.results

    /* Sjekker om det finnes flere pages */
    $: if(nextPage)nextPageQuery = nextPage.next ? nextPage.next.split('api/')[1] : moreGames = false
    let count = 0
    
    window.onscroll = () => {/* ! flytt denne til utils ! */
        const header = document.querySelector("header");
        /* Viser meny hvis man er helt oppe */
        if(scrollY == 0)header.classList.add('toggleHeader')
        /* Toggler av og på header */
        /* ! Skift ut remove/add med toggle() ! */
		if(scrollY > count + 200){
			count = scrollY
			if(header.classList.contains('toggleHeader')){
                header.classList.remove('toggleHeader')
            }
		}else if(scrollY < count - 50){
            count = scrollY
            if(!header.classList.contains('toggleHeader')){
                header.classList.add('toggleHeader')
            }
        }
        /* Henter flere games hvis man er på bunn */
        if((window.innerHeight + window.scrollY) >= document.body.scrollHeight 
            && loading === false && moreGames === true){ /* ! lagre variablene i stores ! */
            loading = true
            loadMore()
        }
    }
    /* Henter neste page */
    const loadMore = async() => {
        nextPage = await getData(nextPageQuery)
        gameList = gameList.concat(nextPage.results)
        loading = nextPage.next ? 
            setTimeout(function(){
                loading = false
            }, 1000)
            : false
    }
 
</script>
<main>
    <div class="grid" id="resultContainer">
        <Games on:route games={gameList} />
    </div>
    {#if loading}
        <div class="box">
            <h1 style="text-align: center">Loading...</h1><!-- må lavere -->
        </div>
    {/if}
    {#if !moreGames}
        <div class="box">
            <h1>No more games</h1>
        </div>
    {/if}
</main>

<style>
    main{
        padding-bottom: 10rem
    }
    .box{
        display: inline;
        margin: auto;
        border-radius: 15px
    }
    .box h1{
        text-align: center;
        padding: .8rem;
    }
</style>