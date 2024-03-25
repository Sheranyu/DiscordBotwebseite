import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({request, locals: {supabase}}) {
    try {
        const requestdata = await request.json()

        if(!requestdata || requestdata == null || requestdata == undefined){
            return new Response("Feld darf nicht leer sein", {status: 400})
        }
    const {data, error} = await supabase.from("meme_names").insert({name: requestdata}).select()


    if(error){
        return new Response("Error", {status: 400})
    }
    return json(data)
        
    } catch (error) {
        return new Response("fehler",{status: 500})
    }
    
}