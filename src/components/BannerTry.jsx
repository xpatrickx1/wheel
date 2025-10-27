import React from "react";
import { useTranslation, Trans } from 'react-i18next';

import bannerTry from "../assets/img/bannerTry.png";
export function BannerTry() {
  const { t } = useTranslation();

  return (
    <div className="relative max-w-[92%] xl:max-w-7xl mx-auto px-2 mt-[40px] md:mt-[80px] mb-[80px] md:mb-[107px] ">
      <div className="relative overflow-hidden z-1 w-full rounded-2xl bg-gradient-to-r mr-[4px] from-blue-600 to-blue-500 text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-18 py-7 md:py-14">
        <div className="md:w-2xl space-y-4 z-10">
          <h2 className="text-2xl md:text-4xl font-semibold">{t('bannerTryTitle')}</h2>
          <a href="sign-up" className="mt-8 inline-block bg-white text-[#0572EE] whitespace-nowrap  text-md xl:text-lg font-medium px-12 py-5 rounded-lg shadow hover:bg-blue-50 transition">
            {t('bannerTryBtn')}
          </a>
        </div>

        <img
          src={bannerTry}
          alt="Виджеты"
          className="absolute hidden md:block bottom-0 transform-translate-y-1/2 max-w-[880px] right-0 z-0 pointer-events-none"
        />

      </div>

      <div className="absolute inset-0 z-0 -top-[14px] md:-top-[24px] left-[48px] bottom-[66px] -right-[4px] md:-right-[24px] rounded-2xl pointer-events-none
            [border:1px_solid_transparent]
            [background:linear-gradient(112.2deg,#005EFF_22.2%,#0C91D3_105.31%)_border-box]
            [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)]
            [mask-composite:exclude] before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-white before:-z-10
      "></div>
    </div>
  );
}
