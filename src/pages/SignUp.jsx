import { supabase } from '../lib/supabaseClient';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function SignUp() {
  return (
    <div className="max-w-xs mx-auto">
      <Auth 
        supabaseClient={supabase} 
        appearance={{ theme: ThemeSupa }}
        view="sign_up"
        providers={['google', 'github']}
        redirectTo="/dashboard"
      />
      <p className="text-center mt-4">
        Already have an account? <a href="/sign-in" className="text-blue-600 hover:underline">Sign in</a>
      </p>
    </div>
  );
}
