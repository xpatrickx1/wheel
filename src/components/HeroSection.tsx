import React from 'react';
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t } = useTranslation();
  return (
    <div className="box-border text-center pt-[100px]">
      <div className="box-border flex flex-wrap max-w-none w-full mx-auto px-[15px] md:max-w-[1140px]">
        <div className="relative box-border basis-0 grow max-w-full min-h-px w-full px-[15px]">
          <h1 className="text-4xl font-bold box-border leading-[43.2px] mb-3.5">{t('pageTitle')}</h1>
          <h2 className="text-xl box-border leading-[30px] max-w-[500px] opacity-70 mb-10 mx-auto">
            {t('desc')}
          </h2>
<div className="widget-container" data-widget-id="wheel-spinner" data-widget-height data-widget-rnd="3" data-widget-lang="en"></div>
<script async src="https://cdn.vuqq.com/static/embed.js?nocache=538124"></script>
          <a href="wheel" className="text-blue-600 box-border">
            <div className="relative text-white bg-indigo-600 bg-[linear-gradient(rgb(87,46,253)_0%,rgb(51,57,255)_100%)] shadow-[rgba(43,62,229,0.15)_0px_15px_18px_0px,rgba(93,225,151,0.004)_0px_2px_0px_0px_inset] box-border inline-block overflow-hidden px-[35px] py-5 rounded-[17px]">Попробовать бесплатно</div>
          </a>
        </div>
      </div>
      
    </div>
  );
}
