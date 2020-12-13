<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import Posts from '../stores/posts';

    export let tag;

    const dispatch = createEventDispatcher();
    function returnTag() {
        dispatch('tag', {
            text: tag
        });
    }

</script>

<svelte:head>
    <!-- head content -->
</svelte:head>

<!-- html -->
<button on:click={ returnTag }>
	<slot></slot>
</button>

<!-- styl -->
<style>
    
</style>