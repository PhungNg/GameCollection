<script>
	import { onMount } from 'svelte'
	import Games from './components/Games.svelte'
	import Header from './components/Header.svelte'
	import Banner from './components/Banner.svelte'
	import Browse from './components/Browse.svelte'
	import Results from './components/Results.svelte'
	import GameArticle from './components/GameArticle.svelte'
	import { loaded } from './stores/stores.js'
	import { createEventDispatcher } from 'svelte'
	import { getData, getDate } from './utils.js'
	import { fade, fly } from 'svelte/transition'


	/* 
	users.doc('id').set({
		navn: 'phung'
	}) */

	/* 

		Ting å fikse: 
		- Firebase db
		- log in og bruker funksjoner
		- Filtreringen av spill kan klikke hvis man trykker for fort
		- bugs når man kommer inn på siden. Må refreshe for at det skal funke igjen
		- filtermenu design
		- kunne trykke på tags og platform når man hovrer over et spill
		- search bug. Må søke to ganger første gang man søker for å få opp riktig resultat.
		- video controller 
		- layout på mobil
		- hamburger meny i header, browser
		
	*/ 
	let page = 'home'
	let loading = true
	let openGameInfo = false
	let newReleases = []
	let trendingGames = []
	let data = []
	let scrollPos = 0

	/* Tar imot data fra all dispatches og sender de videre */
	const route = (e) => {
		if(e.detail.route != page) $loaded = false
		page = e.detail.route
		data = e.detail.data
	}
	/* Henter data for banner */
	const getNewReleases = async() => {
		const query = `games?ordering=rating,added&page_size=10&dates=${getDate(0)},${getDate(-365)}`
		newReleases = await getData(query).then(e=>e.results)
	}
	/* Henter data for grid */
	const getTrending = async() => {
		const query = `games?page_size=20&ordering=rating,added&dates=${getDate(180)},${getDate(-180)}`
		trendingGames = await getData(query)
	}
	onMount(() => {
		getNewReleases()
		getTrending()
	})
</script>
<Header on:route={route} />
<div style="margin-top:2.7rem">
	{#if page == 'loading'}
		<h1>loading</h1>
	{/if}
	{#if page == 'home'}
			<Banner on:route={route} newReleases={newReleases}/>
		{#if $loaded}
			<main class="centered">
				<h1>New and trending games</h1>
				<Results on:route={route} results={trendingGames} />
			</main>
		{/if}
	{/if}
	{#if page == 'gameArticle'}
		<GameArticle gameInfo={data} on:route={route}/>
	{/if}
	{#if page == 'browse'}
		<Browse on:route={route} results={data} />
	{/if}
</div>
<style>
h1{
	padding: 1rem;
	padding-left: 0
}
main{
	padding-bottom: 15rem
}
</style>