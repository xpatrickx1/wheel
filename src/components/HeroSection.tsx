import React from 'react';
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t } = useTranslation();
  return (
    <div className="box-border text-center pt-[190px]">
      <div className="box-border flex flex-wrap max-w-none w-full mx-auto px-[15px] md:max-w-[1140px]">
        <div className="relative box-border basis-0 grow max-w-full min-h-px w-full px-[15px]">
          <h1 className="text-4xl font-medium box-border leading-[43.2px] mb-3.5">
            {t('pageTitle')}
          </h1>
          <p className="text-lg box-border leading-[30px] max-w-[500px] mb-10 mx-auto">
            {t('desc').split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
          </p>
          <a href="sign-up" className="text-blue-600 box-border">
            <div className="relative text-white bg-indigo-600 bg-[linear-gradient(112.2deg,_#005EFF_22.2%,_#0C91D3_105.31%)] shadow-[rgba(43,62,229,0.15)_0px_15px_18px_0px,rgba(93,225,151,0.004)_0px_2px_0px_0px_inset] box-border inline-block overflow-hidden px-[35px] py-5 rounded-[17px]">
              {t('tryBtn')}
            </div>
          </a>
        </div>
      </div>
      
    </div>
  );
}
