<script>
    import {fade, fly} from 'svelte/transition'
    import { getData } from '../utils.js'
    import { createEventDispatcher } from 'svelte';
    import { currentSearch } from '../stores/stores.js'

    const dispatch = createEventDispatcher()
    let searchFieldValue = ''
    let data
    
    /* Søk på spill */
    const getGames = async() => {
        data = await getData(`games?search=${searchFieldValue}`)
        $currentSearch = searchFieldValue 
        dispatch('route',{
           route: 'browse',
            data: data
       })

    }
    /* Lukk searchfield */
    const closeSearch = () => {
        dispatch('close')
    }
</script> 
<form class="centered" on:submit|preventDefault={getGames}>
    <input 
        transition:fade
        type="search" 
        bind:value={searchFieldValue} 
        placeholder="Search for games..."
        name="q"
        incremental 
        on:focusout={closeSearch}
        required>
</form>

<style>
    input{
        margin: 0;
        outline: none;
    }
    
    form{
        display: grid;
        align-items: center;
        margin-top: .5rem;
    }
    @media(max-width: 1060px){
        input{
            width: 97%
        }
    }
</style>