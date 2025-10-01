
import { supabase } from './supabaseClient'

export async function handleLogout(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Error logging out:', error.message)
      throw error
    }
    
    console.log('User logged out successfully.')
    window.location.href = '/'
  } catch (error) {
    console.error('Unexpected error during logout:', error)
    throw error
  }
}