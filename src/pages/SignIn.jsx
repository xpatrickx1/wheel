import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function SignIn() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      console.log('User signed out successfully.');
      setSession(null); // Оновлюємо стан після виходу
    }
  }

  useEffect(() => {
    // Отримуємо поточну сесію при завантаженні
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        navigate('/dashboard');
      }
    });

    // Слухаємо зміни стану авторизації
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate('/dashboard'); // Перенаправлення після логіну
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  console.log('Current session:', session);

  if (!session) {
    return (
      <div className="max-w-xs mx-auto">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          view="sign_in"
          providers={['google', 'github']}
          redirectTo="/vidgets" // Змінено на особистий кабінет
        />
        <p className="text-center mt-4">
          Don’t have an account?{' '}
          <a href="/sign-up" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Ласкаво просимо!</h2>
      <p className="text-center">Ви увійшли як {session.user.email}</p>
      <button
        onClick={signOutUser}
        className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
      >
        Вийти
      </button>
    </div>
  );
}