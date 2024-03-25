<script>
    import { scale } from 'svelte/transition';
    
     /**
     * @type {() => any}
     */
      export let DialogAlert
    /**
     * @type {any}
     */
     export let showDeleteModal
  

          /**
     * @type {(arg0: any) => any}
     */
           export let OnDelete
     /**
     * @type {any}
     */
      export let inhalt


      async function handledelete() {
    
        await OnDelete(inhalt)
        DialogAlert()
      }
</script>


{#if  showDeleteModal}
<dialog transition:scale|global open>
    <div >
        <!-- Hier kannst du den Inhalt deines Modals platzieren -->
        <p>Möchten Sie wirklich die Person löschen.</p>
        <div class="auswahl">
            <button class="button-ok" on:click={() => DialogAlert()}>Nein</button>
            <button class="button-no" on:click={() => handledelete()} >Ja</button>
        </div>
      </div>
</dialog>
    
{/if}

<style>
.button-ok{
    background: green;
}
.button-no{
    background: red;
}
.auswahl{
    gap: 5px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
}
dialog{
    background: rgba(104, 98, 137, 0.95);
    border-radius: 10px;
    position: absolute;
    top: 50vh;
}

</style>