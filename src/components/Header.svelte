<!--NOTE script-->
<script >   
    import { onMount } from 'svelte';
    import CurrentTags from '../stores/currentTags';
    import Button from '../components/Button.svelte';
    
    export let post;
    export let tags;
    $: tags = $CurrentTags;

    onMount(async ()=>{
        console.log("header mounted...")
    })
</script>
<!--NOTE script-->

<!--NOTE html -->
<header>
    <h1>{post.title}</h1>   
    <span class="author">by <strong>{post.author}</strong></span><br><br>
    <span> Category: {post.category}</span><br>

    {#each tags as tag}
        <Button  tag = "{tag}" on:tag>
            <a  href='blog'>{tag}</a>
        </Button>
    {/each}

    <section>
        <p>📅 {post.creationDate}</p>
        <p>✏️ {post.modificationDate}</p>
        <p>🕝 ~ {post.readingTime} min. </p>
    </section>

    <!--slot for nav-->
    <slot><!-- optional fallback --></slot>
</header>
<!--NOTE html -->

<!--NOTE style -->
<style>
    header{
        width: 100%;
        margin: 0;
        padding: 1.5em;
        background-color: #8ee8ffd5;
        height: auto;
    }
    header > section {
        margin-top: 30px;
    }
    section p{
        margin:0;
    }
</style>
<!--NOTE style -->
