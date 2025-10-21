import React, { useEffect, useState } from "react";
// import { guestLinks, userLinks, NavigationLink } from "../data/navigation";
import { useGuestLinks, useUserLinks } from '../data/navigation';
import { supabase } from '../lib/supabaseClient';
import { handleLogout } from '../lib/auth';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useClickOutside } from '../utils/useClickOutside';

import logo from "../assets/img/logo.svg"; 

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
    { code: 'ru', name: 'ru' },
    { code: 'ua', name: 'ua' },
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
    <header className={`flex items-center box-border max-w-9xl mx-auto justify-between w-full p-5 fixed top-0 z-50 ${
      isScrolled ? 'bg-white' : ''
    }`}>
      <div className="items-center box-border flex">
        <a href="/" className="box-border h-auto w-[160px] md:w-[190px] rounded-[100px]">
          <img 
            src={logo}
            // className="box-border w-[190px] " 
            className={`w-[190px]  ${
              isScrolled ? 'w-[150px]' : ''
            }`}
            alt="Logo" 
          />
        </a>
      </div>

      <div className="ml-auto mr-8 box-border md:flex gap-10">
        <div className="box-border hidden md:flex">
          <nav className="flex items-center h-full"> 
            <ul className="flex gap-10">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`/${link.href}`}
                    onClick={(e) => handleLinkClick(link)}
                    className={`text-[#777777] text-md font-semibold box-border leading-[21px]
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

        <div className="relative  md:flex language-selector h-auto bg-transparent rounded-md border border-transparent text-white transition-opacity">

          <button
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="pointer gap-0 text-black px-0 py-[10px] w-[67px] max-w-[67px] duration-200 flex items-center justify-start hover:opacity-100 hover:cursor-pointer"
            aria-haspopup="listbox"
            aria-expanded={isLanguageOpen}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9694 3.40937C6.92589 3.40937 3.64343 6.69182 3.64343 10.7353C3.64343 14.7788 6.92589 18.0613 10.9694 18.0613C15.0129 18.0613 18.2953 14.7788 18.2953 10.7353C18.2953 6.69182 15.0129 3.40937 10.9694 3.40937ZM9.04799 15.2824C9.18036 15.6254 9.32771 15.9368 9.48755 16.2107C9.91046 16.9341 10.405 17.3953 10.9694 17.3953C11.5338 17.3953 12.0283 16.9341 12.4512 16.2107C12.6086 15.9418 12.7526 15.6379 12.8824 15.3024C11.6171 15.4223 10.3391 15.4156 9.04799 15.2824ZM5.56734 14.6297C6.47808 15.8901 7.81915 16.82 9.37513 17.2029C9.21196 17.0131 9.05628 16.7942 8.91226 16.5461C8.68665 16.1607 8.48353 15.7053 8.30954 15.1933C7.40129 15.0668 6.48803 14.8795 5.56734 14.6297ZM16.3573 14.6489C15.4524 14.9061 14.54 15.096 13.6209 15.2183C13.4486 15.7195 13.2488 16.1665 13.0265 16.5462C12.8824 16.7942 12.7268 17.0132 12.5636 17.203C14.1112 16.8217 15.4465 15.8992 16.3573 14.6489ZM13.63 11.0683H8.30868C8.33532 12.3703 8.51681 13.5773 8.81318 14.5864C10.265 14.7571 11.7003 14.7654 13.1188 14.6081C13.4185 13.5949 13.6034 12.3794 13.63 11.0683ZM17.6211 11.0683H14.296C14.2711 12.3287 14.1046 13.5051 13.8348 14.5148C14.8613 14.36 15.8794 14.1194 16.8875 13.7906C17.3138 12.9681 17.5728 12.0455 17.6211 11.0683ZM7.6429 11.0683H4.31783C4.36611 12.0448 4.62418 12.9655 5.04959 13.7873C6.07356 14.0994 7.0892 14.3334 8.0974 14.4891C7.831 13.4842 7.66788 12.3178 7.6429 11.0683ZM8.0991 6.97406C7.09595 7.13141 6.07946 7.36701 5.04959 7.68335C4.62418 8.50502 4.36612 9.42576 4.31783 10.4023H7.6429C7.66788 9.14941 7.83188 7.98062 8.0991 6.97406ZM13.1157 6.85086C11.7104 6.69435 10.2778 6.70101 8.81582 6.87583C8.5178 7.88648 8.33547 9.0961 8.30883 10.4023H13.6302C13.6036 9.0853 13.4179 7.86658 13.1157 6.85086ZM13.8317 6.9441C14.1039 7.95724 14.2712 9.13773 14.2962 10.4024H17.6213C17.573 9.42503 17.3132 8.50178 16.8878 7.67936C15.8847 7.34719 14.8656 7.10061 13.8317 6.9441ZM9.37534 4.26754C7.82107 4.64966 6.47991 5.57871 5.57011 6.83818C6.49417 6.58593 7.40826 6.39613 8.31231 6.26874C8.4863 5.76093 8.68776 5.30805 8.91253 4.92426C9.05656 4.67617 9.21216 4.45734 9.37534 4.26754ZM12.5638 4.26754C12.727 4.45735 12.8827 4.6763 13.0267 4.92437C13.2465 5.30065 13.4454 5.74356 13.6169 6.24055C14.541 6.36459 15.4534 6.55773 16.3534 6.81663C15.4434 5.56871 14.1089 4.64796 12.5638 4.26754ZM12.8785 6.15564C12.7495 5.82514 12.6063 5.52545 12.4514 5.25988C12.0285 4.53645 11.534 4.07524 10.9696 4.07524C10.4052 4.07524 9.91065 4.53645 9.48776 5.25988C9.32959 5.5321 9.18307 5.83931 9.05236 6.17813C10.3494 6.04326 11.6247 6.03743 12.8785 6.15564Z" fill="#777777"/>
            </svg>
            <span className="text-md text-[#777777]  font-medium">{currentLanguage.code}</span>
            <svg
              className={`w-4 h-4 ml-auto text-[#777777] transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
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
                    i18n.language === lang.code ? 'text-[#046EF1] font-medium' : 'text-white-700'
                  }`}
                >
                  {lang.name}
                </li>
              ))}
            </ul>
          )}
        </div>
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
          className="md:hidden  mr-3 inline-flex items-center justify-center px-[6px] py-[8px] border border-black rounded-[5px] max-h-[36px]"
          aria-label="Open navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <div className="flex flex-col gap-1">
            <div className={`w-[18px] h-0.5 bg-black rounded-[20px] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></div>
            <div className={`w-[18px] h-0.5 bg-black rounded-[20px] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-[18px] h-0.5 bg-black rounded-[20px] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}></div>
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