<script>
    import { createEventDispatcher } from 'svelte';
    import Fa from 'svelte-fa'
    import { fly } from 'svelte/transition'
    import { faSearch } from '@fortawesome/free-solid-svg-icons'
    import Search from './Search.svelte'
    
    const dispatch = createEventDispatcher()
    let searchIsOpen = false

    const route = (val) => {
        dispatch('route',{
            route: val
        })    
    }

    const search = () => {
        searchIsOpen = !searchIsOpen
    }
</script>
<header class="toggleHeader">
    <div class="centered">
        <div>
            <p on:click={()=>route('home')}>Home</p>
            <p on:click={()=>route('browse')}>Browse</p>
        </div>
        <div>
            {#if searchIsOpen}
                <Search on:route on:close={search}/>
            {/if}
            <div class="search" on:click={search}>
                <Fa icon={ faSearch } />
            </div>
            <p style="pointer-events: none">|</p>
            <p on:click={route}>Login</p>
        </div>
    </div>
</header>

<style>
    .toggleHeader{
        display: block;
    }
    .centered{
        padding:.5rem;
        justify-content: space-between;
        height: 60%
    }
    .centered div, p{
        align-self: center 
    }
    .search{
        cursor: pointer;
        align-items: center;
        margin-right: 5px
    }
    header{
        z-index: 10;
        display: none;
        position: fixed;
        width: 100%;
        top: 0;
        background-color: rgb(0, 0, 0);
        color: #eee;
        height: 44px;
    }
    header div{
        display: flex;
    }
    p{
        margin: 0;
        margin-right: .5rem
    }
    .search:hover{
        color: red;
    }
    p:hover{
        color: red;
        cursor: pointer;
    }
</style>