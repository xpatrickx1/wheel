// src/components/HowItWorks.tsx
import React from "react";
import { useTranslation, Trans } from 'react-i18next';
import giftImg from "../assets/img/gift2.png"; 
import hwwBg from "../assets/img/hwwBg.png"; 
import step1 from "../assets/img/01.svg"; 
import step2 from "../assets/img/02.svg"; 
import step3 from "../assets/img/03.svg"; 
import step4 from "../assets/img/04.svg"; 
import step5 from "../assets/img/05.svg"; 
import step6 from "../assets/img/06.svg"; 

const stepImages = [step1, step2, step3, step4, step5, step6];

type hwwSteps = {
  title: string;
  text: string;
};

export function HowItWorks() {
  const { t } = useTranslation();
  const steps = t("steps", { returnObjects: true }) as hwwSteps[];
  
  return (
    <section className="bg-[#EFEFEF] py-18">
      <div className="max-w-[1582px] mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-15">
          <Trans
            i18nKey="howItWorks"
            components={{
              highlight1: <span className="text-[#046EF1]" />,
            }}
          />
        </h2>

        <div className="flex flex-col md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative overflow-hidden flex flex-col gap-2 justify-between bg-white rounded-xl shadow-none hover:shadow-md transition"
            >
              <div className="px-6 pt-6">
                <h3 className="font-semibold text-2xl mb-2 leading-12">{step.title}</h3>
                <p className="text-gray-600 text-xl leading-xl">
                  {t(step.text).split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
                </p>
              </div>
              <div className="relative w-full h-[177px] ml-auto select-none">
                <img 
                  src={stepImages[index]}
                  alt={`${index + 1}`}
                  className="absolute right-0   h-[177px]"
                />
              </div>
            </div>
          ))}

          <div className="relative min-h-[370px] bg-gradient-to-br bg-[linear-gradient(112.2deg,rgba(0,94,255,0.1)_22.2%,rgba(12,145,211,0.1)_105.31%)] bg-cover bg-no-repeat rounded-xl flex flex-col items-center justify-center p-6 col-span-2 lg:col-span-2"
          style={{
            backgroundImage: `linear-gradient(112.2deg, rgba(0,94,255,0.1) 22.2%, rgba(12,145,211,0.1) 105.31%), url(${hwwBg})`,
          }}>
            <div className="relative">
              <img
                src={giftImg}
                alt="Подарок"
                className="w-24 mb-4 absolute bottom-2 -right-10 md:-right-12"
              />
              
              <a href="sign-up" className="box-border relative text-white text-lg bg-indigo-600 w-fit  bg-[linear-gradient(112.2deg,_#005EFF_22.2%,_#0C91D3_105.31%)] shadow-[rgba(43,62,229,0.15)_0px_15px_18px_0px,rgba(93,225,151,0.004)_0px_2px_0px_0px_inset] inline-block overflow-hidden px-[35px] py-5 rounded-[17px]">
                  {t('startBtn')}
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
