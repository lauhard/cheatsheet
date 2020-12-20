<script>
    import { stores } from '@sapper/app';
    import { onMount, setContext } from 'svelte';
    import utils from '../../helper/utils';
    import Posts from '../../stores/posts';
    import Tags from '../../stores/tags';
    import Filtered from '../../stores/filteredPosts';
    import CurrentTags from '../../stores/currentTags';
    import { fetchAllPostData, fetchCurrentPostAttributes } from '../../helper/fetch';
    import Header from "../../components/Header.svelte";
    import Button from "../../components/Button.svelte";
    const { page, preloading } = stores();
    // export let segment;

    export let data;
    export let tags = [];
    export let posts = [];
    export let currentPost = [];
    export let currentTags = [];
    export let filteredPosts = [];

    onMount(  async () => {
        if ($Posts.length == 0) {
            let fixedPath = $page.path
            console.log(fixedPath);
            if (fixedPath.charAt(fixedPath.length -1) === '/') {
                fixedPath = fixedPath.slice(0, -1);
            }
            data = await fetchAllPostData('blog', fixedPath)
            console.log(data)
            tags = data.tags;
            posts = data.posts;
            currentPost = data.currentPost;
            currentTags = data.currentPost.tags;
            CurrentTags.set(currentTags);
        } 
        else {
            let fixedPath = $page.path
            console.log(fixedPath);
            if (fixedPath.charAt(fixedPath.length -1) === '/') {
                fixedPath = fixedPath.slice(0, -1);
            }
            data = await fetchAllPostData('blog', fixedPath)
            currentPost = data;
            currentTags = data.tags;
            CurrentTags.set(currentTags);
            posts = $Posts;
            tags = $Tags;
        }
    });
    function getTag(event) {
        console.log(event.detail.text);
        filteredPosts= utils.filterPostsByTag(posts, event.detail.text);
        filteredPosts.filter = event.detail.text;
        filteredPosts.by = "tag";
        Filtered.set(filteredPosts);
	}
</script>

<!--NOTE html -->
{#each tags as tag}
    <Button  tag = "{tag}" on:tag={getTag} >
        <a  href='blog'>{tag}</a>
    </Button>   
{/each}
<Header post="{currentPost}" on:tag={getTag}/>
<main>  
    <!--slot for blog-->
    <slot />
</main>
<!--NOTE html -->

<!--NOTE style -->
<style>
    main {
        position: relative;
        max-width: 56em;
        background-color: white;
        margin: 0 auto;
        padding: 1.5em;
        box-sizing: border-box;
    }
</style>
<!--NOTE style -->