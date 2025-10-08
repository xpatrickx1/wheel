import React, { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "../components/Header";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: "тест-драйв",
      price: 0,
      features: ["10 заявок", "1 виджет"],
      button: "",
    },
    {
      name: "стандарт",
      price: 390,
      features: ["100 заявок/мес.", "1 виджет"],
      button: "ОПЛАТИТЬ 4680 РУБ.",
    },
    {
      name: "эксперт",
      price: 790,
      features: ["∞ заявок", "∞ виджетов", "отключение формы"],
      button: "ОПЛАТИТЬ 9480 РУБ.",
    },
  ];

  return (
    <>
      <Header />
      <section className="min-h-screen bg-[#0B0E16] text-white flex flex-col items-center py-16 px-4 pt-[10rem]">
        <h1 className="text-3xl font-bold mb-3">Оплатить доступ</h1>
        <p className="text-gray-400 text-center mb-6">
          Скидка 50% при оформлении тарифа на год. Оплата единоразовая, без регулярных платежей
        </p>

        {/* Toggle */}
        <div >
          <label className="flex items-center gap-2 mb-12">
            <input type="checkbox" className="clip-rect-0 h-0 -m-px overflow-hidden absolute w-px" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
            <span className={!isYearly ? "text-white" : "text-gray-400"}>на месяц</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-8 ${isYearly ? "bg-blue-600" : "bg-gray-700"} rounded-full transition-colors duration-300`}
            >
              <motion.div
                layout
                className={`absolute top-0.5 left-0.5 w-7 h-7 rounded-full bg-white`}
                animate={{ x: isYearly ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </button>
            <span className={isYearly ? "text-white" : "text-gray-400"}>на год</span>
          </label>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-[#121624] rounded-2xl p-8 shadow-lg flex flex-col items-start"
            >
              <div className="text-3xl font-bold mb-1">
                {isYearly && plan.price !== 0 ? plan.price / 2 : plan.price}₽
                <span className="text-base text-gray-400">/мес</span>
              </div>
              <p className="text-gray-400 mb-4">{plan.name}</p>

              <hr className="border-gray-700 w-full mb-4" />

              <ul className="mb-6 space-y-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-sm font-medium text-gray-200">
                    <span className="text-white font-semibold">{feature}</span>
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
            </motion.div>
          ))}
        </div>

        {/* Bank Transfer Section */}
        <div className="text-center mt-16 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-3">Безналичная оплата</h2>
          <p className="text-gray-400 text-sm">
            При оплате на год. Пришлите реквизиты и желаемый тариф. Мы выставим счёт и пришлём вам. Укажите в письме ваш ID аккаунта — <span className="text-white font-semibold">pyusvo53</span>. 
            <a href="#" className="text-blue-400 hover:underline ml-1">Оплатить безналом</a>
          </p>
        </div>

        {/* Access Type Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-3">Тип доступа</h2>
          <p className="text-gray-400">Доступ не оформлен</p>
        </div>
      </section>
    </>
  );
}
