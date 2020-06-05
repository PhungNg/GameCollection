import { writable } from 'svelte/store'

export const loaded = writable(false) /* Sjekker om banner er lastet ferdig */
export let currentSearch = writable('Top trending') /* Variabel som viser nåværende søk */
export let loggedIn = writable(false) /* Sjekker om bruker er logget inn */
export let uid = writable('') /* google id */