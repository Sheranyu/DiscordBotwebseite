import { engine } from "$lib/database/engine";

export async function signInWithDiscord() {
    const { data, error } = await engine.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: 'http://localhost:5173/auth/callback'
      }
    })
    return data
  }
export async function signOut(supabase: any) {
    const { error } = await supabase.auth.signOut()
  }