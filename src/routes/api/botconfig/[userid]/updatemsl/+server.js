/** @type {import('./$types').RequestHandler} */
export async function PUT({request, params, locals:{supabase,user}}) {

    const requestdata = await request.json()
    const userid = params.userid
    console.log(requestdata);
    

    const { error } = await supabase.from("SchulBotConfig").update({messagelisten: requestdata.messagelisten}).eq("User_id", userid);
    if(error){
        return new Response("Error",{status: 400})
    }


    return new Response("ok",{status: 201});
}