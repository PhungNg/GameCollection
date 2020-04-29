<script>

export let games
$: console.log(games)
</script>

{#each games as game}
    <article style="background-image:url({game.background_image})">
        <h1>{game.name}</h1>
    </article>
{/each}

<style>
    article{
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        min-height: 300px;
        min-width: 300px;
        margin: 1rem;
        margin-top: 2rem;
        margin-bottom: 4rem;
        border-radius: 10px;
    }
    h1{
        text-align: center;
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    }
    article:first-child{
        margin-left: 0;
    }
</style>