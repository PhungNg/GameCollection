<script>
	import { onMount } from 'svelte'
	import Article from './component/Article.svelte'
	import Header from './component/Header.svelte'
	import Footer from './component/Footer.svelte'
	import Banner from './component/Banner.svelte'
	import Genres from './component/Genres.svelte'

	let param
	let listOfGames = []
	let gameId;
	let gameGenre;
	let genreId;
	let platformID;
	let gameTags;
	let newReleases = []
	let listOfGenres = []
	let listOfPsGames = []

	const url = `https://rawg-video-games-database.p.rapidapi.com/`
	let date = new Date()

	const getDate = (num) => {
		let previousDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - num).toJSON().slice(0,10)
		return previousDate
	}

	const getNewReleases = async() => {
		const query = `games?page_size=6&dates=${getDate(90)},${getDate(0)}`
		newReleases = await getData(query)
	}
	const getGenres = async() => {
		const query = `genres`
		listOfGenres = await getData(query)
	}
	const getPsGames = async() => {
		const query = `games?page_size=10&parent_platforms=2`
		listOfPsGames = await getData(query)
		console.log(listOfPsGames)
	}
	const getData = async(query) => {
		let res = await fetch(url+query, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
				"x-rapidapi-key": "685908fbf0msh9d953169c3a8c84p100cddjsne623eb4f7700"
			}
		})
		.then(response => response.json())
		.then(json => {
			return json.results
		})
		.catch(err =>console.log(err))

		return res
	}

	onMount(() => {
		getNewReleases()
		getGenres()
		getPsGames()
	})

</script>

<Header />
{#if newReleases}
	<Banner newReleases={newReleases}/>
{:else}
	<h1>Loadinfg</h1>
{/if}

<main>
	<h1>Genres</h1>
	<div class="genres">
		<Genres genres={listOfGenres} />
	</div>
	<div class="playstation">
		<div class="mask">
			<div class="centered">
			<h1>Playstation</h1>
			</div>
			<div class="centered title">
				<Article games={listOfPsGames}/>
			</div>
		</div>
	</div>
	<div class="">
	</div>
</main>
<Footer />

<style>
	.title{
		overflow: scroll;
		display: flex
	}
	div{
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
	}
	main{
		height: 100vh;
		width: 80vw;
		margin: auto
	}
	.genres{
		overflow: scroll;
		display: flex;
	}
	.playstation{
		background-image: url(https://media.playstation.com/is/image/SCEA/flow?$native_xxl_nt$);
		background-size: cover;
		background-position: center;
		width: 100vw;
		position: absolute;
		left: 0;
	}
	.mask{
		background-image: linear-gradient(#222, rgba(0, 123, 223, 0.151), #222);
		height: 100%;
	}
	h1{
		padding-top: 1rem
	}
</style>