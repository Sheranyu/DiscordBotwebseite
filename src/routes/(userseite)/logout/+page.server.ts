import { redirect } from "@sveltejs/kit";

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