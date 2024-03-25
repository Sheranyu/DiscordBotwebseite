import type { Actions } from './$types';
import type { PageServerLoad } from "./$types";
import { signOut } from "$lib/database/login";
import { redirect } from '@sveltejs/kit';


export const load: PageServerLoad = async ( {params, locals: {supabase,user}}) => {
   
    let userdata;
    let error = false;
    let errormessage;
    let userconfig

    try {
        const {data, error} = await supabase.from("meme_names").select("id,name, text_inhalt(id_text,text)")
        if(error){
            throw new Error()
        }
        userdata = data
    } catch (error) {
        error = true
        errormessage = "bei der abfrage der Daten ist ein Fehler passiert."
        userdata = undefined
        userconfig = undefined
    };
    try {
        const { data, error } = await supabase.from("User").select("authtoken, name, SchulBotConfig(User_id, messagelisten)").eq("name", user.name);
        if(error){
            throw new Error() 
        }
        userconfig = data
        
    } catch (error) {
        
        error = true
        errormessage = "bei der abfrage der Daten ist ein Fehler passiert."
        userdata = undefined
        userconfig = undefined
    }
    

    return {
        userconfig: userconfig,
        userinhalt: userdata,
        error: error,
        errormessage: errormessage
    }
    
};


export const actions = {
    logout:async ({request, cookies, locals: {supabase}}) => {
        cookies.set('session', '', {
            path: '/',
            expires: new Date(0),
          })
      
          // redirect the user
          throw redirect(302, '/login')
    }
};