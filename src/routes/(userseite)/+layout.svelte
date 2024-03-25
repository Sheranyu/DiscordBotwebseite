<script>
    import Navleiste from "$lib/layout/navleiste.svelte";
    import Uebergang from "$lib/viewtest/uebergang.svelte";
    import { fade, fly } from "svelte/transition";

    export let data;
</script>



<div class="container">
    {#if data.login}
        <Navleiste></Navleiste>
    {/if}

    {#key data.url}
    <Uebergang></Uebergang>
    {console.log("seitenänderung")}
        <div class="inhalt-design">
            <div class="inhalt">
                <slot/>

            </div>
        </div>
    {/key}
</div>



<style>
    .container {
        display: flex;
        min-width: 95vw;
        min-height: 100vh;
        
    }

    .inhalt-design {
        
        background: #424848;
        flex-grow: 1;
    }
    .inhalt{
        transform: translateX(-17px);
    }
</style>
