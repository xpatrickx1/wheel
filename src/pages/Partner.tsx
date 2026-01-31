import React, { useState } from "react";
import { Header } from "../components/Header";
import { useTranslation } from 'react-i18next';
import { useTheme } from "../theme/ThemeContext";

export default function Partner() {
  const { t } = useTranslation();
  const {isLigth} = useTheme();
  const [stats, setStats] = useState({
    registrations: 0,
    payments: 0,
    balance: 0,
    });
    
    
    const rewards = [
    { label: `${t("partnershipTarifStandartMonth")}`, amount: "198 грн." },
    { label: `${t("partnershipTarifExpertMonth")}`, amount: "338 грн." },
    { label: `${t("partnershipTarifExpertYear")}`, amount: "936 грн." },
    { label: `${t("partnershipTarifStandartYear")}`, amount: "1896 грн." },
    ];
    
    
    return (
      <>
        <Header />
        <section className= {`min-h-screen  flex flex-col items-center py-16 px-4 pt-[10rem]
          ${isLigth ? "bg-[#FFFFFF]" : "bg-[#0B0E16]"} ${isLigth ? "text-black" : "text-white"}`
          }>
        {/* Header Section */}
          <h1 className="text-3xl font-bold mb-4">{t("partnershipTitle")}</h1>
          <p className={` text-center max-w-2xl mb-8 ${isLigth ? "text-black" : "text-gray-300 "}`}>
            {t("partnershipSubtitle")}
          </p>
          
        
          {/* Referral Link */}
          <div className="bg-[#121624] rounded-xl w-full max-w-md p-4 mb-6 text-center text-blue-400 font-semibold select-all">
          wheelee.com/r/pysuvo53
          </div>
          
          
          {/* Stats */}
          <div className={`text-center space-y-1 mb-6 ${isLigth ? "text-black" : "text-gray-300 "}`}>
            <p>{t("partnershipRegistrations")} — {stats.registrations}</p>
            <p>{t("partnershipPays")} — {stats.payments}</p>
            <p>{t("partnershipBalans")} — {stats.balance} грн.</p>
          </div>
          
          
          {/* Payout Button */}
          <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-2 px-6 rounded-lg text-sm">
            {t("partnershipBtn")}
          </button>
          
          
          {/* Rewards Section */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-semibold mb-4">{t("partnershipNagrada")}</h2>
            <div className={`space-y-2 ${isLigth ? "text-black" : "text-gray-300 "}`}>
              {rewards.map((reward, i) => (
                <p key={i}>
                  {reward.label} — <span className={`${isLigth ? "text-black" : "text-white"}`}>{reward.amount}</span>
                </p>
              ))}
            </div>
          </div>
        </section>
      </>
    );
}
