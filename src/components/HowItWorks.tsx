// src/components/HowItWorks.tsx
import React from "react";
import { useTranslation, Trans } from 'react-i18next';
import giftImg from "../assets/img/gift2.png"; 

const steps = [
  {
    title: "Запуск за 5 минут",
    text: "Добавьте код на сайт — и виджет сам покажется в нужный момент.",
  },
  {
    title: "Игровой бонус",
    text: "Клиенты крутят колесо и выигрывают скидки, подарки или доставку.",
  },
  {
    title: "Продажи с конверсией",
    text: "Покупатель получает бонус — вы получаете горячую заявку.",
  },
  {
    title: "Сбор контактов",
    text: "Вращение активируется после ввода телефона или email. Или можно без формы.",
  },
  {
    title: "Интеграция без кода",
    text: "Оповещения — в Telegram. Поддержка CRM, Monday, Google Analytics.",
  },
  {
    title: "Дальнейшее вовлечение",
    text: "После участия — перенаправляйте клиента куда угодно: на сайт или в бота.",
  },
];

export function HowItWorks() {
  const { t } = useTranslation();
  return (
    <section className="bg-[#EFEFEF] py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
          <Trans
            i18nKey="howItWorks"
            components={{
              highlight1: <span className="text-[#046EF1]" />,
            }}
          />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.slice(0, 4).map((step, index) => (
          <div
            key={index}
            className={`relative w-[378px] h-[371px] ${
              index === 0
                ? "bg-white border-none shadow-sm"
                : index === 3
                  ? "rounded-xl bg-[linear-gradient(169deg,rgba(0,94,255,0.1)_0%,rgba(12,145,211,0.1)_100%)] border-none"
                  : "bg-white border-none shadow-sm"
            } translate-y-[-1rem] animate-fade-in `}
            style={
              {
                "--animation-delay": `${200 + index * 100}ms`,
              } as React.CSSProperties
            }
          >
            <div className="relative w-full h-full p-0">
              {index === 0 && (
                <>
                  <div
              key={index}
              className="relative bg-white rounded-xl p-6 shadow-none hover:shadow-md transition"
            >
              <div className="absolute top-3 right-4 text-6xl font-extrabold text-gray-100 select-none">
                {index}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
            </div>
                </>
              )}
              {index === 1 && (
                <img
                  className="w-full h-full"
                  alt="Element"
                  src="https://c.animaapp.com/mgsequcbozesqc/img/12346.svg"
                />
              )}
              {index === 2 && (
                <img
                  className="w-full h-full"
                  alt="Element"
                  src="https://c.animaapp.com/mgsequcbozesqc/img/12347.svg"
                />
              )}
              {index === 3 && (
                <img
                  className="w-full h-full"
                  alt="Element"
                  src="https://c.animaapp.com/mgsequcbozesqc/img/12348.svg"
                />
              )}
            </div>
          </div>
        ))}
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-white rounded-xl p-6 shadow-none hover:shadow-md transition"
            >
              <div className="absolute top-3 right-4 text-6xl font-extrabold text-gray-100 select-none">
                {step.number}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}

          {/* Блок із кнопкою */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl flex flex-col items-center justify-center p-6 shadow-sm">
            <img
              src={giftImg}
              alt="Подарок"
              className="w-24 mb-4"
            />
            <button className="bg-blue-500 text-white text-sm font-medium px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition">
              Начать генерацию лидов
            </button>
            <p className="mt-3 text-xs text-blue-700 font-medium">
              238 Hug × 45 Hug
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
