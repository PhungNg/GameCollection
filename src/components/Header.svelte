<script>
    import Fa from 'svelte-fa'
    import Search from './Search.svelte'
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition'
    import { faSearch } from '@fortawesome/free-solid-svg-icons'
    import { auth, googleProvider } from "../firebase.js";
	import { authState } from "rxfire/auth";
    import { db, fire } from '../firebase.js'
    import { loggedIn } from '../stores/stores.js'
    
    const dispatch = createEventDispatcher()
	const users = db.collection('users')
	const unsubscribe = authState(auth).subscribe(u => (user = u));

    let searchIsOpen = false
    let user
    $: $loggedIn = user ? true : false

	const login = async() => {
        await auth.signInWithPopup(googleProvider);
        checkIfNewUser()
        $loggedIn = true
  	};
	const checkIfNewUser = () => {
        users.doc(user.uid).get()
            .then(doc => {
                if(!doc.exists){
                    users.doc(user.uid).set({
                        wishlist: [],
                        name: user.displayName,
                        email: user.email
                    })
                }
            })
    }
	const logout = () => {
        auth.signOut();
  	};

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
            {#if user}
                <p class="username">{user.displayName}</p>
                <img class="pointer" src="{user.photoURL}" on:click={logout} alt="">
            {:else}
                <p on:click={login}>Login</p>
            {/if}
        </div>
    </div>
</header>

<style>
@media(max-width: 1060px){
    .username{
        display: none
    }
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
    .search:hover{
        color: red;
    }
    p{
        margin: 0;
        margin-right: .5rem
    }
    p:hover{
        color: red;
        cursor: pointer;
    }
    img{
        height: 30px;
        width: 30px;
        border-radius: 50%
    }
</style>