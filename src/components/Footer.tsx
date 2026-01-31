import React from 'react';
import { useTranslation } from 'react-i18next';

import logo from "../assets/img/logo-footer.svg";


export function Footer() {
  const { t } = useTranslation();
  const footerLinks: FooterLink[] = [
    { id: 'consent', text: `${t('footerPersonalLink')}`, href: 'rules/consent'},
    { id: 'policy', text: `${t('footerPolicyLink')}`, href: 'rules/politika'},
    { id: 'offer', text: `${t('footerAgreementLink')}`, href: 'rules/oferta' },
  ]
  return (
    <div>
      <div className="bg-[#242424] flex flex-col sm:flex-row max-w-9xl gap-8 items-center mx-auto justify-between w-full text-center p-8 pb-11 mt-[100px]">
        <div className="flex flex-col items-start">
          {footerLinks.map((link) => (
            <React.Fragment key={link.id}>
              <a href={link.href} className="text-sm text-[#747474] leading-[33px]">{link.text}</a>
            </React.Fragment>
          ))}
        </div>
        <div className="items-center flex">
          <a href="/" className="h-auto w-[160px] md:w-[190px] rounded-[100px]">
            <img 
              src={logo}
              className="w-[190px]"
              alt="Logo" 
            />
            <img 
              src={logo}
              className="w-[190px] -mt-[20px] opacity-50"
              alt="Logo" 
            />
            <img 
              src={logo}
              className="w-[190px] -mt-[20px] opacity-20"
              alt="Logo" 
            />
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center bg-black">
        <a href="mailto://hi@leadmagnit.com" className="text-md text leading-[47px] text-[#4DAAFF] mx-2.5">hi@leadmagnit.com</a>
      </div>
    </div>
  );
}
