// src/components/HowItWorks.tsx
import React from "react";
import { useTranslation } from 'react-i18next';
import integrationImg from "../assets/img/integrationImg.png";

export function Integration() {
  const { t } = useTranslation();
  const integrations = t("integrationBannerList", { returnObjects: true });
  return (
    <section className="pt-18">
      <div className="max-w-[1582px] mx-auto px-4">

        <div className="relative max-w-[97%] md:max-w-[92%] xl:max-w-7xl md:mx-auto mt-[80px] mb-[107px]">
          <div className="relative overflow-hidden z-1 w-full gap-12 xl:gap-6 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white flex flex-col-reverse xl:flex-row items-center justify-between px-6 xl:px-0 xl:pr-18 py-7 md:py-14">
            <img
              src={integrationImg}
              alt="Виджеты"
              className=" transform-translate-y-1/2 max-w-[450px] right-0 z-0 pointer-events-none md:w-[596px]"
            />
            
            <div className="xl:w-2xl space-y-4 z-10">
              <h2 className="text-2xl xl:text-4xl font-semibold">{t('integrationBannerTitle')}</h2>
              <p className="text-[#F9F9F9] text-md xl:text-xl leading-relaxed opacity-80">
                {t('integrationBannerSubtitle')}
              </p>
              <p className="text-[#F9F9F9] text-xl leading-relaxed opacity-80">
                {t('integrationBannerListTitle')}
              </p>
              <ul className="flex gap-5 flex-col sm:flex-row">
              {integrations.map((integration, index) => (
                <li
                  key={index}
                  className=""
                >
                  <span className="mr-1">✅</span> 
                  {t(integration.text)}
                </li>
              ))}

              </ul>
              <a href="sign-up" className="mt-6 xl:mt-10 inline-block bg-white text-[#0572EE] whitespace-nowrap text-md xl:text-lg font-medium px-8 py-5 rounded-lg shadow hover:bg-blue-50 transition">
                {t('tryBtn')}
              </a>
            </div>

            

          </div>

          <div className="absolute inset-0 z-0 -top-[14px] md:-top-[24px] left-[24px] bottom-[66px] -right-[14px] md:-right-[24px] rounded-2xl pointer-events-none
                [border:1px_solid_transparent]
                [background:linear-gradient(112.2deg,#005EFF_22.2%,#0C91D3_105.31%)_border-box]
                [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)]
                [mask-composite:exclude] before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-white before:-z-10
          "></div>
        </div>
      </div>
    </section>
  );
}
