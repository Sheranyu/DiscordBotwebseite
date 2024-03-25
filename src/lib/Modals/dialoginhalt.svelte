<script>

    import { scale } from 'svelte/transition';
    import  x_bild  from "$lib/images/x_bild.png";
    import  okbild  from "$lib/images/uberpruft.png";
    import { UpdateSpruchText, DelteSpruchText } from "$lib/database/CRUD/spruch_names_functions";
    let srcdelete = x_bild
    let okbutton = okbild
    /**
     * @type {HTMLTextAreaElement}
     */
    let aktuellerinhalt;
    import { onDestroy, onMount, tick } from "svelte";
    import { setupEscapeKeyListener } from "$lib/Modals/dialogesccloser"
    
    export let showDialog = false;
    /**
     * @type {any[]}
     */
     export let dialogdata;
    
    /**
     * @type {() => any}
     */
     export let closedialog
    let data = {
        id: 0, edit: false
    }
    
 

// Verwende die Funktion aus der externen Datei
    /**
     * @type {() => void}
     */
let removeKeyListener;
onMount(() => {
  removeKeyListener = setupEscapeKeyListener(closedialog);
});
onDestroy(() => {
    // cleanup-Funktion wird aufgerufen, um den Event-Listener zu entfernen
    removeKeyListener();
  });

    /**
     * @param {{ id_text: number; }} item
     */
async function editsprachname(item) {
    data.id = item.id_text
    data.edit = !data.edit
    await tick();
    if (aktuellerinhalt) {
      // Fokussiere das Input-Feld, falls vorhanden
      aktuellerinhalt.focus();
    }
}

    /**
     * @param {{ text: any; }} params
     */
async function OnDelte(params) {
    await Animatedelete(params)
    DelteSpruchText(params)
    for (const item of dialogdata) {
       item.text_inhalt = item.text_inhalt.filter((/** @type {{ text: string; }} */ x) => x.text !== "")
    }
   
  //  dialogdata.forEach((item) => {
 // item.text_inhalt = item.text_inhalt.filter(element => element.text !== "");});

//console.log(dialogdata);
   // console.log(dialogdata);

}

    /**
     * @param {{ id_text: any; }} value
     */
async function OnOk(value){
    UpdateSpruchText(value)
    

    updateReactivity()
}
function updateReactivity() {
    dialogdata = [...dialogdata];
}

    /**
     * @param {{ text: any; }} value
     */
async function Animatedelete(value){
    const originalName = value.text;

    for (let index = originalName.length; index >= 0; index--) {
       
        value.text = originalName.slice(0,index)
        updateReactivity()
        await wait(25)
    }
    updateReactivity()
}
    /**
     * @param {number | undefined} ms
     */
async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

</script>


<dialog transition:scale  class="myDialog" open={showDialog}>
    <div class="dialogcontainer">
        <div class="Dialoginhalt">   
            {#each dialogdata as inhalt (inhalt.id)}
               
                {#each inhalt.text_inhalt as item (item.id_text)}
                
                <div class="item-body">
                    <div class="item-inhalt">
                        {item.text}
                    </div>
                   
                    <div tabindex="-1" role="button"   class="editdata" on:click={() => editsprachname(item)}>
                        🖊
                    </div>
                    
                    {#if data.id == item.id_text && data.edit == true}
                        <div class="edit-inhalt">
                            <div>
                                <textarea rows="3"  bind:this={aktuellerinhalt}  bind:value={item.text}/>
                            </div>
                            <div class="image-container">
                                <img src={srcdelete} on:click={() => OnDelte(item)} width="25px" height="25px" alt="nope">
                            </div>
                            <div class="image-container">
                                <img src={okbutton} width="25px" on:click={() => OnOk(item)} height="25px" alt="nope">
                            </div>
                        </div>
                    {/if}
                </div>
                {/each}
            {/each} 
        </div>
        <button class="closebutton"  on:click={() => closedialog()}>Schließen</button>
        
    </div>
</dialog> 


<style>





.image-container{
    text-align: center;
    transition: transform 0.2s;
    transform: scale(1);
}
.image-container:hover{
    transform: scale(1.05);
}
.image-container:active{
    transform: scale(0.9);
}
.edit-inhalt{
    
   display: grid;
    grid-template-columns: 1fr 0.2fr 0.2fr; /* Drei Spalten für Input, Bild, Bild */
    
    gap: 5px; /* Abstand zwischen den Elementen */
    align-items: center;
    grid-column: span 2;
    
}
.editdata{
    margin: auto;
}
.editdata:hover{
    transform: scale(1.1);
    cursor: pointer;
    user-select: none;
}
.edit-inhalt textarea{
   
   font-size: 15px;
   width: 100%;
    border-radius: 5px;
   resize: vertical;
   background: rgb(93, 84, 178);
}
.edit-inhalt textarea:focus{
    outline: blue 2px solid;
   
}
.item-body{
    display: grid;
    

    gap: 10px;
    grid-template-columns:  1fr 0.2fr;
    
    
}
.item-inhalt{
    border: 2px solid rgb(43, 29, 170);
    padding: 3px;
   word-wrap: break-word;
    align-items: center;
    max-width: 45svw;
}

.dialogcontainer{
    
    position: relative;
    
}
.Dialoginhalt{
    display: flex;
    gap: 10px;
    flex-direction: column;
}
.myDialog{
    top: 20vh;
    z-index: 10;
    min-width: 30svw;
    min-height: 10svh;
    background: rgba(104, 98, 137, 0.95);
    border-radius: 20px;
    transition: transform 1s ease-in-out;
}



.closebutton{
    background: blue;
    border-radius: 8px;
    transform: scale(1.0);
    box-shadow: 0px 0px 3px 1px blue;
    font-weight: 700;
    margin: 5px;
}
.closebutton:hover{
    transform: scale(1.05);
}
</style>