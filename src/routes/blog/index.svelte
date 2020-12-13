<script context="module">
    import Posts from '../../stores/posts';
    import Filtered from '../../stores/filteredPosts';
    import Tags from '../../stores/tags';
    import utils from '../../helper/utils';
    import { onMount, getContext, beforeUpdate, afterUpdate } from 'svelte';
    import Button from "../../components/Button.svelte";
    import { flip } from 'svelte/animate';
	import { quintIn, quintOut, quintInOut } from 'svelte/easing';

	export async function preload(page, session) {
        console.log("index mounted...")
        let data = {};
        let host = page.host;
        let isLocal = host.split(':')[0].toString() === 'localhost';
        let posts = await this.fetch('blog.json').then(res => res.json());
        data.isLocal = isLocal;
        data.posts = posts;
        return { data };
    }
</script>

<script>
    console.log("index loaded...")
    export let data;  
    export let isLocal;  
    export let tags = [];
    export let posts = [];
    export let info;

    function getTag(event) {
        let filteredPosts= utils.filterPostsByTag($Posts, event.detail.text);
        filteredPosts.filter = event.detail.text;
        filteredPosts.by = "tag";
        Filtered.set(filteredPosts);
    }
    onMount(  async () => {
    });
    beforeUpdate((e) => {
	});
	afterUpdate((e) => {
    });
    $: isLocal = data.isLocal;  
    $: {
        if ($Filtered.length > 0) {
            posts = $Filtered;
            let filter = posts.filter;
            let by = posts.by;
            info = `Post filtered by ${by}: "${filter}"`;
        } else {
           posts = data.posts;
           Posts.set(data.posts);
           info = "Recent Posts"
        }
    }
    if($Tags.length == 0) {
        tags = utils.getTags(data.posts);
        Tags.set(tags);
    } else {
        tags = $Tags;
    }

</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

{#each tags as tag}
<Button  tag = "{tag}" on:tag={getTag}>
   <a class="btn" href="/blog"> {tag} </a> 
</Button>
{/each}

<h1>{info}</h1>
<div class="container">
    {#each posts as post (post.slug)}
        <div animate:flip="{{delay: 10, duration: 450, easing: quintInOut}}">
            {#if isLocal == true && post.draft == true || post.draft == false }
                <a rel="prefetch" href='/blog/{post.slug}' class="blogpost-card">
                    <div>{post.title}</div>
                    <div>{post.author}</div>
                    <div>{post.creationDate}</div>
                    {#if post.draft == true }
                        <span style="background:tomato"> DRAFT </span>
                    {/if} 
                </a>
            {/if}
        </div>
	{/each}
</div>

<style>
    .container {
        width:100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
    .blogpost-card {
        background-color: greenyellow;
        width: 250px;
        height: 250px;
        margin: 3px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>