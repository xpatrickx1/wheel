import React, { useEffect, useState } from "react";
import { guestLinks, userLinks, NavigationLink } from "../data/navigation";
import { supabase } from '../lib/supabaseClient';

export const Header: React.FC = () => {
  const [links, setLinks] = useState<NavigationLink[]>(guestLinks);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setLinks(userLinks);
      } else {
        setLinks(guestLinks);
      }
    };

    getUser();

    // слухаємо зміни сесії
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setLinks(session ? userLinks : guestLinks);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    
    <header className="box-border flex justify-between p-5">
    <div className="items-center box-border flex">
      <a href="/" className="box-border h-[35px] w-[35px] rounded-[100px]">
        <img src="https://c.animaapp.com/mdsj6ig00k4ngn/assets/logo-3.svg" className="box-border w-[35px]" />
      </a>
      <span className="font-bold box-border block ml-2.5">lp9</span>
    </div>
    <div className="box-border">
      <nav>
        <ul className="flex gap-4">
          {links.map((link) => (
            <li key={link.id}>
              <a href={`/${link.href}`}>{link.text}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
  );
};
