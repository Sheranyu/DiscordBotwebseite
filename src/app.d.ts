// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// src/app.d.ts

import { SupabaseClient, Session } from '@supabase/supabase-js'

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient
      user: {
        name: string
      }
    }
    //interface PageData {}
    // interface Error {}
    // interface Platform {}
  }
}

export {};
