<script>
    import Search from './Search.svelte'
    import { createEventDispatcher } from 'svelte';
    import { fly, fade } from 'svelte/transition'
    import { auth, googleProvider } from "../firebase.js";
	import { authState } from "rxfire/auth";
    import { db } from '../firebase.js'
    import { loggedIn, uid } from '../stores/stores.js'
    
    const dispatch = createEventDispatcher()
	const users = db.collection('users')
	const unsubscribe = authState(auth).subscribe(u => (user = u));

    let searchIsOpen = false
    let user
    $: $loggedIn = user ? true : false
    $: $uid = user ? user.uid : ''

	const login = async() => {
        await auth.signInWithPopup(googleProvider);
        checkIfNewUser()
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
    <div class="centered flex">
        <img class="logo pointer" on:click={()=>route('home')} src="https://scontent.fosl4-2.fna.fbcdn.net/v/t1.15752-9/83159897_257926908623638_7548701435592966144_n.png?_nc_cat=101&_nc_sid=b96e70&_nc_ohc=5K9aCZMnrW4AX8B4NXD&_nc_ht=scontent.fosl4-2.fna&oh=508b2dc573ac8d600c49f02c117c3508&oe=5EFC61D4" alt="">
        <p on:click={()=>route('browse')}>Browse</p> 
        <p style="pointer-events: none">|</p>
        <p on:click={search}>Search</p>

        <div style="margin-left: auto">   
            {#if user}
                <p class="username">{user.displayName}</p>
                <div class="right">
                    <img class="profileImg pointer" src="{user.photoURL}" alt="profil bilde">
                    <div class="userMenu">
                        <div on:click={()=>route('wishlist')}>Wishlist</div>
                        <div on:click={logout}>Log out</div>
                    </div>
                </div>
            {:else}
                <p on:click={login}>Login</p>
            {/if}
        </div>
    </div>
    {#if searchIsOpen}
        <Search on:route on:close={search}/>
    {/if}
</header>

<style>

    header{
        z-index: 10;
        display: none;
        position: fixed;
        width: 100%;
        top: 0;
        background-color: darkgoldenrod;
        color: #eee;
        height: 44px;
        box-shadow: 0 0 5px 1px black
    }
    .right{
        position: relative;
    }
    .userMenu{
        background-color: darkgoldenrod;
        display: grid;
        position: absolute;
        top: 100%;
        right: 0;
        min-width: 130px;
        max-height: 0%;
        display: none;
        padding-top: .5rem
    }
    .userMenu div{
        padding: .5rem;
        cursor: pointer;
        display: grid;
        justify-content: end;
        /* background-color: rgba(34, 34, 34, 0.8); */
        background-color: darkgoldenrod;
        border-top: 1px solid black
    }
    .userMenu div:hover{
        background-color: rgba(51, 51, 51, 0.8);
    }
    .userMenu div:active{
        font-size: 15px;
        color: rgb(202, 202, 202)
    }
    .profileImg:hover + div{
        display: block
    }
    .userMenu:hover{
        display: block
    }
    header div{
        display: flex;
    }
    .toggleHeader{
        display: block;
    }
    .logo{
        width: 15rem;
        min-width: 150px;
        margin-right: 2rem
    }
    .centered{
        padding:.5rem;
        height: 60%
    }
    .centered div, p{
        align-self: center 
    }
    p{
        margin: 0;
        margin-right: .5rem
    }
    p:hover{
        color: red;
        cursor: pointer;
    }
    .profileImg{
        height: 30px;
        width: 30px;
        border-radius: 50%
    }
    @media(max-width: 1060px){
        .username{
            display: none
        }
        .centered{
            margin: 0
        }

    }
    @media(max-width: 500px){
        .logo{
            display: none
        }
    }
</style>