/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params, locals: { supabase } }) {
    const meme_names_id = params.id
    console.log(meme_names_id);
    
    const { error } = await supabase
    .from('meme_names')
    .delete()
    .eq('id', meme_names_id) 
    
    if(error){
        console.log(error);
        return new Response(`${error}`, {status:401} )
    }
    
    return new Response("ok",{status: 201});
}
/** @type {import('./$types').RequestHandler} */
export async function PUT({ params, locals: { supabase },request }) {
    const body = await request.json()
    const meme_names_id =  parseInt( params.id)
    

    const {data ,error } = await supabase
    .from('meme_names')
    .update({name: body.name})
    .eq('id', meme_names_id)
    .select()
    
    
    if(error){
        return new Response("Error beim Updaten",{status:401})
    }
    return new Response("Erfolgreich", {status: 201});
}