import { writable } from 'svelte/store';
let FILTERED = [];
function FilteredPostStore() {
	const { subscribe, set, update } = writable(FILTERED);
	return {
		subscribe,
		add: (post) => update(FILTERED => [...FILTERED, post]),
		set: (FILTERED) => set(FILTERED)
	};
}
let Filtered = FilteredPostStore();
export default Filtered