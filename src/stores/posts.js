
import { writable } from 'svelte/store';
let POSTS = [];
function postStore() {
	const { subscribe, set, update } = writable(POSTS);
	return {
		subscribe,
		add: (post) => update(posts => [...posts, post]),
		set: (posts) => set(posts)
	};
}
let Posts = postStore();
export default Posts