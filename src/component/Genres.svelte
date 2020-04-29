<script>
export let genres
</script>

{#each genres as genre}
    <article style="background-image:url({genre.image_background})">
        <div class="mask">
            <h1>{genre.name}</h1>
        </div>
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
        border-radius: 10px;
        overflow: hidden
    }
    .mask{
        background-image: linear-gradient(rgba(34, 34, 34, 0.507), #333);
        height: 100%;
    }
    h1{
        text-align: center;
        margin: 0;
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    }
    article:first-child{
        margin-left: 0;
    }
</style>