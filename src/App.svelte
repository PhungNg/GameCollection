<script>
  import { onMount } from "svelte";
  import Games from "./components/Games.svelte";
  import Header from "./components/Header.svelte";
  import Banner from "./components/Banner.svelte";
  import Browse from "./components/Browse.svelte";
  import Results from "./components/Results.svelte";
  import GameArticle from "./components/GameArticle.svelte";
  import Wishlist from "./components/Wishlist.svelte";
  import { loaded } from "./stores/stores.js";
  import { getData, getDate } from "./utils.js";

  let page = "home";
  let newReleases = [];
  let trendingGames = [];
  let data = [];

  /* Tar imot data fra all dispatches og sender de videre */
  const route = e => {
    if (e.detail.route != page) $loaded = false;
    page = e.detail.route;
    data = e.detail.data;
  };
  /* Henter data for banner */
  const getNewReleases = async () => {
    const query = `games?ordering=rating,added&page_size=10&dates=${getDate(
      0
    )},${getDate(-365)}`;
    newReleases = await getData(query).then(e => e.results);
  };
  /* Henter data for grid */
  const getTrending = async () => {
    const query = `games?page_size=20&ordering=rating,added&dates=${getDate(
      180
    )},${getDate(-180)}`;
    trendingGames = await getData(query);
  };

  onMount(async () => {
    getNewReleases();
    getTrending();
  });
</script>

<style>
  h1 {
    padding: 1rem;
    padding-left: 0;
  }
  main {
    padding-bottom: 15rem;
  }
</style>

<Header on:route={route} />
<div style="margin-top:2.7rem">
  {#if page == 'home'}
    <Banner on:route={route} {newReleases} />
    {#if $loaded}
      <main class="centered">
        <h1>New and trending games</h1>
        <Results on:route={route} results={trendingGames} />
      </main>
    {/if}
  {/if}
  {#if page == 'gameArticle'}
    <GameArticle gameInfo={data} on:route={route} />
  {/if}
  {#if page == 'browse'}
    <Browse on:route={route} results={data} />
  {/if}
  {#if page == 'wishlist'}
    <Wishlist on:route={route} />
  {/if}
</div>
