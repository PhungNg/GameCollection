<script>
    import { db } from '../firebase.js'
    import { uid } from "../stores/stores.js";
    import { fade } from 'svelte/transition'
    import Games from './Games.svelte'
    const users = db.collection('users')

    let wishlist = []
    
    users.doc(`${$uid}`).onSnapshot(snap => {
        wishlist = snap.data().wishlist
    })

</script>

<main class="centered">
    <h1>Your wishlist</h1>
    <div class="grid">
        <Games games={wishlist}/>
    </div>
    {#if wishlist.length == 0}
        <h3 in:fade='{{delay: 500}}'>You have no games on your wishlist</h3>
    {/if}
</main>
<style>
    .grid{
        grid-template-columns: 1fr 1fr;
    }
    h1{
        margin: 1rem 0rem
    }
    @media(max-width: 730px){
        .grid{
            grid-template-columns: 1fr
        }
    }
</style>