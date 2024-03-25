import { engine } from "$lib/database/engine";
import type { Actions } from './$types';
import { signInWithDiscord } from "$lib/database/login";
import type { Database } from "$lib/database/supabase";
import { fail, redirect } from "@sveltejs/kit";
import bcrypt from 'bcrypt'

export const actions = {
    login: async ({request, cookies, locals: {supabase}}) =>{
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
        try {
          const {data, error } = await supabase.from('User').select("name, password")
        if(error){
          console.log(error);
          
          return fail(303)
        }
        

        const userPassword = await bcrypt.compare(password, data[0].password)
        if (!userPassword) {
          return fail(400, { credentials: true })
        }
          
        } catch (error) {
          
        }


        try {

          const {data, error} = await supabase.from("User").update({authtoken: crypto.randomUUID()}).eq("id",1).select("authtoken")
          if(error)
          {

            return fail(404)
          }
          cookies.set('session', data[0].authtoken, {
          // send cookie for every page
          path: '/',
          // server side only cookie so you can't use `document.cookie`
          httpOnly: true,
          // only requests from same site can send cookies
          // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
          sameSite: 'strict',
          // only sent over HTTPS in production
         
          // set cookie to expire after a month
          maxAge: 60 * 60 * 24 * 30,
        })
          
        } catch (error) {
          
        }

        throw redirect(303,"/Home")
        

        

        //const {data, error} = await engine.from("meme_names").select()
        //console.log(error);

        //const data = await signInWithDiscordnew(supabase)
       
        //console.log(data.url);


        throw redirect(303,"/Home")
        
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
