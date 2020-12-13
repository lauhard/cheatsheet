import { writable } from 'svelte/store';
let CURRENT_TAGS = [];
function CurrentTagsStore() {
	const { subscribe, set, update } = writable(CURRENT_TAGS);
	return {
		subscribe,
		add: (tags) => update(CURRENT_TAGS => [...CURRENT_TAGS, tags]),
		set: (CURRENT_TAGS) => set(CURRENT_TAGS)
	};
}
let CurrentTags = CurrentTagsStore();
export default CurrentTags