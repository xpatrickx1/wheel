import React, { useEffect, useState } from "react";
// import { guestLinks, userLinks, NavigationLink } from "../data/navigation";
import { useGuestLinks, useUserLinks } from '../data/navigation';
import { supabase } from '../lib/supabaseClient';
import { handleLogout } from '../lib/auth';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useClickOutside } from '../utils/useClickOutside';

interface NavItem {
  href: string;
  id: string;
  text: string;
}

export const Header: React.FC = () => {
  const { t } = useTranslation(); 


  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  

  useClickOutside('.language-selector', setIsLanguageOpen);

  const languages = [
    { code: 'en', name: 'ENG' },
    { code: 'ru', name: 'RUS' },
    { code: 'ua', name: 'UA' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const guestLinks = [
    { id: "signin", href: "sign-in" },
    { id: "signup", href: "sign-up" },
  ];

  const userLinks = [
    { id: "dashboard", href: "dashboard" },
    { id: "pay", href: "pay" },
    { id: "partner", href: "partner" },
    { id: "logout", href: "logout" },
  ];
  
  const [links, setLinks] = useState<NavItem[]>(guestLinks as []);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setLinks(userLinks as NavItem[]);
      } else {
        setLinks(guestLinks as NavItem[]);
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        // setLinks(session ? useUserLinks() : useGuestLinks());
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLinkClick = async (link: NavItem) => {
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
    <header className={`box-border flex justify-between w-full p-5 fixed top-0 z-50 ${
      isScrolled ? 'backdrop-blur-[10px]' : ''
    }`}>
      <div className="items-center box-border flex">
        <a href="/" className="box-border h-[35px] w-[35px] rounded-[100px]">
          <img 
            src="https://c.animaapp.com/mdsj6ig00k4ngn/assets/logo-3.svg" 
            className="box-border w-[35px]" 
            alt="Logo" 
          />
        </a>
        <span className="font-bold box-border block ml-2.5">Wheelee</span>
      </div>
      <div className="box-border hidden md:flex">
        <nav className="flex align-center h-full"> 
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
                  {isLoading && link.id === "logout"
                    ? t("nav.loggingOut") || "Выход..."
                    : t(`nav.${link.id}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="relative hidden md:flex language-selector h-auto bg-[#0d0d0d96] rounded-md border border-[#FFFBFB14] text-white transition-opacity" style={{ width: '95px' }}>
          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="w-full opacity-50 justify-center gap-2 text-black px-6 py-[10px] duration-200 flex items-center justify-between hover:opacity-100"
            aria-haspopup="listbox"
            aria-expanded={isLanguageOpen}
          >
            <span className="text-md text-white font-medium">{currentLanguage.code.toUpperCase()}</span>
            <svg
              className={`w-4 h-4 text-white transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isLanguageOpen && (
            <ul
              role="listbox"
              className="absolute right-0 top-full mt-1 p-2 w-24 bg-[#0D0D0D96] border border-[#FFFBFB14] rounded-md shadow-lg z-20 overflow-hidden"
            >
              {languages.map((lang) => (
                <li
                  role="option"
                  aria-selected={i18n.language === lang.code}
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsLanguageOpen(false);
                  }}
                  className={`opacity-50 px-3 py-2 text-sm cursor-pointer outline-none hover:text-white hover:opacity-100 transition-all duration-150 ${
                    i18n.language === lang.code ? 'bg-black-50 text-blue-600 font-medium' : 'text-white-700'
                  }`}
                >
                  {lang.name}
                </li>
              ))}
            </ul>
          )}
        </div>

      <div
          className={`fixed inset-x-0 top-16 z-40 flex flex-col items-center gap-4 bg-black text-white transition-all duration-500 overflow-hidden ${
            isMenuOpen ? "max-h-[calc(100vh-56px)] h-screen" : "max-h-0"
          }`}
        >
          <nav className="flex align-center h-full"> 
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
                    {isLoading && link.id === "logout"
                      ? t("nav.loggingOut") || "Выход..."
                      : t(`nav.${link.id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
		  
        <div className="relative language-selector mb-8 h-auto bg-[#0d0d0d96] rounded-md border border-[#FFFBFB14] text-white transition-all duration-300" style={{ width: '95px' }}>
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="w-full opacity-50 justify-center gap-2 text-black px-6 py-2 duration-200 flex items-center justify-between"
              aria-haspopup="listbox"
              aria-expanded={isLanguageOpen}
            >
              <span className="text-md text-white font-medium">{currentLanguage.code.toUpperCase()}</span>
              <svg
              className={`w-4 h-4 text-white transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isLanguageOpen && (
              <ul
              role="listbox"
              className="absolute right-0 top-full mt-1 p-2 w-24 bg-[#0D0D0D96] border border-[#FFFBFB14] rounded-md shadow-lg z-20 overflow-hidden"
              >
              {languages.map((lang) => (
                <li
                role="option"
                aria-selected={i18n.language === lang.code}
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setIsLanguageOpen(false);
                  setIsMenuOpen((v) => !v)
                }}
                className={`opacity-50 px-3 py-2 text-sm cursor-pointer outline-none hover:text-blue-600 transition-colors duration-150 ${
                  i18n.language === lang.code ? 'bg-black-50 text-blue-600 font-medium' : 'text-white-700'
                }`}
                >
                {lang.name}
                </li>
              ))}
              </ul>
            )}
          </div>
        </div>


        {/* Burger button visible on mobile/tablet */}
        <button
          className="md:hidden ml-auto mr-3 inline-flex items-center justify-center px-[6px] py-[8px] border border-[#FFFFFF] rounded-[5px]"
          aria-label="Open navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <div className="flex flex-col gap-1">
            <div className={`w-[18px] h-0.5 bg-white rounded-[20px] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></div>
            <div className={`w-[18px] h-0.5 bg-white rounded-[20px] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-[18px] h-0.5 bg-white rounded-[20px] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}></div>
          </div>
        </button>

        <div
          className={`fixed inset-x-0 top-16 z-40 flex flex-col items-center gap-4 bg-black text-white transition-all duration-500 overflow-hidden ${
            isMenuOpen ? "max-h-[calc(100vh-56px)] h-screen" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col items-center p-6 gap-4">
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
          </nav>
          
		 
        <div className="relative language-selector mb-8 h-auto bg-[#0d0d0d96] rounded-md border border-[#FFFBFB14] text-white transition-all duration-300" style={{ width: '95px' }}>
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="w-full opacity-50 justify-center gap-2 text-black px-6 py-2 duration-200 flex items-center justify-between"
              aria-haspopup="listbox"
              aria-expanded={isLanguageOpen}
            >
              <span className="text-md text-white font-medium">{currentLanguage.code.toUpperCase()}</span>
              <svg
              className={`w-4 h-4 text-white transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isLanguageOpen && (
              <ul
              role="listbox"
              className="absolute right-0 top-full mt-1 p-2 w-24 bg-[#0D0D0D96] border border-[#FFFBFB14] rounded-md shadow-lg z-20 overflow-hidden"
              >
              {languages.map((lang) => (
                <li
                role="option"
                aria-selected={i18n.language === lang.code}
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setIsLanguageOpen(false);
                  setIsMenuOpen((v) => !v)
                }}
                className={`opacity-50 px-3 py-2 text-sm cursor-pointer outline-none hover:text-blue-600 transition-colors duration-150 ${
                  i18n.language === lang.code ? 'bg-black-50 text-blue-600 font-medium' : 'text-white-700'
                }`}
                >
                {lang.name}
                </li>
              ))}
              </ul>
            )}
          </div>
        </div>

    </header>
  );
};