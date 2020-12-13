---
layout: blog
title: 'Warum AxtHarti a schiache 🐮 is'
category: 'Psychologie'
author: 'Andreas Lauhard'
draft: false
tags: 
    - Markdown
    - Svelte
    - Blog
    - Psychologie
---
<script>
    // export let segment;
    import Content from "./content.md";
    
    import Nav from "../../../components/Nav.svelte";
    import codeSnippets from '../../../components/codeSnippets.js';
    import PrismJS from "../../../components/PrismJS.svelte";
</script>

# Content outside the blog layout 🤘

<!--Content Component -->
<Content >

<!--Named Slotst -->
<div slot='prism1'>
    <PrismJS language="javascript" code="{codeSnippets.blab}" header="js blab snippet:"/>
</div>

<div slot='prism2'>
    <PrismJS language="javascript" code="{codeSnippets.blub}" header="js blab snippet:"/>
</div>

<div slot='before'>

    ## weil er stinkt...    

</div>

<div slot='after'>

    ## Inside the Blog Layout after

</div>

</Content>

<!--next-prev-navigation-->
<!-- <Nav {segment} /> -->
