import React, { useState } from "react";
import { Header } from "../components/Header";
import { Pricing } from '../components/Pricing';
import { useTheme } from "../theme/ThemeContext";
import { useTranslation } from 'react-i18next';

export default function Pay() {
  const [isYearly, setIsYearly] = useState(true);
  const {isLigth} = useTheme();
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <section className= {` min-h-screen bg-[#0B0E16]  flex flex-col items-center py-16 px-4 pt-[10rem]
      ${isLigth ? "bg-[#FFFFFF]" : "bg-[#0B0E16]"} ${isLigth ? "text-black" : "text-white"}`
      }>
        <h1 className="text-3xl font-bold mb-3">{t("paymentTitle")}</h1>
        <p className="text-gray-400 text-center mb-6">
          {t("paymentSubTitle")}
        </p>

        <Pricing />

        {/* Bank Transfer Section */}
        <div className="text-center mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-3">{t("paymentSubTitle")}</h2>
          <p className={`text-sm ${isLigth ? "text-black" : "text-white"}`}>
            {t("paymentInfo")} — <span className={`font-semibold ${isLigth ? "text-black" : "text-white"}`}>pyusvo53</span>. 
            <a href="#" className="text-blue-400 hover:underline ml-1">{t("paymentLink")}</a>
          </p>
        </div>

        {/* Access Type Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-3">{t("paymentAccessTitle")}</h2>
          <p className="text-gray-400">{t("paymentAccessStatus")}</p>
        </div>
      </section>
    </>
  );
}
