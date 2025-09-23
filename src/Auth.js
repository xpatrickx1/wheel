import { supabase } from './supabaseClient'

const signIn = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) console.error(error)
}