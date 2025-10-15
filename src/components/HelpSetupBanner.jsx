import React from "react";
import { useTranslation, Trans } from 'react-i18next';

import helpSetup from "../assets/img/helpSetup.png";
export function HelpSetupBanner() {
  const { t } = useTranslation();

  return (
    <div className="relative max-w-7xl mx-auto mt-[80px] md:mb-[107px]">
      <div className="relative overflow-hidden z-1 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-18 py-7 md:py-14">
        <div className="md:w-2xl space-y-4 z-10">
          <h2 className="text-4xl font-semibold">{t('helpBannerTitle')}</h2>
          <p className="text-[#F9F9F9] text-xl leading-relaxed">
            {t('helpBannerSubtitle')}
          </p>
          <a href="sign-up" className="mt-10 inline-block bg-white text-[#0572EE] text-lg font-medium px-8 py-5 rounded-lg shadow hover:bg-blue-50 transition">
            {t('tryBtn')}
          </a>
        </div>

        <img
          src={helpSetup}
          alt="Виджеты"
          className="absolute -top-[37%] transform-translate-y-1/2 max-w-[580px] right-0 z-0 pointer-events-none md:w-[596px]"
        />

      </div>

      <div className="absolute inset-0 z-0 -top-[24px] left-[24px] bottom-[66px] -right-[24px] rounded-2xl pointer-events-none
            [border:1px_solid_transparent]
            [background:linear-gradient(112.2deg,#005EFF_22.2%,#0C91D3_105.31%)_border-box]
            [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)]
            [mask-composite:exclude] before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-white before:-z-10
      "></div>
    </div>
  );
}
