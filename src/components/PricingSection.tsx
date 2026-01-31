import React, { useState } from "react";
import { Pricing } from '../components/Pricing';
import { useTranslation } from 'react-i18next';


export function PricingSection(theme: string) {
  const { t } = useTranslation();
  return (
    <section className=" flex flex-col items-center pt-16 px-4 pt-[6rem]">
      <h2 className="text-3xl text-black font-bold mb-3">{t("pay.title")}</h2>
      <Pricing />
    </section>
  );
}
