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
<form on:submit|preventDefault={getGames}>
    <input 
        transition:fly="{{y: -200, duration: 500}}" 
        type="search" 
        bind:value={searchFieldValue} 
        placeholder="Search for games..."
        name="q"
        incremental 
        on:focusout={closeSearch}
        autofocus>
</form>

<style>
@media(max-width: 1060px){
    input{
        width: 97%
    }
}
    input{
        margin: 0;
        margin-right: .5rem;
        outline: none;
        align-self: center
    }
    form{
        display: grid;
        align-items: center
    }
</style>