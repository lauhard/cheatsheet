---
title: 'Image test'
category: 'Programming'
author: 'Andreas Lauhard'
draft: true
tags: 
    - Markdown
    - Svelte
    - Blog
    - Images
---

<script>
    // export let segment;
    import Content from "./content.md";
    import Nav from "../../../components/Nav.svelte";
    import codeSnippets from '../../../components/codeSnippets.js';
    import PrismJS from "../../../components/PrismJS.svelte";
</script>

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

    ## Inside the Blog Layout before    

</div>

<div slot='after'>

    ## Inside the Blog Layout after

</div>

</Content>

<!--next-prev-navigation-->
<!-- <Nav {segment} /> -->
