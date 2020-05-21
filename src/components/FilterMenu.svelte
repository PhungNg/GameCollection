<script>
    import { getData, getDate, inList, getIcon } from '../utils.js'
    import Fa from 'svelte-fa'
    import { onMount } from 'svelte'
    import { faStepForward, faBullhorn, faFastForward, faFastBackward, faStar, faFire, faPlusSquare, faMinusSquare, faGamepad, faCrown, faTrophy } from '@fortawesome/free-solid-svg-icons'
    export let filter 
    
    let platforms = []
    let genres = []

    const getPlatforms = async() => {
        platforms = await getData(`platforms/lists/parents`).then(e=>e.results)
    }
    const getGenres = async() => {
		genres = await getData('genres').then(e=>e.results)
	}
    onMount(() => {
        getPlatforms()
        getGenres()
    })

</script>
<div class="tab"><!-- 1.tab -->
    <h2>New & Trending</h2>
    <div 
        class="tabItem"
        on:click={(e)=>filter(e,
        {
            ordering: 'rating,added', 
            date: `${getDate(0)},${getDate(-365)}`
        },true)}>
        <div class="tabIcon">
            <Fa icon={faFire} size="1.2x"/>
        </div>
        <p>Top trending</p>
    </div>
    <div 
        class="tabItem"
        on:click={(e)=>filter(e,
        {
            date:`${getDate(30)},${getDate(0)}`
        })}>
        <div class="tabIcon">
            <Fa icon={faFastBackward} size="1.2x"/>
        </div>
        <p>Last 30 days</p>
    </div>
    <div 
        class="tabItem"
        on:click={(e)=>filter(e,
        {
            date:`${getDate(7)},${getDate(0)}`
        })} >
        <div class="tabIcon">
            <Fa icon={faBullhorn} size="1.2x"/>
        </div>
        <p>This week</p>
    </div>
    <div 
        class="tabItem"
        on:click={(e)=>filter(e,
        {
            date:`${getDate(0)},${getDate(-7)}`
        })} >
        <div class="tabIcon">
            <Fa icon={faStepForward} size="1.2x"/>
        </div>
        <p>Next week</p>
    </div>
    <div 
        class="tabItem"
        on:click={(e)=>filter(e,{date:`${getDate(0)},${getDate(-30)}`})}>
        <div class="tabIcon">
            <Fa icon={faFastForward} size="1.2x"/>
        </div>
        <p>Next 30 days</p>
    </div>
</div>
<div class="tab"><!-- 2.tab -->
    <h2>Top releases</h2>
    <div 
        class="tabItem"
        on:click={(e)=>filter(e,
        {
            ordering:'rating,added',
            date:`${getDate(365)},${getDate(0)}`
        })}>
        <div class="tabIcon">
            <Fa icon={faStar} size="1.2x"/>
        </div>
        <p>This year</p>
    </div>
    <div 
        class="tabItem"
        on:click={(e)=>filter(e,
        {
            ordering:'rating,added',
            date:`${getDate(30)},${getDate(0)}`
        })}>
        <div class="tabIcon">
            <Fa icon={faCrown} size="1.2x"/>
        </div>
        <p>This month</p>
    </div>
    <div 
        class="tabItem"
        on:click={(e)=>filter(e,{ordering:'rating,added'})}>
        <div class="tabIcon">
            <Fa icon={faTrophy} size="1.2x"/>
        </div>
        <p>This week</p>
    </div>
</div>
<div class="tab"><!-- 3.tab -->
    <h2>Platforms</h2>
    {#each platforms as platform}
        {#if inList(platform.name, platform.id)}
            <div 
                class="tabItem"
                on:click={(e)=>filter(e,{platform: platform.id, date:''})} >
                <div class="tabIcon">
                    <Fa icon={getIcon(platform.name)} size="1.2x"/>
                </div>
                <p>{platform.name}</p>
            </div>
        {/if}
    {/each}
</div>
<div class="tab genres"><!-- 4.tab -->
    <h2>Genres</h2>
    {#each genres as genre}
        <div 
            class="tabItem"
            on:click={(e)=>filter(e,
            {
                genre:genre.id, 
                ordering:'rating,added', 
                date:`${getDate(365)},${getDate(0)}`
            })} >
            <div class="tabIcon" style="background-image: url({genre.image_background})" />
            <p>{genre.name}</p>
        </div>
    {/each}
</div>

<style>
    .tab{
        margin-bottom: .8rem;
        overflow: hidden
    }
    .tab h2, p{
        pointer-events: none
    }
    .tabItem{
        display: flex;
        margin: .5rem;
        margin-left: 0;
        align-items: center;
        cursor: pointer;
    }
    .tabIcon{
        width: 20px;
        height: 20px;
        background-color: #333;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: .5rem;
        padding:.5rem;
        background-size: cover;
        background-position: top;
        pointer-events: none
    }
</style>