import Posts from '../stores/posts';
import { get } from "svelte/store";
import { set } from "svelte/store";
export async function fetchCurrentPostAttributes(path) {
    try{
        return fetch(`${path}.json`).then(r => r.json()).then(attributes => {
            return attributes;
        })
    }catch(e) {
        /**FIXME
         * serviceworker fetch throws an rejection warning ....
         */
        // console.log(e.message);
        // return this.error(r.status, e.message);
    }
}

export async function fetchAllPostData(path, page) {
    try{
        return fetch(`${path}.json`).then(r => r.json()).then(posts => {
            let data = {}
            let tagList = [];
            let currentPost = null;
            for (const post of posts) {
                console.log(page)
                if (page.includes(post.slug))
                    currentPost = post;
                    
                tagList.push(...post.tags)
            }
            var distags =  tagList.filter((e, i, o) => o.indexOf(e) === i);
            data.tags = distags;
            data.currentPost = currentPost;
            data.posts = posts;
            Posts.set(posts);
            console.log(data)
            return data;
        })
    }catch(e) {
        /**FIXME
         * serviceworker fetch throws an rejection warning ....
         */
        // console.log(e.message);
        // return this.error(r.status, e.message);
    }
    
}



