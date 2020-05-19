<script>
    import Results from './Results.svelte'
    import { fly } from 'svelte/transition'
    import { getData, getDate, } from '../utils.js'
    import { currentSearch } from '../stores/stores.js'
    import FilterMenu from './FilterMenu.svelte'
    import Fa from 'svelte-fa'
    import { faFilter } from '@fortawesome/free-solid-svg-icons'
    export let results
    scroll(0,0)
    
    let order = 'ordering=rating,added&'
    let date = `dates=${getDate(180)},${getDate(-180)}`
    let platform = ''
    let genre = ''

    $: url = `games?${order}${platform}${genre}${date}`
    $: {if(url)search()} /* kjører søk hvergang url endres */

    const search = async() => {
        results = await getData(url)
    }
    const resetQuery = () =>{
        order = ''
        date = ''
        platform = ''
        genre = ''
    }
    const checkQuery = (query, bool) => {
        if(bool != true)resetQuery()
        
        genre = query.genre ? `genres=${query.genre}&` : genre
        order = query.ordering ? `ordering=${query.ordering}&` : order
        platform = query.platform ? `parent_platforms=${query.platform}&` : platform
        date = query.date ? `dates=${query.date}` : date
    }
    const current = (e) => {
        $currentSearch = e.srcElement.children[1].innerHTML /* Hvis hva man søker på */
    }
    const filter = (e, query, bool) => {
        /* reset() */
        checkQuery(query, bool)
        showFilter()
        current(e)
        scroll(0,0)
    }
    const reset = async() => {
        results = await getData(`games?genres=&ordering=&dates`)/* Henter tom liste */
    }
    
    const showFilter = () => {
        const filterBar = document.querySelector(".filterBar");
        const filterMenu = document.querySelector(".filterMenu");
        filterBar.classList.toggle('toggle')
        filterMenu.classList.toggle('toggle') 
    }
</script>

<main class="centered">
    <h1 transition:fly="{{x:-700, duration: 1000}}" class="filterMenuTitle">
        Filter
    </h1>
    
    <div transition:fly="{{x:-200, delay:500, duration:1000}}" class="button" on:click={showFilter}>
        <Fa icon={faFilter} size="1.2x"/>
    </div><!-- Vis/skjul menu i mobil -->

    <div class="filterBar toggle" transition:fly="{{y:-300, duration: 1000}}" >
        <h1>{$currentSearch}</h1>
        <div class="flex"><!-- Select bokser -->
            <div class="selectBox">
                <p>Order by: </p>
                <select on:change={val=>checkQuery({ordering: val.target.value},true)}>
                    <option value="rating,added">Relevance</option>
                    <option value="released">Release date</option>
                    <option value="name">Name</option>
                    <option value="rating">Top rated</option>
                    <option value="created">Created</option>
                    <option value="added">Date added</option>
                </select>
            </div>
            <div class="selectBox">
                <p>Platform: </p>
                <select on:change={val=>checkQuery({platform: val.target.value},true)}>
                    <option value="1">PC</option>
                    <option value="2">Playstation</option>
                    <option value="3">Xbox</option>
                    <option value="4">iOS</option>
                    <option value="8">Android</option>
                    <option value="7">Nintendo</option>
                </select>
            </div>
        </div>
    </div>
    <div transition:fly="{{x:-700, duration: 1000}}" class="filterMenu toggle">
        <FilterMenu filter={filter}/> <!-- Side meny -->
    </div>
    <div transition:fly="{{y:2000, duration:1000}}" class="resultList">
        {#if results}
            <Results on:route results={results}/> <!--  -->
        {/if}
    </div>
</main>

<style>
    @media(max-width: 1060px){
        main{
            grid-template-columns: 1fr
        }
        .toggle{
            display: none
        }
        .button{
            position: fixed;
            background-color: #333;
            padding: .5rem 1rem;
            opacity: .9;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }
        .filterMenu, .filterBar{
            position: fixed;
        }
        .filterBar{
            background-color: black;
        }
        .filterMenu{
            top: 8rem;
            background-color: black;
            overflow: scroll;
            max-height: 80%;
            width: 243px;
        }
        .filterMenuTitle{
            display: none
        }
        .button:hover{
            opacity: 1;
            z-index: 10;
        }
    }
    @media(min-width: 1060px){
        main{
            display: grid;
            grid-template-columns: 1fr 6fr;
            gap: 1rem
        }
        .button{
            display: none
        }
    }
    .filterMenuTitle{
        align-self: end;
    }
    .filterMenu{
        padding-bottom: .7rem;
    }
    p{
        margin:0
    }
</style>