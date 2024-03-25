import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  })

  const session = event.cookies.get('session');


  if (!session) {
    if (!event.url.pathname.startsWith("/login") || event.url.pathname.endsWith("/")) {
        console.log('Umleitung zum Login.');
        throw redirect(303, "/login");  
    }
   
  }

  // find the user based on the session
  const { data, error } = await event.locals.supabase.from("User").select("authtoken, name, SchulBotConfig(User_id, messagelisten)").eq("authtoken", session);
  
  
  if (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    // Handle error appropriately
  } else {
    // Überprüfe, ob `data` vorhanden ist und die Session mit dem Authtoken übereinstimmt
    if (data && data.length > 0 && data[0].authtoken === session) {
      event.locals.user = {
        name: data[0].name,
      };
    } else {
      // Wenn Session ungültig ist, leite zum Login um
      if (!event.url.pathname.startsWith("/login")) {
        throw redirect(303, "/login");
      }
    }
  }

  // Überprüfe den Pfad und führe die Umleitung durch
  if (event.url.pathname.startsWith("/login") && event.locals.user) {
    throw redirect(303, "/Home");
  }

  if (event.url.pathname.startsWith("/Home") && !event.locals.user) {
    throw redirect(303, "/login");
  }

  return resolve(event);
}
