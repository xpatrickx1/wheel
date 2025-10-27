import React, { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "../components/Header";
import { Pricing } from '../components/Pricing';

export default function Pay() {
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

        <Pricing theme="dark" />

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
