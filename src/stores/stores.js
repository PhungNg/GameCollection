import { writable } from 'svelte/store'

export const loaded = writable(false) /* Sjekker om banner er lastet ferdig */
export let currentSearch = writable('Top trending') /* Variabel som viser nåværende søk */