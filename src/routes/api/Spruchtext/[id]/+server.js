/** @type {import('./$types').RequestHandler} */
export async function PUT({ params, locals: { supabase },request }) {
    const body = await request.json()
    const meme_names_id =  parseInt( params.id)
    
  
    const {error } = await supabase
    .from('text_inhalt')
    .update({text: body.text})
    .eq('id_text', meme_names_id)

    if(error){
        return new Response("Error beim Updaten",{status:400})
    }
    return new Response("Erfolgreich", {status: 201});
}
export async function DELETE({ params, locals: { supabase } }) {
    const meme_names_id = params.id
    console.log(meme_names_id);
    
    const {error } = await supabase
    .from('text_inhalt')
    .delete()
    .eq('id_text', meme_names_id)
    
    if(error){
        console.log(error);
        return new Response(`${error}`, {status:401} )
    }
    
    return new Response("ok",{status: 201});
}