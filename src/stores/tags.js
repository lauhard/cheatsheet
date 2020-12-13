import { writable } from 'svelte/store';
let TAGS = [];
function tagStore() {
	const { subscribe, set, update } = writable(TAGS);
	return {
		subscribe,
		add: (tag) => update(tags => [...tags, tag]),
		set: (tags) => set(tags)
	};
}
let Tags = tagStore();
export default Tags