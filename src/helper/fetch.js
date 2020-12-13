
export async function fetchCurrentPostAttributes(path) {
    return fetch(`${path}.json`).then(r => r.json()).then(attributes => {
        return attributes;
    })
}

export async function fetchAllPostData(path, page) {
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

}



