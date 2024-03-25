import { engine } from "$lib/database/engine";
import type { Actions } from './$types';
import { signInWithDiscord } from "$lib/database/login";
import type { Database } from "$lib/database/supabase";
import { fail, redirect } from "@sveltejs/kit";
import bcrypt from 'bcrypt'

export const actions = {
  create: async ({request, cookies, locals: {supabase}}) =>{
        const formdata = await request.formData()
        const username = formdata.get("username")
        const password = formdata.get("password")    
    
        if (
          typeof username !== 'string' ||
          typeof password !== 'string' ||
          !username ||
          !password
        ) {
          return fail(400, { invalid: true })
        }

        const newpassword = await bcrypt.hash(password, 10)
        const newauthtoken = crypto.randomUUID()


        const { error } = await supabase.from('User')
        .insert({ id: 1, name: username, authtoken: newauthtoken, password: newpassword })

      if(error)
      {
        console.log(error);
        
        return fail(401,{error: true})
      }
        
        //const {data, error} = await engine.from("meme_names").select()
        //console.log(error);

        //const data = await signInWithDiscordnew(supabase)
       
        //console.log(data.url);


        
        
    }
} satisfies Actions;

async function signInWithDiscordnew(supabase: any) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: 'http://localhost:5173/auth/callback'
      }
    })
    return data
  }
