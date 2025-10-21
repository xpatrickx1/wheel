import React from "react";
import { useTranslation } from 'react-i18next';

const statsData = [
  {
    value: "1700",
    label: "Пользователей",
  },
  {
    value: "23%",
    label: "Процент конверсии",
  },
  {
    value: "1.7M+",
    label: "Полученых заявок",
  },
];

export const Statistic = () => {
  const { t } = useTranslation();
  const statsData = t("statsData", { returnObjects: true });
  return (
    <section className="w-full flex items-center justify-center px-4">
      <div className="flex flex-wrap items-center justify-between gap-8 max-w-[1046px] w-full">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[244px] flex-1 translate-y-[-1rem] animate-fade-in "
          >
            <div className="flex items-center justify-center [font-family:'Nunito_Sans',Helvetica] font-bold text-[#0571ee] text-7xl xl:text-[99px] text-center tracking-[1.98px] leading-[90px]  xl:leading-[150px]">
              {stat.value}
            </div>

            <div className="opacity-50 [font-family:'Nunito_Sans',Helvetica] font-normal text-black text-[21px] text-center tracking-[0.42px] leading-[27.0px]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
