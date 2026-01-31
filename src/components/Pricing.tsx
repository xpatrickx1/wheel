import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeContext';


type payPacks = {
  name: string;
  price: string;
  list: string;
};

export function Pricing() {
  const { t } = useTranslation();
  const plans = t("payPacks", { returnObjects: true }) as payPacks[];
  const [isYearly, setIsYearly] = useState(true);
  const { theme } = useTheme();
  // const plans = [
  //   {
  //     name: "тест-драйв",
  //     price: 0,
  //     features: ["10 заявок", "1 виджет"],
  //     button: "",
  //   },
  //   {
  //     name: "стандарт",
  //     price: 390,
  //     features: ["100 заявок/мес.", "1 виджет"],
  //     button: "ОПЛАТИТЬ 390 ГРН.",
  //   },
  //   {
  //     name: "эксперт",
  //     price: 790,
  //     features: ["∞ заявок", "∞ виджетов", "отключение формы"],
  //     button: "ОПЛАТИТЬ 790 ГРН.",
  //   },
  // ];

  return (
    <div className={` text-white w-full flex flex-col items-center pb-16 pt-[34px] 
      ${theme === "dark" ? "bg-[#0B0E16]" : "bg-[#FFFFFF]"}`
      }>
      <div >
        <label className="flex items-center gap-4 mb-8">
          <input type="checkbox" className="clip-rect-0 h-0 -m-px overflow-hidden absolute w-px" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
          <span className={`opacity-50 text-xl ${isYearly ? "text-black" : "text-black"}`}>{t("pay.payMonthly")}</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative w-18 h-[36px] ${isYearly ? "bg-blue-600" : "bg-gray-700"} rounded-full transition-colors duration-300`}
          >
            <div
              className={`
                absolute top-[4px] left-[4px] w-7 h-7 rounded-full bg-white transition-transform duration-300 ease-out 
                ${isYearly ? 'translate-x-[36px]' : 'translate-x-0'}
              `}
            />
          </button>
          <span className={`opacity-50 text-xl ${isYearly ? "text-black" : "text-black"}`}>{t("pay.payYearly")}</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl p-8 flex flex-col items-start border border-[#D9D9D966] hover:border-[#0672EF] hover:shadow-[0_0_14px_2px_#0088FF24] hover:backdrop-blur-[24px] transition-all duration-300
              ${theme === "dark" ?   "bg-[#121624]" : "bg-[#D9D9D966]"}`}
          >
            <div className={`text-4xl sm:text-5xl font-bold mb-1
              ${theme === "dark" ? "text-gray-400" : "text-black"}`}>

              {isYearly && plan.price !== 0 ? plan.price / 2 : plan.price}

              <span className="text-gray-400"> ₴ </span>

              <span className={`font-normal text-3xl 
              ${theme === "dark" ? "text-gray-400" : "text-black"}`}> /{t("pay.payMonth")}</span>
            </div>
            <p className="text-black mb-6 opacity-50 text-2xl leading-[47px]">{plan.name}</p>

            <ul className="mb-6 space-y-1 text-left">
              {plan.list.map((feature, i) => (
                <li key={i}>
                  <span className={`text-xl font-regular leading-10 
                    ${theme === "dark" ? "text-gray-400" : "text-black"}`}>{feature}</span>
                </li>
              ))}
            </ul>

            {plan.button && (
              <button className="mt-auto bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold py-2 px-4 rounded-lg w-full">
                {isYearly
                  ? plan.button.replace(/(\d+)/, (m) => parseInt(m) / 2)
                  : plan.button}
              </button>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
}
