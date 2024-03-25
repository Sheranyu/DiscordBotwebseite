<script>
    import Dialoginhalt from "$lib/Modals/dialoginhalt.svelte";
    import  x_bild  from "$lib/images/x_bild.png";
    import  okbild  from "$lib/images/uberpruft.png";
    import { onMount, tick } from "svelte";
    import { fade } from "svelte/transition";
    import { DeleteSpruchnames, UpdateSpruchNames } from "$lib/database/CRUD/spruch_names_functions.js";
    import ModalAlert from "$lib/Modals/ModalAlert.svelte";
    import { AddSpruchNameOrNull } from "$lib/database/CRUD/spruch_names_functions.js";
    import {UpdateBotConfig} from "$lib/database/CRUD/BotConfig.js"
    export let data
    
    let errorinhalt = ""
    let errormeldung = false
    let showDeleteModal = false
    let srcdelete = x_bild
    let okbutton = okbild
    let showdiag= false
    let checkkey
   
    /**
     * @type {any[]}
     */
    let dialogdata = [];
   /**
     * @type {{ id: any; name: any; text_inhalt: { id_text: any; text: any; }[]; }}
     */
   let dialogneu
    /**
     * @type {any}
     */
    let inputData = "";
    let inputdataneu = "";
    $: namedata = data.userinhalt
    $: userconfig = data.userconfig[0].SchulBotConfig[0]

    function AlertModal(){
        showDeleteModal = !showDeleteModal
        return showDeleteModal
    }

  
    /**
     * @param {{ id: any; name: any; text_inhalt: { id_text: any; text: any; }[]; }} Dialoginhalt
     */
    function opendialog(Dialoginhalt){
        showdiag= true
        dialogdata = []
        dialogdata = [...dialogdata, Dialoginhalt]
        
    }
    function closedialog(){
        showdiag= false
    }
    function handleInputChange(event) {
      inputdataneu = event.target.value;
  }
  
  
    

  async function adddata(){
       const data = await AddSpruchNameOrNull(inputdataneu)
      
      if (data.error == false) 
      {
          namedata.push(data.message[0])
          errormeldung = false
          updateReactivity()
      }
      if(data.error == true)
      {
        errorinhalt = data.message
        errormeldung = true 
      }
        
    }
    
    /**
     * @param {{ id: any; name: any; text_inhalt: { id_text: any; text: any; }[]; }} value
     */
    function editsprachname(value) {
        //edit funktioniert trotz diesen fehlers
        for(let i = 0; i < namedata?.length;i++){
            
            if(namedata[i].id == value.id){
                namedata[i].edit = !value.edit
                return
            }
        }
        
    }
    
    /**
     * @param {{ id: any; name: any; text_inhalt: { id_text: any; text: any; }[]; } | { id: number; name: string; satz: { id: number; satz: string; }[]; edit: boolean; } | { id: number; name: string; satz: string[]; edit: boolean; }} value
     */
    async function ondelete(value) {   
        DeleteSpruchnames(value)
        await animateDelete(value);
        namedata = namedata.filter(inhalt => inhalt.name != "")
       
    }
   
    /**
     * @param {{ id: any; name: any; text_inhalt: { id_text: any; text: any; }[]; }} value
     */
    async function OnOk(value){
        updateReactivity()
        UpdateSpruchNames(value)
        value.edit = false
    }




function updateReactivity() {
    namedata = [...namedata];
}
function OnMemePostChange(event) {
  UpdateBotConfig(userconfig)
}

    /**
     * @param {{ id: any; name: any; text_inhalt: { id_text: any; text: any; }[]; } | { id: number; name: string; satz: { id: number; satz: string; }[]; edit: boolean; } | { id: number; name: string; satz: string[]; edit: boolean; }} value
     */
async function animateDelete(value) {
  const originalName = value.name;

  for (let i = originalName.length; i >= 0; i--) 
  {
    value.name = originalName.slice(0, i);
    updateReactivity();
   await delay(25); 
   
  }

  updateReactivity();
}

// Eine Hilfsfunktion zum Pausieren der Ausführung für eine bestimmte Zeit
    /**
     * @param {number | undefined} ms
     */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
</script>

{#if !data.error}
  
{#key showdiag}    
    <Dialoginhalt closedialog={closedialog} dialogdata={dialogdata}  showDialog={showdiag}></Dialoginhalt>
{/key}


  

<div class="spruchverwaltung">
     <div class="spruchhead">
        <div><h2>Spruchname</h2></div>
      </div>
   <div>
    <div class="container">
      <label class="switch" for="checkbox">
        <input type="checkbox" id="checkbox" bind:checked={userconfig.messagelisten} on:change={OnMemePostChange}/>
        <div class="slider round"></div>
      </label>
      <span class="SpruchNameactivate">SpruchName aktivierer</span>
    </div>
   </div>
        
 <div  class="spruchcontainerinhalt">
{#each namedata as item (item.id)}
  {#if item.name !== ""}
    <div class="spruchinhalt">
      <div class="inhalt">
        <div class="anzeigeinhalt" role="button" tabindex="0" on:keypress on:click={() => opendialog(item)}>
          <p>{item.name}</p>
        </div>
     
        {#if item.edit == true}
          <div class="edit-container">
            <div>
              <input class="edit-input" type="text" bind:value={item.name}>
            </div>
            <div class="image-container">
              <button on:click={() => {
                showDeleteModal = true;
                dialogneu = item;
              }} class="custom-button">
                <img src={srcdelete} width="20px" height="20px" alt="nope">
              </button>
            </div>
            <div class="image-container">
              <button on:click={() => OnOk(item)} aria-label="OK" class="custom-button">
                <img src={okbutton} width="20px" height="20px" alt="OK">
              </button>
            </div>
          </div>
        {/if}
      </div>

      <p class="editdata" on:click={() => editsprachname(item)}>🖊</p>
    </div>
  {/if}
{/each}
</div>  
{#if errormeldung}
  
<div class="error">
    <p>{errorinhalt}</p>
</div>  
{/if}
     <div class="addspruchuser">
        <form  on:submit={() => adddata()} >
            <input   name="SpruchName" minlength="3"   value={inputData} on:input={handleInputChange} >
            <button  class="submitbutton" type="submit">Hinzufügen</button>
          </form>
     </div>
     <!--<button on:click={() => document.getElementById('myDialog')?.show()}>Open</button>-->
</div>

{#key showDeleteModal}
    
<ModalAlert DialogAlert={AlertModal} showDeleteModal={showDeleteModal} inhalt={dialogneu} OnDelete={(value)=>ondelete(value)} ></ModalAlert>
{/key}

{:else}
<div class="error">
  {data.errormessage}
</div>
{/if}

<style>


.custom-button{
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    display: inline-block;
}
.edit-input{
    background-color: blanchedalmond;

}
.edit-input:focus,.edit-input:active{
    outline: blue 2px groove; 
}
.submitbutton{
    background: blue;
    border-radius: 8px;
    transform: scale(1.0);
    box-shadow: 0px 0px 3px 1px blue;
    font-weight: 700;
}
.submitbutton:hover{
    transform: scale(1.05);
}
.editdata:hover{
    transform: scale(1.06);
    cursor: pointer;
    user-select: none;
}

input{
    font-size: 20px;
    border-radius: 6px;
    border: solid 2px black;
}
input:invalid{
  border: 2px dashed red;
}



.edit-container input {
    transition: opacity 0.5s;
}
.edit-container {
    display: flex;
    gap: 10px;
    align-items: center;
    width: 200px;
    
}
.image-container:hover{
    transform: scale(1.1);
    user-select: none;
}
.image-container:active{
    transform: scale(0.9);
}

.spruchinhalt{
    display: grid;
    grid-template-columns: 1fr 0.1fr ;
    user-select: none;
    gap: 20px;
    

}
.spruchinhalt > .inhalt{
    display: grid;
    gap: 8px;
    align-items: center;
    
    
}
.image-container {
   display: flex;
   align-items: center;    
}
.spruchinhalt > .inhalt > .anzeigeinhalt
{ 
    background: rgb(46, 46, 46);
    box-shadow: 0px 0px 5px 2px blue;
    transform: scale(1);
    transition: transform 0.2s;
    position: relative;
    border-radius: 10px;
    color: white;
    padding: 0px 0px 0px 10px;
}
.spruchinhalt > .inhalt p{
    pointer-events: none;
}
.spruchinhalt > .inhalt > .anzeigeinhalt:hover{
    transform: scale(1.05);
    
}

.spruchverwaltung
{
    
    max-width: 400px;
    display: grid;
    border-radius: 5px;
    justify-content: center;
    
    background: rgb(85, 85, 85) ;
    box-shadow: 0px 0px 6px 4px black;
    outline: blue 2px solid;
    gap: 10px;
    margin: 10px auto auto auto;
    padding: 1svh;
    
    
}
.spruchhead{
    text-align: center;
}
.switch {
  display: inline-block;
  height: 34px;
  position: relative;
  width: 60px;
}

.switch input {
  display:none;
}

.slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: .4s;
}

.slider:before {
  background-color: #fff;
  bottom: 4px;
  content: "";
  height: 26px;
  left: 4px;
  position: absolute;
  transition: .4s;
  width: 26px;
}

input:checked + .slider {
  background-color: #3251eb;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}



.container {
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1em;
  padding: 10px;
  background: rgb(46, 46, 46);
  border-radius: 10px;
  box-shadow: 0px 0px 5px 1px blue;
  color: white;
 
}
.spruchcontainerinhalt{
  display: grid;
  gap: 10px;
  max-height: 70vh;
  overflow:auto;
  padding-left: 10px;
  padding-right: 10px;

}
.spruchcontainerinhalt::-webkit-scrollbar{
  width: 10px;
}
.spruchcontainerinhalt::-webkit-scrollbar-thumb{
  background-color: #888; /* Farbe des Scrollbalkengriffs */
  border-radius: 6px; /* Abrundung des Scrollbalkengriffs */
}

.spruchcontainerinhalt::-webkit-scrollbar-track{
  background-color: rgb(8, 66, 241); /* Hintergrundfarbe des Scrollbalkens */
  border-radius: 10px;
}



</style>
