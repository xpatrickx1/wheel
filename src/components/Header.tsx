import React, { useEffect, useState } from "react";
import { guestLinks, userLinks, NavigationLink } from "../data/navigation";
import { supabase } from '../lib/supabaseClient';
import { handleLogout } from '../lib/auth';

export const Header: React.FC = () => {
  const [links, setLinks] = useState<NavigationLink[]>(guestLinks);
  const [isLoading, setIsLoading] = useState(false);

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

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setLinks(session ? userLinks : guestLinks);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLinkClick = async (link: NavigationLink) => {
    if (link.id === "logout") {
      event.preventDefault();
      setIsLoading(true);
      
      try {
        await handleLogout();
        // Після успішного виходу, стан оновиться через onAuthStateChange
      } catch (error) {
        // Обробка помилки (можна додати toast-сповіщення)
        console.error('Logout failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <header className="box-border flex justify-between p-5">
      <div className="items-center box-border flex">
        <a href="/" className="box-border h-[35px] w-[35px] rounded-[100px]">
          <img 
            src="https://c.animaapp.com/mdsj6ig00k4ngn/assets/logo-3.svg" 
            className="box-border w-[35px]" 
            alt="Logo" 
          />
        </a>
        <span className="font-bold box-border block ml-2.5">lp9</span>
      </div>
      <div className="box-border">
        <nav>
          <ul className="flex gap-4">
            {links.map((link) => (
              <li key={link.id}>
                <a 
                  href={`/${link.href}`}
                  onClick={(e) => handleLinkClick(link)}
                  className={`
                    ${link.id === "logout" ? "cursor-pointer" : ""}
                    ${isLoading && link.id === "logout" ? "opacity-50" : ""}
                  `}
                  aria-disabled={isLoading && link.id === "logout"}
                >
                  {isLoading && link.id === "logout" ? "Выход..." : link.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};